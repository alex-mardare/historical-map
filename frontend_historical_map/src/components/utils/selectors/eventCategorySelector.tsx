import { HistoricalStates } from "../../models/types/historicalState";


type HistoricalStateOption = {
    label: string,
    value: number
}
type HistoricalStateOptions = HistoricalStateOption[]

export function transformHistoricalStatesForSelector(historicalStates : HistoricalStates) {
    let historicalStateOptions: HistoricalStateOptions = [];
    historicalStates.forEach(hs => {
        historicalStateOptions.push({
            label: hs.dateTo.length > 0 ? hs.name + '\n (' + hs.dateFrom + ' - ' + hs.dateTo + ')' : hs.name,
            value: hs.id
        })
    });

    return historicalStateOptions;
}