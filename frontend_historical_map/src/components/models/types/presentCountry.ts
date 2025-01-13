import { HistoricalState } from './historicalState'

export interface PresentCountry {
  end_date: string
  flag_url: string
  historical_states: HistoricalState[]
  id: number
  name: string
  start_date: string
}
