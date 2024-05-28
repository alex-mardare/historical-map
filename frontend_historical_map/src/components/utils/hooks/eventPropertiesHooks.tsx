import axios from 'axios'
import { useEffect, useState } from 'react'

import { EVENT_CATEGORY_NAME } from '../../models/constants/constants'
import { EVENT_CATEGORIES_FULL_URL } from '../../models/constants/urls'
import { EventCategories } from '../../models/types/eventCategory'
import { objectListLoadingError } from '../../partials/notifications'

export const useFetchEventCategories = () => {
    const [errorEventCategories, setErrorEventCategories] = useState(null)
    const [loadingDataEventCategories, setLoadingDataEventCategories] = useState(true)
    const [eventCategories, setEventCategories] = useState<EventCategories>([])

    useEffect(() => {
        setLoadingDataEventCategories(true)
        axios.get(EVENT_CATEGORIES_FULL_URL)
            .then(res => {
                setEventCategories(res.data)
                setLoadingDataEventCategories(false)
            })
            .catch(() => {
                objectListLoadingError(EVENT_CATEGORY_NAME)
                setErrorEventCategories(errorEventCategories)
                setLoadingDataEventCategories(false)
            })
    }, [errorEventCategories])

    return { errorEventCategories, loadingDataEventCategories, eventCategories }
}