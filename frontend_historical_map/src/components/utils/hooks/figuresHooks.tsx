import axios from 'axios';
import { useEffect, useState } from 'react';

import { DEV_API_EVENTS_APP_BASE_URL, EVENTS_APP_HISTORICAL_FIGURES_ENDPOINT } from '../../models/constants/urls';
import { DataGetFigures } from '../../models/types/hooksDataTypes';
import { figureLoadingError } from '../../partials/notifications';
import { HistoricalFigure } from '../../models/types/historicalFigure';


export function useFetchFigures(): DataGetFigures<HistoricalFigure> {
    const [figures, setFigures] = useState(null);

    const fetchFigures = async () => {
        try {
            const response = await axios.get(DEV_API_EVENTS_APP_BASE_URL + EVENTS_APP_HISTORICAL_FIGURES_ENDPOINT);
            setFigures(response.data.results);
        } catch (error) {
            figureLoadingError();
        }
    };

    useEffect(() => {
        fetchFigures();
    }, []);

    return {
        figures,
        refreshFunction: fetchFigures,
    };
}