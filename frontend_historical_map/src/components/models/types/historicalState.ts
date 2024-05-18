import { PresentCountries } from "./presentCountry"


export interface HistoricalState {
    dateFrom: string | null,
    dateTo: string | null,
    flagUrl: string | null,
    id: number,
    name: string,
    presentCountries: PresentCountries
}
export type HistoricalStates = HistoricalState[]

type HistoricalStateOption = {
    description: string,
    label: string,
    value: number
}
export type HistoricalStateOptions = HistoricalStateOption[]