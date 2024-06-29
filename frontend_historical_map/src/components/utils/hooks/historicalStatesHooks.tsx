import axios from 'axios'
import { useState } from 'react'

import { useEffectOnceWrapper } from './generalHooks'
import { transformHistoricalStatesForSelector } from '../display/historicalStateSelector'
import { HISTORICAL_STATE_NAME } from '../../models/constants/constants'
import { HISTORICAL_STATES_FULL_URL } from '../../models/constants/urls'
import { HistoricalState, HistoricalStateOption } from '../../models/types/historicalState'
import { DataGetHistoricalStates } from '../../models/types/hooksDataTypes'
import { objectLoadingError, objectListLoadingError } from '../../partials/notifications'


const useGetHistoricalStatesOptions = () => {
    const [errorHistoricalStates, setErrorHistoricalStates] = useState(null)
    const [historicalStates, setHistoricalStates] = useState<HistoricalStateOption[]>([])
    const [loadingDataHistoricalStates, setLoadingDataHistoricalStates] = useState(true)

    useEffectOnceWrapper(() => {
        setLoadingDataHistoricalStates(true)
        axios.get(HISTORICAL_STATES_FULL_URL)
            .then(res => {
                setHistoricalStates(transformHistoricalStatesForSelector(res.data))
                setLoadingDataHistoricalStates(false)
            })
            .catch(() => {
                objectListLoadingError(HISTORICAL_STATE_NAME)
                setErrorHistoricalStates(errorHistoricalStates)
                setLoadingDataHistoricalStates(false)
            })
    })

    return { errorHistoricalStates, historicalStates, loadingDataHistoricalStates }
}

function useGetHistoricalState(historicalStateId: string | undefined): HistoricalState | null {
    const [historicalState, setHistoricalState] = useState(null)

    useEffectOnceWrapper(() => {
        async function fetchData() {
            try {
                const response = await axios.get(HISTORICAL_STATES_FULL_URL + historicalStateId)
                setHistoricalState(response.data)
            }
            catch(error) {
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
            const response = await axios.get(HISTORICAL_STATES_FULL_URL)
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
        refreshFunction: fetchHistoricalStates,
    }
}

export { useGetHistoricalStatesOptions, useGetHistoricalState, useGetHistoricalStates }