import axios from 'axios';
import { useEffect, useState } from 'react';

import { PRESENT_COUNTRIES_FULL_URL } from '../../models/constants/urls';
import { PresentCountries } from '../../models/types/presentCountry';
import { presentCountriesLoadingError } from '../../partials/notifications';


const useFetchPresentCountries = (histStateId: number | undefined) => {
    const [errorPresentCountries, setErrorPresentCountries] = useState(null);
    const [loadingDataPresentCountries, setLoadingDataPresentCountries] = useState(true);
    const [presentCountries, setPresentCountries] = useState<PresentCountries>([]);

    useEffect(() => {
        setLoadingDataPresentCountries(true);
        const presentCountriesUrl = histStateId != null ? PRESENT_COUNTRIES_FULL_URL + '?histStateId=' + histStateId : PRESENT_COUNTRIES_FULL_URL
        axios.get(presentCountriesUrl)
            .then(res => {
                setPresentCountries(res.data);
                setLoadingDataPresentCountries(false);
            })
            .catch(() => {
                presentCountriesLoadingError()
                setErrorPresentCountries(errorPresentCountries);
                setLoadingDataPresentCountries(false);
            });
    }, [errorPresentCountries, histStateId]);

    return { errorPresentCountries, loadingDataPresentCountries, presentCountries };
}

export {
    useFetchPresentCountries   
}