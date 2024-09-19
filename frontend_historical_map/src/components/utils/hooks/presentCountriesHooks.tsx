import { useEffect, useState } from 'react'

import apiClient from '../../../config/axiosSetup'
import { PRESENT_COUNTRY_NAME } from '../../models/constants/constants'
import { PRESENT_COUNTRIES_ENDPOINT } from '../../models/constants/urls'
import { DataGetPresentCountries } from '../../models/types/hooksDataTypes'
import { objectListLoadingError } from '../../partials/notifications'

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

export { useGetPresentCountries }
