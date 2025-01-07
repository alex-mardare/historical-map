import { Button } from 'antd'
import { ColumnsType } from 'antd/es/table'
import React from 'react'

import { HISTORICAL_EVENTS_SECTION } from '../../models/constants/urls'
import { HistoricalDateObject } from '../../models/types/historicalDateObject'
import { HistoricalEvent } from '../../models/types/historicalEvent'
import { displayBooleanValues } from '../../utils/display/displayBooleanValues'
import {
  displayLatitudeDMS,
  displayLongitudeDMS
} from '../../utils/display/displayCoordinates'
import { convertDateToString, dateColumnSort } from './dateFunctions'
import { sortRowsByNameProperty } from './sortFunctions'

export const columnsConfig: ColumnsType<HistoricalEvent> = [
  {
    dataIndex: 'name',
    defaultSortOrder: 'ascend',
    key: 'name',
    sortDirections: ['ascend', 'descend', 'ascend'],
    render: (text, event) => (
      <a
        href={`${HISTORICAL_EVENTS_SECTION + '/' + event.id}`}
        style={{ color: '#1e90ff' }}
      >
        {text}
      </a>
    ),
    sorter: (a, b) => sortRowsByNameProperty(a, b),
    title: 'Name',
    width: 600
  },
  {
    dataIndex: 'dateTime',
    key: 'dateTime',
    sortDirections: ['ascend', 'descend', 'ascend'],
    render(_, event) {
      return (
        <div>
          {event.date}
          <br />
          {event.time !== null ? event.time.toString() : ''}
        </div>
      )
    },
    sorter: (a, b) => {
      const firstDate = convertDateToString(a.date)
      const secondDate = convertDateToString(b.date)

      const firstDateObject: HistoricalDateObject = {
        date: a.date,
        time: null
      }
      const secondDateObject: HistoricalDateObject = {
        date: b.date,
        time: null
      }

      return dateColumnSort(
        firstDateObject,
        secondDateObject,
        firstDate,
        secondDate
      )
    },
    title: 'Date & Local Time',
    width: 150
  },
  {
    dataIndex: 'historical_state',
    defaultSortOrder: 'ascend',
    key: 'historical_state',
    render: (_, event) => event.historical_state.name,
    sortDirections: ['ascend', 'descend', 'ascend'],
    sorter: (a, b) =>
      sortRowsByNameProperty(a.historical_state, b.historical_state),
    title: 'Historical State',
    width: 275
  },
  {
    dataIndex: 'present_country',
    defaultSortOrder: 'ascend',
    key: 'present_country',
    render: (_, event) => event.present_country.name,
    sortDirections: ['ascend', 'descend', 'ascend'],
    sorter: (a, b) =>
      sortRowsByNameProperty(a.present_country, b.present_country),
    title: 'Birth Present Country',
    width: 175
  },
  {
    dataIndex: 'coordinates',
    key: 'coordinates',
    render(_, event) {
      return (
        event.approximate_location && (
          <div>
            {displayLatitudeDMS(event.latitude)}
            <br />
            {displayLongitudeDMS(event.longitude)}
          </div>
        )
      )
    },
    title: 'Coordinates',
    width: 75
  },
  {
    dataIndex: 'approximate_location',
    key: 'approximate_location',
    render: (value) => displayBooleanValues(value),
    sortDirections: ['ascend', 'descend', 'ascend'],
    sorter: (a, b) => {
      if (a.approximate_location && !b.approximate_location) {
        return 1
      } else if (!a.approximate_location && b.approximate_location) {
        return -1
      }
      return 0
    },
    title: 'Real Location',
    width: 125
  },
  {
    dataIndex: 'url',
    key: 'url',
    render: (_, event) => {
      return (
        <Button href={`${HISTORICAL_EVENTS_SECTION + '/' + event.id}`}>
          Details
        </Button>
      )
    },
    width: 75
  }
]
