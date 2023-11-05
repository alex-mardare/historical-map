import axios, { AxiosError } from 'axios';
import { useEffect, useState } from 'react';

import { FIGURES_FULL_URL } from '../../models/constants/urls';
import { HistoricalFigure } from '../../models/types/historicalFigure';
import { DataCreateUpdate, DataGetFigures } from '../../models/types/hooksDataTypes';
import { figureCreationError, figureCreationSuccess, figureEditError, figureEditSuccess, figureLoadingError } from '../../partials/notifications';


export function useFigureGet(figureId: string | undefined): HistoricalFigure | null {
    const [figure, setFigure] = useState(null)

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get(FIGURES_FULL_URL + figureId);
                setFigure(response.data);
            }
            catch(error) {
                figureLoadingError();
            }
        }

        fetchData();
    }, [figureId]);

    return figure;
}

export function useFiguresGet(): DataGetFigures<HistoricalFigure> {
    const [figures, setFigures] = useState(null);

    const fetchFigures = async () => {
        try {
            const response = await axios.get(FIGURES_FULL_URL);
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
            const response = await axios.post(FIGURES_FULL_URL, formData);

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

export function useFigurePut<T>(): DataCreateUpdate<T> {
    const [error, setError] = useState<AxiosError | null>(null);

    const submitData = async (
        formData: any,
        setConfirmLoading: (loading: boolean) => void,
        setOpen: (open: boolean) => void
      ): Promise<any> => {
        setError(null);

        try {
            setConfirmLoading(true);

            const response = await axios.patch(FIGURES_FULL_URL + formData.id, formData);

            setConfirmLoading(false);
            setOpen(false);

            figureEditSuccess(formData.name);
            return response.data;
        } catch (error) {
            setConfirmLoading(false);
            setOpen(true);

            setError(error as AxiosError<any>);
            figureEditError(formData.name);
            throw error;
        }
    }

    return { submitData, error };
};