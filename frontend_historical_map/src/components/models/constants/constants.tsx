import { Dictionary } from '../types/genericTypes'
import {
  DEV_API_EVENTS_APP_BASE_URL,
  EVENT_CATEGORIES_FULL_URL,
  FIGURES_FULL_URL,
  HISTORICAL_STATES_FULL_URL
} from './urls'

const DATE_FORMAT =
  /^-?\d{1,4}(?:-(?:0[1-9]|1[0-2])(?:-(?:0[1-9]|[1-2]\d|3[0-1]))?)?$/
const EVENT_TOOLTIP_TEXT =
  'Map is centered on the country where the event took place.'
const TIME_FORMAT = 'HH:mm'

const EVENT_NAME = 'EVENT'
const EVENT_CATEGORY_NAME = 'EVENT_CATEGORY'
const HISTORICAL_FIGURE_NAME = 'HISTORICAL_FIGURE'
const HISTORICAL_STATE_NAME = 'HISTORICAL_STATE'
const PRESENT_COUNTRY_NAME = 'PRESENT_COUNTRY'

const entitiesDictionary: Dictionary = {
  EVENT: 'event',
  EVENT_CATEGORY: 'event category',
  HISTORICAL_FIGURE: 'historical figure',
  HISTORICAL_STATE: 'historical state',
  PRESENT_COUNTRY: 'country'
}

const urlsDictionary: Dictionary = {
  EVENT: DEV_API_EVENTS_APP_BASE_URL,
  EVENT_CATEGORY: EVENT_CATEGORIES_FULL_URL,
  HISTORICAL_FIGURE: FIGURES_FULL_URL,
  HISTORICAL_STATE: HISTORICAL_STATES_FULL_URL
}

export {
  DATE_FORMAT,
  EVENT_TOOLTIP_TEXT,
  TIME_FORMAT,
  EVENT_NAME,
  EVENT_CATEGORY_NAME,
  HISTORICAL_FIGURE_NAME,
  HISTORICAL_STATE_NAME,
  PRESENT_COUNTRY_NAME,
  entitiesDictionary,
  urlsDictionary
}
