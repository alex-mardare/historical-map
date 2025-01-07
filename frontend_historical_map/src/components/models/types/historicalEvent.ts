import { EventCategory } from './eventCategory'
import { HistoricalState } from './historicalState'
import { PresentCountry } from './presentCountry'

export interface HistoricalEvent {
  approximate_location: boolean
  date: string
  description: string
  event_category: EventCategory
  historical_state: HistoricalState
  id: number
  latitude: number
  longitude: number
  name: string
  present_country: PresentCountry
  time: Date
}

export type HistoricalEvents = HistoricalEvent[]
