import axios from 'axios'
import { useEffect, useState } from 'react'

import { PRESENT_COUNTRIES_FULL_URL } from '../../models/constants/urls'
import { PresentCountries } from '../../models/types/presentCountry'
import { objectListLoadingError } from '../../partials/notifications'
import { PRESENT_COUNTRY_NAME } from '../../models/constants/constants'


const useFetchPresentCountries = (histStateId: number | undefined | null) => {
    const [errorPresentCountries, setErrorPresentCountries] = useState(null)
    const [loadingDataPresentCountries, setLoadingDataPresentCountries] = useState(true)
    const [presentCountries, setPresentCountries] = useState<PresentCountries>([])

    useEffect(() => {
        setLoadingDataPresentCountries(true)
        const presentCountriesUrl = histStateId != null ? PRESENT_COUNTRIES_FULL_URL + '?histStateId=' + histStateId : PRESENT_COUNTRIES_FULL_URL
        axios.get(presentCountriesUrl)
            .then(res => {
                setPresentCountries(res.data)
                setLoadingDataPresentCountries(false)
            })
            .catch(() => {
                objectListLoadingError(PRESENT_COUNTRY_NAME)
                setErrorPresentCountries(errorPresentCountries)
                setLoadingDataPresentCountries(false)
            })
    }, [errorPresentCountries, histStateId])

    return { errorPresentCountries, loadingDataPresentCountries, presentCountries }
}

export {
    useFetchPresentCountries   
}