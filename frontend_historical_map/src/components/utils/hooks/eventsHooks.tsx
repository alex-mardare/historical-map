import axios, { AxiosError } from 'axios';
import { useEffect, useState } from 'react';

import { DEV_API_EVENTS_APP_BASE_URL } from '../../models/constants/urls';
import { eventCreationError, eventCreationSuccess, eventEditError, eventEditSuccess, eventLoadingError, eventsLoadingError } from '../../partials/notifications';
import { DataCreateUpdate, DataGetEvents } from '../../models/types/hooksDataTypes';
import { HistoricalEvent } from '../../models/types/historicalEvent';
import { returnMapCoordinatesByPresentCountryName } from '../../partials/leafletMapPartials';
 

export function useEventCoordinates(event: HistoricalEvent | null) {
    const [coordinates, setCoordinates] = useState<null | number[]>(null);

    useEffect(() => {
        if (event) {
            if (event.approximateRealLocation) {
                setCoordinates([event.latitude, event.longitude]);
            } 
            else {
                returnMapCoordinatesByPresentCountryName(event).then((arrResult) => {
                    if (arrResult.length > 0) {
                        setCoordinates([arrResult[0].y, arrResult[0].x]);
                    }
                });
            }
        }
    }, [event]);

    return coordinates;
}

export function useEventPost<T>(): DataCreateUpdate<T> {
    const [error, setError] = useState<AxiosError | null>(null);

    const submitData = async (
        formData: any,
        setConfirmLoading: (loading: boolean) => void,
        setOpen: (open: boolean) => void
      ): Promise<any> => {
        setError(null);

        try {
            setConfirmLoading(true);
            const response = await axios.post(DEV_API_EVENTS_APP_BASE_URL, formData);

            setConfirmLoading(false);
            setOpen(false);

            eventCreationSuccess(formData.name);
            return response.data;
        } catch (error) {
            setConfirmLoading(false);
            setOpen(true);

            setError(error as AxiosError<any>);
            eventCreationError();
            throw error;
        }
    }

    return { submitData, error };
};

export function useEventPut<T>(): DataCreateUpdate<T> {
    const [error, setError] = useState<AxiosError | null>(null);

    const submitData = async (
        formData: any,
        setConfirmLoading: (loading: boolean) => void,
        setOpen: (open: boolean) => void
      ): Promise<any> => {
        setError(null);

        try {
            setConfirmLoading(true);
            
            if (formData.time !== undefined) {
                formData.time = formData.time.format('HH:mm:ss');
            }
            const response = await axios.patch(DEV_API_EVENTS_APP_BASE_URL + formData.id, formData);

            setConfirmLoading(false);
            setOpen(false);

            eventEditSuccess(formData.name);
            return response.data;
        } catch (error) {
            setConfirmLoading(false);
            setOpen(true);

            setError(error as AxiosError<any>);
            eventEditError(formData.name);
            throw error;
        }
    }

    return { submitData, error };
};

export function useFetchEvent(eventId: string | undefined): HistoricalEvent | null {
    const [event, setEvent] = useState(null)

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get(DEV_API_EVENTS_APP_BASE_URL + eventId);
                setEvent(response.data);
            }
            catch(error) {
                eventLoadingError();
            }
        }

        fetchData();
    }, [eventId]);

    return event;
}

export function useFetchEvents(): DataGetEvents<HistoricalEvent> {
    const [events, setEvents] = useState(null);

    const fetchEvents = async () => {
        try {
            const response = await axios.get(DEV_API_EVENTS_APP_BASE_URL);
            setEvents(response.data);
        } catch (error) {
            eventsLoadingError();
        }
    };

    useEffect(() => {
        fetchEvents();
    }, []);

    return {
        events,
        refreshEvents: fetchEvents,
    };
}