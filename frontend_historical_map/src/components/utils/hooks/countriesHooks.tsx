import axios from 'axios';
import { useEffect, useState } from 'react';

import { HISTORICAL_STATES_FULL_URL, PRESENT_COUNTRIES_FULL_URL } from '../../models/constants/urls';
import { HistoricalState, HistoricalStateOptions } from '../../models/types/historicalState'
import { DataGetHistoricalStates } from '../../models/types/hooksDataTypes';
import { PresentCountries } from '../../models/types/presentCountry';
import { historicalStatesLoadingError, presentCountriesLoadingError } from '../../partials/notifications';
import { transformHistoricalStatesForSelector } from '../selectors/historicalStateSelector';


const useGetHistoricalStatesOptions = () => {
    const [errorHistoricalStates, setErrorHistoricalStates] = useState(null);
    const [historicalStates, setHistoricalStates] = useState<HistoricalStateOptions>([]);
    const [loadingDataHistoricalStates, setLoadingDataHistoricalStates] = useState(true);

    useEffect(() => {
        setLoadingDataHistoricalStates(true);
        axios.get(HISTORICAL_STATES_FULL_URL)
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

function useGetHistoricalStates(): DataGetHistoricalStates<HistoricalState> {
    const [historicalStates, setHistoricalStates] = useState(null);

    const fetchHistoricalStates = async () => {
        try {
            const response = await axios.get(HISTORICAL_STATES_FULL_URL);
            setHistoricalStates(response.data);
        } catch (error) {
            historicalStatesLoadingError();
        }
    };

    useEffect(() => {
        fetchHistoricalStates();
    }, []);

    return {
        historicalStates,
        refreshFunction: fetchHistoricalStates,
    };
}

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
    useGetHistoricalStatesOptions, useGetHistoricalStates,
    useFetchPresentCountries   
}