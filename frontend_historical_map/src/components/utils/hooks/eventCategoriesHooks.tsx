import { useState } from 'react'

import apiClient from '../../../config/axiosSetup'
import { EVENT_CATEGORY_NAME } from '../../models/constants/constants'
import { EVENT_CATEGORIES_ENDPOINT } from '../../models/constants/urls'
import { EventCategory } from '../../models/types/eventCategory'
import { DataGetEventCategories } from '../../models/types/hooksDataTypes'
import {
  objectListLoadingError,
  objectLoadingError
} from '../../partials/notifications'
import { useEffectOnceWrapper } from './generalHooks'

function useGetEventCategories(): DataGetEventCategories {
  const [eventCategories, setEventCategories] = useState([])

  const fetchEventCategories = async () => {
    try {
      const response = await apiClient.get(EVENT_CATEGORIES_ENDPOINT)
      setEventCategories(response.data)
    } catch (error) {
      objectListLoadingError(EVENT_CATEGORY_NAME)
    }
  }

  useEffectOnceWrapper(() => {
    fetchEventCategories()
  })

  return {
    eventCategories,
    refreshFunction: fetchEventCategories
  }
}

function useGetEventCategory(
  eventCategoryId: string | undefined
): EventCategory | null {
  const [eventCategory, setEventCategory] = useState(null)

  useEffectOnceWrapper(() => {
    async function fetchData() {
      try {
        const response = await apiClient.get(
          EVENT_CATEGORIES_ENDPOINT + eventCategoryId
        )
        setEventCategory(response.data)
      } catch (error) {
        objectLoadingError(EVENT_CATEGORY_NAME)
      }
    }

    fetchData()
  })

  return eventCategory
}

export { useGetEventCategories, useGetEventCategory }
