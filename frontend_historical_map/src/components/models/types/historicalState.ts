import { PresentCountry } from './presentCountry'

export interface HistoricalState {
  dateFrom: string | null
  dateTo: string | null
  flagUrl: string | null
  id: number
  name: string
  presentCountries: PresentCountry[]
}

export interface HistoricalStateOption {
  description: string
  label: string
  value: number
}
