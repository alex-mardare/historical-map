import axios from 'axios';
import { useEffect, useState } from 'react';

import { DEV_API_EVENTS_APP_BASE_URL } from '../config/constants/urls';
import { eventLoadingError, eventsLoadingError } from '../config/elements/notifications';
import { HistoricalEvent } from '../config/types/historicalEvent';

export function useFetchEvents(): HistoricalEvent[] | null {
    const [events, setEvents] = useState(null)

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get(DEV_API_EVENTS_APP_BASE_URL);
                setEvents(response.data);
            }
            catch(error) {
                eventsLoadingError();
            }
        }

        fetchData();
    }, []);

    return events;
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