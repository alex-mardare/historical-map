import axios from 'axios'
import { useEffect, useState } from 'react'

import { HISTORICAL_STATE_NAME } from '../../models/constants/constants'
import { HISTORICAL_STATES_FULL_URL } from '../../models/constants/urls'
import { HistoricalState, HistoricalStateOption } from '../../models/types/historicalState'
import { DataGetHistoricalStates } from '../../models/types/hooksDataTypes'
import { objectLoadingError, objectListLoadingError } from '../../partials/notifications'
import { transformHistoricalStatesForSelector } from '../selectors/historicalStateSelector'


const useGetHistoricalStatesOptions = () => {
    const [errorHistoricalStates, setErrorHistoricalStates] = useState(null)
    const [historicalStates, setHistoricalStates] = useState<HistoricalStateOption[]>([])
    const [loadingDataHistoricalStates, setLoadingDataHistoricalStates] = useState(true)

    useEffect(() => {
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
    }, [errorHistoricalStates])

    return { errorHistoricalStates, historicalStates, loadingDataHistoricalStates }
}

function useGetHistoricalState(historicalStateId: string | undefined): HistoricalState | null {
    const [historicalState, setHistoricalState] = useState(null)

    useEffect(() => {
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
    }, [historicalStateId])

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

    useEffect(() => {
        fetchHistoricalStates()
    }, [])

    return {
        historicalStates,
        refreshFunction: fetchHistoricalStates,
    }
}

export { useGetHistoricalStatesOptions, useGetHistoricalState, useGetHistoricalStates }