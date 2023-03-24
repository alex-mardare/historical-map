export interface HistoricalEvent {
    approximateRealLocation: boolean,
    date: string,
    description: string,
    eventCategoryId: number,
    historicalStateId: number,
    id: number,
    latitude: number,
    longitude: number,
    name: string,
    presentCountryId: number,
    time: Date
}