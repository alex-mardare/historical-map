export interface HistoricalState {
    id: number,
    name: string,
    dateFrom: string | null,
    dateTo: string | null
}
export type HistoricalStates = HistoricalState[]

type HistoricalStateOption = {
    description: string,
    label: string,
    value: number
}
export type HistoricalStateOptions = HistoricalStateOption[]