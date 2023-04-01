import axios from 'axios';
import { useEffect, useState } from 'react';

import { DEV_API_EVENTS_APP_BASE_URL } from '../config/constants/endpoints';
import { eventsLoadingError } from '../config/elements/notifications';

export function useFetchEvents() {
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