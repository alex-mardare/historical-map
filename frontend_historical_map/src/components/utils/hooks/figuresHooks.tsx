import axios from 'axios'
import { useState } from 'react'

import { useEffectOnceWrapper } from './generalHooks'
import { HISTORICAL_FIGURE_NAME } from '../../models/constants/constants'
import { FIGURES_FULL_URL } from '../../models/constants/urls'
import { HistoricalFigure } from '../../models/types/historicalFigure'
import { DataGetFigures } from '../../models/types/hooksDataTypes'
import { objectLoadingError, objectListLoadingError } from '../../partials/notifications'


function useGetFigure(figureId: string | undefined): HistoricalFigure | null {
    const [figure, setFigure] = useState(null)

    useEffectOnceWrapper(() => {
        async function fetchData() {
            try {
                const response = await axios.get(FIGURES_FULL_URL + figureId)
                setFigure(response.data)
            }
            catch(error) {
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
            const response = await axios.get(FIGURES_FULL_URL)
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
        refreshFunction: fetchFigures,
    }
}

export { useGetFigure, useGetFigures }