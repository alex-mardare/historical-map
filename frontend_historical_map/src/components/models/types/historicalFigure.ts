import { HistoricalState } from './historicalState'
import { PresentCountry } from './presentCountry'

export interface HistoricalFigure {
  birth_date: string
  birth_historical_state: HistoricalState
  birth_present_country: PresentCountry
  death_date: string | null
  death_historical_state: HistoricalState
  death_present_country: PresentCountry
  id: number
  name: string
}
