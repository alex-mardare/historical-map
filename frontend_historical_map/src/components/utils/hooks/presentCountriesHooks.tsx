import axios from 'axios'
import { useState } from 'react'

import { useEffectOnceWrapper } from './generalHooks'
import { PRESENT_COUNTRY_NAME } from '../../models/constants/constants'
import { PRESENT_COUNTRIES_FULL_URL } from '../../models/constants/urls'
import { objectListLoadingError } from '../../partials/notifications'
import { DataGetPresentCountries } from '../../models/types/hooksDataTypes'


function useGetPresentCountries(histStateId: number | undefined | null): DataGetPresentCountries {
    const [presentCountries, setPresentCountries] = useState([])

    const fetchPresentCountries = async () => {
        try {
            const presentCountriesUrl = histStateId != null ? PRESENT_COUNTRIES_FULL_URL + '?histStateId=' + histStateId : PRESENT_COUNTRIES_FULL_URL
            const response = await axios.get(presentCountriesUrl)
            setPresentCountries(response.data)
        } catch (error) {
            objectListLoadingError(PRESENT_COUNTRY_NAME)
        }
    }

    useEffectOnceWrapper(() => {
        fetchPresentCountries()
    })

    return {
        presentCountries,
        refreshFunction: fetchPresentCountries,
    }
}

export {
    useGetPresentCountries   
}