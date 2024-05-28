import axios, { AxiosError } from 'axios'
import { useEffect, useState } from 'react'

import { HISTORICAL_FIGURE_NAME } from '../../models/constants/constants'
import { FIGURES_FULL_URL } from '../../models/constants/urls'
import { HistoricalFigure } from '../../models/types/historicalFigure'
import { DataCreateUpdate, DataGetFigures } from '../../models/types/hooksDataTypes'
import { objectCreationError, objectCreationSuccess, objectDeletionError, objectDeletionSuccess, objectEditError, objectEditSuccess, objectLoadingError, objectListLoadingError } from '../../partials/notifications'


export async function figureDelete(figure: HistoricalFigure | null) {
    try {
        await axios.delete(FIGURES_FULL_URL + figure?.id)
        objectDeletionSuccess(HISTORICAL_FIGURE_NAME, figure?.name)
    }
    catch(error) {
        objectDeletionError(HISTORICAL_FIGURE_NAME, figure?.name)
    }
}

export function useFigureGet(figureId: string | undefined): HistoricalFigure | null {
    const [figure, setFigure] = useState(null)

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get(FIGURES_FULL_URL + figureId)
                setFigure(response.data)
            }
            catch(error) {
                objectLoadingError(HISTORICAL_FIGURE_NAME)
            }
        }

        fetchData()
    }, [figureId])

    return figure
}

export function useFiguresGet(): DataGetFigures<HistoricalFigure> {
    const [figures, setFigures] = useState(null)

    const fetchFigures = async () => {
        try {
            const response = await axios.get(FIGURES_FULL_URL)
            setFigures(response.data.results)
        } catch (error) {
            objectListLoadingError(HISTORICAL_FIGURE_NAME)
        }
    }

    useEffect(() => {
        fetchFigures()
    }, [])

    return {
        figures,
        refreshFunction: fetchFigures,
    }
}


export function useFigurePost<T>(): DataCreateUpdate<T> {
    const [error, setError] = useState<AxiosError | null>(null)

    const submitData = async (
        formData: any,
        setConfirmLoading: (loading: boolean) => void,
        setOpen: (open: boolean) => void
      ): Promise<any> => {
        setError(null)

        try {
            setConfirmLoading(true)
            const response = await axios.post(FIGURES_FULL_URL, formData)

            setConfirmLoading(false)
            setOpen(false)

            objectCreationSuccess(HISTORICAL_FIGURE_NAME, formData.name)
            return response.data
        } catch (error) {
            setConfirmLoading(false)
            setOpen(true)

            setError(error as AxiosError<any>)
            objectCreationError(HISTORICAL_FIGURE_NAME)
            throw error
        }
    }

    return { submitData, error }
}

export function useFigurePut<T>(): DataCreateUpdate<T> {
    const [error, setError] = useState<AxiosError | null>(null)

    const submitData = async (
        formData: any,
        setConfirmLoading: (loading: boolean) => void,
        setOpen: (open: boolean) => void
      ): Promise<any> => {
        setError(null)

        try {
            setConfirmLoading(true)

            const response = await axios.patch(FIGURES_FULL_URL + formData.id, formData)

            setConfirmLoading(false)
            setOpen(false)

            objectEditSuccess(HISTORICAL_FIGURE_NAME, formData.name)
            return response.data
        } catch (error) {
            setConfirmLoading(false)
            setOpen(true)

            setError(error as AxiosError<any>)
            objectEditError(HISTORICAL_FIGURE_NAME, formData.name)
            throw error
        }
    }

    return { submitData, error }
}