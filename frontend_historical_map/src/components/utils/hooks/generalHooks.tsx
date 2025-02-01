import { AxiosError, HttpStatusCode } from 'axios'
import { useEffect, useRef, useState } from 'react'

import apiClient from '../../../config/axiosSetup'
import useStore from '../../../config/globalStore'
import {
  urlsDictionary,
  urlsPostDictionary
} from '../../models/constants/constants'
import { LOGOUT_ENDPOINT, TOKEN_ENDPOINT } from '../../models/constants/urls'
import { DataCreateUpdate } from '../../models/types/hooksDataTypes'
import {
  objectCreationError,
  objectCreationSuccess,
  objectDeletionError,
  objectDeletionSuccess,
  objectEditError,
  objectEditSuccess
} from '../../partials/notifications'

const login = async (username: string, password: string) => {
  try {
    await apiClient
      .post(TOKEN_ENDPOINT, {
        username,
        password
      })
      .then((response) => {
        if (response.status === HttpStatusCode.Ok) {
          useStore.getState().setIsAuthenticated(true)
        }
      })
  } catch (error: any) {
    useStore.getState().setIsAuthenticated(false)
    throw new Error('Login failed: ', error.message)
  }
}

const logout = async () => {
  try {
    await apiClient.post(LOGOUT_ENDPOINT).then((response) => {
      if (response.status === HttpStatusCode.Ok) {
        useStore.getState().setIsAuthenticated(false)
      }
    })
  } catch (error: any) {
    useStore.getState().setIsAuthenticated(false)
    throw new Error('Logout failed: ', error.message)
  }
}

const objectDelete = async (
  objectId: number,
  objectName: string,
  objectTypeName: string
) => {
  try {
    const response = await apiClient.delete(
      urlsDictionary[objectTypeName] + objectId
    )
    objectDeletionSuccess(objectTypeName, objectName)
    return response
  } catch (error) {
    objectDeletionError(objectTypeName, objectName)
  }
}

const useEffectOnceWrapper = (hookMethod: () => void) => {
  const hasMounted = useRef(false)

  useEffect(() => {
    if (!hasMounted.current) {
      hookMethod()
      hasMounted.current = true
    }
  }, [hookMethod])
}

const usePostObject = (objectName: string): DataCreateUpdate => {
  const [error, setError] = useState<AxiosError | null>(null)

  const submitData = async (
    formData: any,
    setConfirmLoading: (loading: boolean) => void,
    setOpen: (open: boolean) => void
  ): Promise<any> => {
    setError(null)

    await apiClient
      .post(urlsPostDictionary[objectName], formData)
      .then((response) => {
        if (!response.data) {
          throw Error()
        }
        setConfirmLoading(false)
        setOpen(false)

        objectCreationSuccess(objectName, formData.name)
        return response.data
      })
      .catch((error) => {
        setConfirmLoading(false)
        setOpen(true)

        setError(error as AxiosError<any>)
        objectCreationError(objectName)
      })
  }

  return { submitData, error }
}

const usePutObject = (objectName: string): DataCreateUpdate => {
  const [error, setError] = useState<AxiosError | null>(null)

  const submitData = async (
    formData: any,
    setConfirmLoading: (loading: boolean) => void,
    setOpen: (open: boolean) => void
  ): Promise<any> => {
    setError(null)

    try {
      setConfirmLoading(true)

      if (formData.time !== undefined) {
        formData.time = formData.time.format('HH:mm:ss')
      }
      const response = await apiClient.patch(
        urlsDictionary[objectName] + formData.id,
        formData
      )

      setConfirmLoading(false)
      setOpen(false)

      objectEditSuccess(objectName, formData.name)
      return response.data
    } catch (error) {
      setConfirmLoading(false)
      setOpen(true)

      setError(error as AxiosError<any>)
      objectEditError(objectName, formData.name)
      throw error
    }
  }

  return { submitData, error }
}

export {
  logout,
  login,
  objectDelete,
  useEffectOnceWrapper,
  usePostObject,
  usePutObject
}
