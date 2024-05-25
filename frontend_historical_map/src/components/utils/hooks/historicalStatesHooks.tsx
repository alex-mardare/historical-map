import axios, { AxiosError } from 'axios'
import { useEffect, useState } from 'react'

import { HISTORICAL_STATES_FULL_URL } from '../../models/constants/urls'
import { HistoricalState, HistoricalStateOptions } from '../../models/types/historicalState'
import { DataCreateUpdate, DataGetHistoricalStates } from '../../models/types/hooksDataTypes'
import { historicalStateCreationError, historicalStateCreationSuccess, historicalStateDeletionError, historicalStateDeletionSuccess, historicalStateEditError, historicalStateEditSuccess, historicalStateLoadingError, historicalStatesLoadingError } from '../../partials/notifications'
import { transformHistoricalStatesForSelector } from '../selectors/historicalStateSelector'

async function deleteHistoricalState(historicalState: HistoricalState | null) {
    try {
        const ceva = await axios.delete(HISTORICAL_STATES_FULL_URL + historicalState?.id);
        historicalStateDeletionSuccess(historicalState?.name);
        return ceva;
    }
    catch(error) {
        historicalStateDeletionError(historicalState?.name);
    }
}

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

function useGetHistoricalState(historicalStateId: string | undefined): HistoricalState | null {
    const [historicalState, setHistoricalState] = useState(null)

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get(HISTORICAL_STATES_FULL_URL + historicalStateId);
                setHistoricalState(response.data);
            }
            catch(error) {
                historicalStateLoadingError();
            }
        }

        fetchData();
    }, [historicalStateId]);

    return historicalState;
}

function usePostHistoricalState<T>(): DataCreateUpdate<T> {
    const [error, setError] = useState<AxiosError | null>(null);

    const submitData = async (
        formData: any,
        setConfirmLoading: (loading: boolean) => void,
        setOpen: (open: boolean) => void
      ): Promise<any> => {
        setError(null);

        try {
            setConfirmLoading(true);
            const response = await axios.post(HISTORICAL_STATES_FULL_URL, formData);

            setConfirmLoading(false);
            setOpen(false);

            historicalStateCreationSuccess(formData.name);
            return response.data;
        } catch (error) {
            setConfirmLoading(false);
            setOpen(true);

            setError(error as AxiosError<any>);
            historicalStateCreationError();
            throw error;
        }
    }

    return { submitData, error };
}

function usePutHistoricalState<T>(): DataCreateUpdate<T> {
    const [error, setError] = useState<AxiosError | null>(null);

    const submitData = async (
        formData: any,
        setConfirmLoading: (loading: boolean) => void,
        setOpen: (open: boolean) => void
      ): Promise<any> => {
        setError(null);

        try {
            setConfirmLoading(true);

            const response = await axios.patch(HISTORICAL_STATES_FULL_URL + formData.id, formData);

            setConfirmLoading(false);
            setOpen(false);

            historicalStateEditSuccess(formData.name);
            return response.data;
        } catch (error) {
            setConfirmLoading(false);
            setOpen(true);

            setError(error as AxiosError<any>);
            historicalStateEditError(formData.name);
            throw error;
        }
    }

    return { submitData, error };
}

export {
    deleteHistoricalState, useGetHistoricalStatesOptions, useGetHistoricalState, useGetHistoricalStates, usePostHistoricalState, usePutHistoricalState
}