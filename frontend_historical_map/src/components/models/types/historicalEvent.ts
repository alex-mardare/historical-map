import { EventCategory } from "./eventCategory"
import { HistoricalState } from "./historicalState"
import { PresentCountry } from "./presentCountry"

export interface HistoricalEvent {
    approximateRealLocation: boolean,
    date: string,
    description: string,
    eventCategory: EventCategory,
    historicalState: HistoricalState,
    id: number,
    latitude: number,
    longitude: number,
    name: string,
    presentCountry: PresentCountry,
    time: Date
}

export type HistoricalEvents = HistoricalEvent[];