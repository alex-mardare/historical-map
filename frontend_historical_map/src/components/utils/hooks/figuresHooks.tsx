import { useState } from 'react'

import apiClient from '../../../config/axiosSetup'
import { HISTORICAL_FIGURE_NAME } from '../../models/constants/constants'
import { HISTORICAL_FIGURES_ENDPOINT } from '../../models/constants/urls'
import { HistoricalFigure } from '../../models/types/historicalFigure'
import { DataGetFigures } from '../../models/types/hooksDataTypes'
import {
  objectListLoadingError,
  objectLoadingError
} from '../../partials/notifications'
import { useEffectOnceWrapper } from './generalHooks'

function useGetFigure(figureId: string | undefined): HistoricalFigure | null {
  const [figure, setFigure] = useState(null)

  useEffectOnceWrapper(() => {
    async function fetchData() {
      try {
        const response = await apiClient.get(
          HISTORICAL_FIGURES_ENDPOINT + figureId
        )
        setFigure(response.data)
      } catch (error) {
        objectLoadingError(HISTORICAL_FIGURE_NAME)
      }
    }

    fetchData()
  })

  return figure
}

function useGetFigures(): DataGetFigures {
  const [figures, setFigures] = useState([])

  const fetchFigures = async () => {
    try {
      const response = await apiClient.get(HISTORICAL_FIGURES_ENDPOINT)
      setFigures(response.data.results)
    } catch (error) {
      objectListLoadingError(HISTORICAL_FIGURE_NAME)
    }
  }

  useEffectOnceWrapper(() => {
    fetchFigures()
  })

  return {
    figures,
    refreshFunction: fetchFigures
  }
}

export { useGetFigure, useGetFigures }
