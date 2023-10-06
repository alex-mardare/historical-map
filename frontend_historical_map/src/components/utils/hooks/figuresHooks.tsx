import axios, { AxiosError } from 'axios';
import { useEffect, useState } from 'react';

import { DEV_API_EVENTS_APP_BASE_URL, EVENTS_APP_HISTORICAL_FIGURES_ENDPOINT } from '../../models/constants/urls';
import { HistoricalFigure } from '../../models/types/historicalFigure';
import { DataCreateUpdate, DataGetFigures } from '../../models/types/hooksDataTypes';
import { figureCreationError, figureCreationSuccess, figureLoadingError } from '../../partials/notifications';


export function useFetchFigures(): DataGetFigures<HistoricalFigure> {
    const [figures, setFigures] = useState(null);

    const fetchFigures = async () => {
        try {
            const response = await axios.get(DEV_API_EVENTS_APP_BASE_URL + EVENTS_APP_HISTORICAL_FIGURES_ENDPOINT);
            setFigures(response.data.results);
        } catch (error) {
            figureLoadingError();
        }
    };

    useEffect(() => {
        fetchFigures();
    }, []);

    return {
        figures,
        refreshFunction: fetchFigures,
    };
}


export function useFigurePost<T>(): DataCreateUpdate<T> {
    const [error, setError] = useState<AxiosError | null>(null);

    const submitData = async (
        formData: any,
        setConfirmLoading: (loading: boolean) => void,
        setOpen: (open: boolean) => void
      ): Promise<any> => {
        setError(null);

        try {
            setConfirmLoading(true);
            const response = await axios.post(DEV_API_EVENTS_APP_BASE_URL + EVENTS_APP_HISTORICAL_FIGURES_ENDPOINT, formData);

            setConfirmLoading(false);
            setOpen(false);

            figureCreationSuccess(formData.name);
            return response.data;
        } catch (error) {
            setConfirmLoading(false);
            setOpen(true);

            setError(error as AxiosError<any>);
            figureCreationError();
            throw error;
        }
    }

    return { submitData, error };
};