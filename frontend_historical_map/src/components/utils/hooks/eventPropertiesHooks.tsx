import axios from 'axios';
import { useEffect, useState } from 'react';

import { DEV_API_EVENTS_APP_BASE_URL, EVENTS_APP_EVENT_CATEGORIES_ENDPOINT } from '../../models/constants/urls';
import { EventCategories } from '../../models/types/eventCategory';
import { eventCategoriesLoadingError } from '../../partials/notifications';

export const useFetchEventCategories = () => {
    const [errorEventCategories, setErrorEventCategories] = useState(null);
    const [loadingDataEventCategories, setLoadingDataEventCategories] = useState(true);
    const [eventCategories, setEventCategories] = useState<EventCategories>([]);

    useEffect(() => {
        setLoadingDataEventCategories(true);
        axios.get(DEV_API_EVENTS_APP_BASE_URL + EVENTS_APP_EVENT_CATEGORIES_ENDPOINT)
            .then(res => {
                setEventCategories(res.data);
                setLoadingDataEventCategories(false);
            })
            .catch(() => {
                eventCategoriesLoadingError()
                setErrorEventCategories(errorEventCategories);
                setLoadingDataEventCategories(false);
            });
    }, [errorEventCategories]);

    return { errorEventCategories, loadingDataEventCategories, eventCategories };
}