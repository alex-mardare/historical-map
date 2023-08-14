import axios, { AxiosError } from 'axios';
import { useEffect, useState } from 'react';

import { DEV_API_EVENTS_APP_BASE_URL } from '../../models/constants/urls';
import { eventCreationSuccess, eventLoadingError, eventsLoadingError } from '../../partials/notifications';
import { DataGetEvents, DataPost } from '../../models/types/hooksDataTypes';
import { HistoricalEvent } from '../../models/types/historicalEvent';

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

export function useEventPost<T>(): DataPost<T> {
    const [error, setError] = useState<AxiosError | null>(null);

    const postData = async (
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
            throw error;
        }
    }

    return { postData, error };
  };