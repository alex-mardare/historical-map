import axios from 'axios'
import { useEffect, useState } from 'react'

import { PRESENT_COUNTRY_NAME } from '../../models/constants/constants'
import { PRESENT_COUNTRIES_FULL_URL } from '../../models/constants/urls'
import { objectListLoadingError } from '../../partials/notifications'
import { DataGetPresentCountries } from '../../models/types/hooksDataTypes'


function useGetPresentCountries(histStateId: number | undefined | null): DataGetPresentCountries {
    const [presentCountries, setPresentCountries] = useState([])

    const fetchPresentCountries = async () => {
        try {
            const presentCountriesUrl = histStateId !== null && histStateId !== undefined 
                ? PRESENT_COUNTRIES_FULL_URL + '?histStateId=' + histStateId 
                : PRESENT_COUNTRIES_FULL_URL
            const response = await axios.get(presentCountriesUrl)
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
        refreshFunction: fetchPresentCountries,
    }
}

export {
    useGetPresentCountries   
}