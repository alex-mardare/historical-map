import { PresentCountry } from './presentCountry'

export interface HistoricalState {
  end_date: string | null
  flag_url: string | null
  id: number
  name: string
  present_countries: PresentCountry[]
  start_date: string | null
}

export interface HistoricalStateOption {
  description: string
  label: string
  value: number
}
