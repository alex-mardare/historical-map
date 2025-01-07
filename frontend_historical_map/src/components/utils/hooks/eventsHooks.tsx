import { useEffect, useState } from 'react'

import apiClient from '../../../config/axiosSetup'
import { EVENT_NAME } from '../../models/constants/constants'
import { HISTORICAL_EVENTS_ENDPOINT } from '../../models/constants/urls'
import { HistoricalEvent } from '../../models/types/historicalEvent'
import { DataGetEvents } from '../../models/types/hooksDataTypes'
import { returnMapCoordinatesByPresentCountryName } from '../../partials/leafletMapPartials'
import {
  objectListLoadingError,
  objectLoadingError
} from '../../partials/notifications'
import { useEffectOnceWrapper } from './generalHooks'

function useEventCoordinates(event: HistoricalEvent | null) {
  const [coordinates, setCoordinates] = useState<null | number[]>(null)

  useEffect(() => {
    if (event) {
      if (event.approximate_location) {
        setCoordinates([event.latitude, event.longitude])
      } else {
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

  useEffectOnceWrapper(() => {
    async function fetchData() {
      try {
        const response = await apiClient.get(
          HISTORICAL_EVENTS_ENDPOINT + eventId
        )
        setEvent(response.data)
      } catch (error) {
        objectLoadingError(EVENT_NAME)
      }
    }

    fetchData()
  })

  return event
}

function useGetEvents(): DataGetEvents {
  const [events, setEvents] = useState([])

  const fetchEvents = async () => {
    try {
      const response = await apiClient.get(HISTORICAL_EVENTS_ENDPOINT)
      setEvents(response.data.results)
    } catch (error) {
      objectListLoadingError(EVENT_NAME)
    }
  }

  useEffectOnceWrapper(() => {
    fetchEvents()
  })

  return {
    events,
    refreshFunction: fetchEvents
  }
}

export { useEventCoordinates, useGetEvent, useGetEvents }
