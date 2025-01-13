import { useEffect, useState } from 'react'

import apiClient from '../../../config/axiosSetup'
import { PRESENT_COUNTRY_NAME } from '../../models/constants/constants'
import { PRESENT_COUNTRIES_ENDPOINT } from '../../models/constants/urls'
import { DataGetPresentCountries } from '../../models/types/hooksDataTypes'
import { PresentCountry } from '../../models/types/presentCountry'
import {
  objectListLoadingError,
  objectLoadingError
} from '../../partials/notifications'
import { useEffectOnceWrapper } from './generalHooks'

function useGetPresentCountries(
  histStateId: number | undefined | null
): DataGetPresentCountries {
  const [presentCountries, setPresentCountries] = useState([])

  const fetchPresentCountries = async () => {
    try {
      const presentCountriesUrl =
        histStateId !== null && histStateId !== undefined
          ? PRESENT_COUNTRIES_ENDPOINT + '?histStateId=' + histStateId
          : PRESENT_COUNTRIES_ENDPOINT
      const response = await apiClient.get(presentCountriesUrl)
      setPresentCountries(response.data)
    } catch (error) {
      objectListLoadingError(PRESENT_COUNTRY_NAME)
    }
  }

  useEffect(() => {
    fetchPresentCountries()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [histStateId])

  return {
    presentCountries,
    refreshFunction: fetchPresentCountries
  }
}

function useGetPresentCountry(
  presentCountryId: string | undefined
): PresentCountry | null {
  const [presentCountry, setPresentCountry] = useState(null)

  useEffectOnceWrapper(() => {
    async function fetchData() {
      try {
        const response = await apiClient.get(
          PRESENT_COUNTRIES_ENDPOINT + presentCountryId
        )
        setPresentCountry(response.data)
      } catch (error) {
        objectLoadingError(PRESENT_COUNTRY_NAME)
      }
    }

    fetchData()
  })

  return presentCountry
}

export { useGetPresentCountries, useGetPresentCountry }
