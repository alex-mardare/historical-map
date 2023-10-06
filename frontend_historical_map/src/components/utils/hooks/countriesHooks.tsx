import axios from 'axios';
import { useEffect, useState } from 'react';

import { DEV_API_EVENTS_APP_BASE_URL, EVENTS_APP_HISTORICAL_STATES_ENDPOINT, EVENTS_APP_PRESENT_COUNTRIES_ENDPOINT } from '../../models/constants/urls';
import { PresentCountries } from '../../models/types/presentCountry';
import { HistoricalStateOptions } from '../../models/types/historicalState';
import { historicalStatesLoadingError, presentCountriesLoadingError } from '../../partials/notifications';
import { transformHistoricalStatesForSelector } from '../selectors/eventCategorySelector';


export const useFetchHistoricalStates = () => {
    const [errorHistoricalStates, setErrorHistoricalStates] = useState(null);
    const [historicalStates, setHistoricalStates] = useState<HistoricalStateOptions>([]);
    const [loadingDataHistoricalStates, setLoadingDataHistoricalStates] = useState(true);

    useEffect(() => {
        setLoadingDataHistoricalStates(true);
        axios.get(DEV_API_EVENTS_APP_BASE_URL + EVENTS_APP_HISTORICAL_STATES_ENDPOINT)
            .then(res => {
                setHistoricalStates(transformHistoricalStatesForSelector(res.data));
                setLoadingDataHistoricalStates(false);
            })
            .catch(() => {
                historicalStatesLoadingError()
                setErrorHistoricalStates(errorHistoricalStates);
                setLoadingDataHistoricalStates(false);
            });
    }, [errorHistoricalStates]);

    return { errorHistoricalStates, historicalStates, loadingDataHistoricalStates };
}

export const useFetchPresentCountries = () => {
    const [errorPresentCountries, setErrorPresentCountries] = useState(null);
    const [loadingDataPresentCountries, setLoadingDataPresentCountries] = useState(true);
    const [presentCountries, setPresentCountries] = useState<PresentCountries>([]);

    useEffect(() => {
        setLoadingDataPresentCountries(true);
        axios.get(DEV_API_EVENTS_APP_BASE_URL + EVENTS_APP_PRESENT_COUNTRIES_ENDPOINT)
            .then(res => {
                setPresentCountries(res.data);
                setLoadingDataPresentCountries(false);
            })
            .catch(() => {
                presentCountriesLoadingError()
                setErrorPresentCountries(errorPresentCountries);
                setLoadingDataPresentCountries(false);
            });
    }, [errorPresentCountries]);

    return { errorPresentCountries, loadingDataPresentCountries, presentCountries };
}