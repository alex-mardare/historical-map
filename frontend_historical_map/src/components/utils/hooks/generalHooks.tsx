import axios, { AxiosError } from 'axios'
import { useEffect, useRef, useState } from 'react'

import apiClient from '../../../config/axiosSetup'
import useStore from '../../../config/globalStore'
import {
  urlsDictionary,
  urlsPostDictionary
} from '../../models/constants/constants'
import {
  TOKEN_ENDPOINT,
  TOKEN_REFRESH_ENDPOINT
} from '../../models/constants/urls'
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
    const response = await apiClient.post(TOKEN_ENDPOINT, {
      username,
      password
    })
    const { setAccessToken } = useStore.getState()
    setAccessToken(response.data.access)
    localStorage.setItem('refresh_token', response.data.refresh)

    return response.data
  } catch (error: any) {
    throw new Error('Login failed, error: ', error.message)
  }
}

const logout = () => {
  const { removeAccessToken } = useStore.getState()
  removeAccessToken()
  localStorage.removeItem('refresh_token')

  delete axios.defaults.headers.common['Authorization']
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

const refreshToken = async () => {
  try {
    return await apiClient
      .post(TOKEN_REFRESH_ENDPOINT, {
        refresh: localStorage.getItem('refresh_token')
      })
      .then((response) => {
        const { setAccessToken } = useStore.getState()
        setAccessToken(response.data.access)
        axios.defaults.headers.common['Authorization'] =
          `Bearer ${response.data.access}`
      })
  } catch (error) {
    console.log('Refresh token failed, error: ', error)
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

    try {
      setConfirmLoading(true)
      const response = await apiClient.post(
        urlsPostDictionary[objectName],
        formData
      )

      setConfirmLoading(false)
      setOpen(false)

      objectCreationSuccess(objectName, formData.name)
      return response.data
    } catch (error) {
      setConfirmLoading(false)
      setOpen(true)

      setError(error as AxiosError<any>)
      objectCreationError(objectName)
      throw error
    }
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
  refreshToken,
  objectDelete,
  useEffectOnceWrapper,
  usePostObject,
  usePutObject
}
