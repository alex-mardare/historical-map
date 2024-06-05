import axios, { AxiosError } from 'axios'
import { useEffect, useState } from 'react'

import { EVENT_NAME } from '../../models/constants/constants'
import { DEV_API_EVENTS_APP_BASE_URL } from '../../models/constants/urls'
import { objectCreationError, objectCreationSuccess, objectDeletionError, objectDeletionSuccess, objectEditError, objectEditSuccess, objectLoadingError, objectListLoadingError } from '../../partials/notifications'
import { HistoricalEvent } from '../../models/types/historicalEvent'
import { DataCreateUpdate, DataGetEvents } from '../../models/types/hooksDataTypes'
import { returnMapCoordinatesByPresentCountryName } from '../../partials/leafletMapPartials'
 

async function eventDelete(event: HistoricalEvent | null) {
    try {
        const response = await axios.delete(DEV_API_EVENTS_APP_BASE_URL + event?.id)
        objectDeletionSuccess(EVENT_NAME, event?.name)
        return response
    }
    catch(error) {
        objectDeletionError(EVENT_NAME, event?.name)
    }
}

function useEventCoordinates(event: HistoricalEvent | null) {
    const [coordinates, setCoordinates] = useState<null | number[]>(null)

    useEffect(() => {
        if (event) {
            if (event.approximateRealLocation) {
                setCoordinates([event.latitude, event.longitude])
            } 
            else {
                returnMapCoordinatesByPresentCountryName(event).then((arrResult) => {
                    if (arrResult.length > 0) {
                        setCoordinates([arrResult[0].y, arrResult[0].x])
                    }
                })
            }
        }
    }, [event])

    return coordinates
}

function useGetEvent(eventId: string | undefined): HistoricalEvent | null {
    const [event, setEvent] = useState(null)

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get(DEV_API_EVENTS_APP_BASE_URL + eventId)
                setEvent(response.data)
            }
            catch(error) {
                objectLoadingError(EVENT_NAME)
            }
        }

        fetchData()
    }, [eventId])

    return event
}

function useGetEvents(): DataGetEvents<HistoricalEvent> {
    const [events, setEvents] = useState(null)

    const fetchEvents = async () => {
        try {
            const response = await axios.get(DEV_API_EVENTS_APP_BASE_URL)
            setEvents(response.data.results)
        } catch (error) {
            objectListLoadingError(EVENT_NAME)
        }
    }

    useEffect(() => {
        fetchEvents()
    }, [])

    return {
        events,
        refreshFunction: fetchEvents,
    }
}

function usePostEvent<T>(): DataCreateUpdate<T> {
    const [error, setError] = useState<AxiosError | null>(null)

    const submitData = async (
        formData: any,
        setConfirmLoading: (loading: boolean) => void,
        setOpen: (open: boolean) => void
      ): Promise<any> => {
        setError(null)

        try {
            setConfirmLoading(true)
            const response = await axios.post(DEV_API_EVENTS_APP_BASE_URL, formData)

            setConfirmLoading(false)
            setOpen(false)

            objectCreationSuccess(EVENT_NAME, formData.name)
            return response.data
        } catch (error) {
            setConfirmLoading(false)
            setOpen(true)

            setError(error as AxiosError<any>)
            objectCreationError(EVENT_NAME)
            throw error
        }
    }

    return { submitData, error }
}

function usePutEvent<T>(): DataCreateUpdate<T> {
    const [error, setError] = useState<AxiosError | null>(null)

    const submitData = async (formData: any, setConfirmLoading: (loading: boolean) => void, setOpen: (open: boolean) => void): Promise<any> => {
        setError(null)

        try {
            setConfirmLoading(true)
            
            if (formData.time !== undefined) {
                formData.time = formData.time.format('HH:mm:ss')
            }
            const response = await axios.patch(DEV_API_EVENTS_APP_BASE_URL + formData.id, formData)

            setConfirmLoading(false)
            setOpen(false)

            objectEditSuccess(EVENT_NAME, formData.name)
            return response.data
        } catch (error) {
            setConfirmLoading(false)
            setOpen(true)

            setError(error as AxiosError<any>)
            objectEditError(EVENT_NAME, formData.name)
            throw error
        }
    }

    return { submitData, error }
}

export { eventDelete, useEventCoordinates, useGetEvent, useGetEvents, usePostEvent, usePutEvent }