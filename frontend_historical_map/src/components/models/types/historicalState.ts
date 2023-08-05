export interface HistoricalState {
    id: number,
    name: string,
    dateFrom: string,
    dateTo: string
}
export type HistoricalStates = HistoricalState[]

type HistoricalStateOption = {
    label: string,
    value: number
}
export type HistoricalStateOptions = HistoricalStateOption[]