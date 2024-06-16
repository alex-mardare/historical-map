import axios from 'axios'
import { useEffect, useState } from 'react'

import { EVENT_CATEGORY_NAME } from '../../models/constants/constants'
import { EVENT_CATEGORIES_FULL_URL } from '../../models/constants/urls'
import { DataGetEventCategories } from '../../models/types/hooksDataTypes'
import { objectListLoadingError } from '../../partials/notifications'


function useGetEventCategories(): DataGetEventCategories {
    const [eventCategories, setEventCategories] = useState([])

    const fetchEventCategories = async () => {
        try {
            const response = await axios.get(EVENT_CATEGORIES_FULL_URL)
            setEventCategories(response.data)
        } catch (error) {
            objectListLoadingError(EVENT_CATEGORY_NAME)
        }
    }

    useEffect(() => {
        fetchEventCategories()
    })

    return {
        eventCategories,
        refreshFunction: fetchEventCategories,
    }
}

export {
    useGetEventCategories   
}