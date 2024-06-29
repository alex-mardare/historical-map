import { HistoricalState, HistoricalStateOption } from "../../models/types/historicalState";


export function transformHistoricalStatesForSelector(historicalStates : HistoricalState[]) {
    let historicalStateOptions: HistoricalStateOption[] = [];
    historicalStates.forEach(hs => {
        historicalStateOptions.push({
            description: hs.dateTo && hs.dateTo.length > 0 ? '(' + hs.dateFrom + ' - ' + hs.dateTo + ')' : '',
            label: hs.name,
            value: hs.id
        })
    });
    return historicalStateOptions;
}