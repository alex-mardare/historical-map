import { useState } from 'react'

import apiClient from '../../../config/axiosSetup'
import { HISTORICAL_STATE_NAME } from '../../models/constants/constants'
import { HISTORICAL_STATES_ENDPOINT } from '../../models/constants/urls'
import {
  HistoricalState,
  HistoricalStateOption
} from '../../models/types/historicalState'
import { DataGetHistoricalStates } from '../../models/types/hooksDataTypes'
import {
  objectListLoadingError,
  objectLoadingError
} from '../../partials/notifications'
import { transformHistoricalStatesForSelector } from '../display/historicalStateSelector'
import { useEffectOnceWrapper } from './generalHooks'

const useGetHistoricalStatesOptions = () => {
  const [errorHistoricalStates, setErrorHistoricalStates] = useState(null)
  const [historicalStates, setHistoricalStates] = useState<
    HistoricalStateOption[]
  >([])
  const [loadingDataHistoricalStates, setLoadingDataHistoricalStates] =
    useState(true)

  useEffectOnceWrapper(() => {
    setLoadingDataHistoricalStates(true)
    apiClient
      .get(HISTORICAL_STATES_ENDPOINT)
      .then((res) => {
        setHistoricalStates(transformHistoricalStatesForSelector(res.data))
        setLoadingDataHistoricalStates(false)
      })
      .catch(() => {
        objectListLoadingError(HISTORICAL_STATE_NAME)
        setErrorHistoricalStates(errorHistoricalStates)
        setLoadingDataHistoricalStates(false)
      })
  })

  return {
    errorHistoricalStates,
    historicalStates,
    loadingDataHistoricalStates
  }
}

function useGetHistoricalState(
  historicalStateId: string | undefined
): HistoricalState | null {
  const [historicalState, setHistoricalState] = useState(null)

  useEffectOnceWrapper(() => {
    async function fetchData() {
      try {
        const response = await apiClient.get(
          HISTORICAL_STATES_ENDPOINT + historicalStateId
        )
        setHistoricalState(response.data)
      } catch (error) {
        objectLoadingError(HISTORICAL_STATE_NAME)
      }
    }

    fetchData()
  })

  return historicalState
}

function useGetHistoricalStates(): DataGetHistoricalStates {
  const [historicalStates, setHistoricalStates] = useState([])

  const fetchHistoricalStates = async () => {
    try {
      const response = await apiClient.get(HISTORICAL_STATES_ENDPOINT)
      setHistoricalStates(response.data)
    } catch (error) {
      objectListLoadingError(HISTORICAL_STATE_NAME)
    }
  }

  useEffectOnceWrapper(() => {
    fetchHistoricalStates()
  })

  return {
    historicalStates,
    refreshFunction: fetchHistoricalStates
  }
}

export {
  useGetHistoricalStatesOptions,
  useGetHistoricalState,
  useGetHistoricalStates
}
