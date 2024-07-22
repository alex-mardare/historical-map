import { AxiosError } from 'axios'

import { EventCategory } from './eventCategory'
import { HistoricalEvent } from './historicalEvent'
import { HistoricalFigure } from './historicalFigure'
import { HistoricalFigureRole } from './historicalFigureRole'
import { HistoricalState } from './historicalState'
import { PresentCountry } from './presentCountry'

export type DataCreateUpdate = {
  error: AxiosError | null
  submitData: (
    formData: any,
    setConfirmLoading: (loading: boolean) => void,
    setOpen: (open: boolean) => void
  ) => Promise<any>
}

export type DataGetEventCategories = {
  eventCategories: EventCategory[]
  refreshFunction: () => void
}

export type DataGetEvents = {
  events: HistoricalEvent[]
  refreshFunction: () => void
}

export type DataGetFigureRoles = {
  figureRoles: HistoricalFigureRole[]
  refreshFunction: () => void
}

export type DataGetFigures = {
  figures: HistoricalFigure[]
  refreshFunction: () => void
}

export type DataGetHistoricalStates = {
  historicalStates: HistoricalState[]
  refreshFunction: () => void
}

export type DataGetPresentCountries = {
  presentCountries: PresentCountry[]
  refreshFunction: () => void
}
