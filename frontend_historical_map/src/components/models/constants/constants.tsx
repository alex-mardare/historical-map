import { Dictionary } from '../types/genericTypes'
import {
  EVENT_CATEGORIES_ENDPOINT,
  HISTORICAL_EVENTS_ENDPOINT,
  HISTORICAL_FIGURES_ENDPOINT,
  HISTORICAL_FIGURE_ROLES_ENDPOINT,
  HISTORICAL_STATES_ENDPOINT
} from './urls'

const DATE_FORMAT =
  /^-?\d{1,4}(?:-(?:0[1-9]|1[0-2])(?:-(?:0[1-9]|[1-2]\d|3[0-1]))?)?$/
const EVENT_TOOLTIP_TEXT =
  'Map is centered on the country where the event took place.'
const TIME_FORMAT = 'HH:mm'

const EVENT_NAME = 'EVENT'
const EVENT_CATEGORY_NAME = 'EVENT_CATEGORY'
const HISTORICAL_FIGURE_NAME = 'HISTORICAL_FIGURE'
const HISTORICAL_FIGURE_ROLE_NAME = 'HISTORICAL_FIGURE_ROLE'
const HISTORICAL_STATE_NAME = 'HISTORICAL_STATE'
const PRESENT_COUNTRY_NAME = 'PRESENT_COUNTRY'

const entitiesDictionary: Dictionary = {
  EVENT: 'event',
  EVENT_CATEGORY: 'event category',
  HISTORICAL_FIGURE: 'historical figure',
  HISTORICAL_FIGURE_ROLE: 'historical figure role',
  HISTORICAL_STATE: 'historical state',
  PRESENT_COUNTRY: 'country'
}

const urlsDictionary: Dictionary = {
  EVENT: HISTORICAL_EVENTS_ENDPOINT,
  EVENT_CATEGORY: EVENT_CATEGORIES_ENDPOINT,
  HISTORICAL_FIGURE: HISTORICAL_FIGURES_ENDPOINT,
  HISTORICAL_FIGURE_ROLE: HISTORICAL_FIGURE_ROLES_ENDPOINT,
  HISTORICAL_STATE: HISTORICAL_STATES_ENDPOINT
}

const urlsPostDictionary: Dictionary = {
  EVENT: HISTORICAL_EVENTS_ENDPOINT + 'create',
  EVENT_CATEGORY: EVENT_CATEGORIES_ENDPOINT,
  HISTORICAL_FIGURE: HISTORICAL_FIGURES_ENDPOINT,
  HISTORICAL_FIGURE_ROLE: HISTORICAL_FIGURE_ROLES_ENDPOINT,
  HISTORICAL_STATE: HISTORICAL_STATES_ENDPOINT
}

export {
  DATE_FORMAT,
  EVENT_TOOLTIP_TEXT,
  TIME_FORMAT,
  EVENT_NAME,
  EVENT_CATEGORY_NAME,
  HISTORICAL_FIGURE_NAME,
  HISTORICAL_FIGURE_ROLE_NAME,
  HISTORICAL_STATE_NAME,
  PRESENT_COUNTRY_NAME,
  entitiesDictionary,
  urlsDictionary,
  urlsPostDictionary
}
