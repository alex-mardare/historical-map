import { Button, Tag } from 'antd'
import { ColumnsType } from 'antd/es/table'
import React from 'react'

import {
  HISTORICAL_STATES_SECTION,
  PRESENT_COUNTRIES_SECTION
} from '../../models/constants/urls'
import { HistoricalDateObject } from '../../models/types/historicalDateObject'
import { HistoricalState } from '../../models/types/historicalState'
import { convertDateToString, dateColumnSort } from './dateFunctions'
import { sortRowsByNameProperty } from './sortFunctions'

export const columnsConfig: ColumnsType<HistoricalState> = [
  {
    dataIndex: 'name',
    defaultSortOrder: 'ascend',
    key: 'name',
    sortDirections: ['ascend', 'descend', 'ascend'],
    render: (text, historicalState) => (
      <a
        href={`${HISTORICAL_STATES_SECTION + '/' + historicalState.id}`}
        style={{ color: '#1e90ff' }}
      >
        {text}
      </a>
    ),
    sorter: (a, b) => sortRowsByNameProperty(a, b),
    title: 'Name',
    width: 200
  },
  {
    dataIndex: 'start_date',
    key: 'start_date',
    sortDirections: ['ascend', 'descend', 'ascend'],
    render(_, historicalState) {
      return <div>{historicalState.start_date}</div>
    },
    sorter: (a, b) => {
      const firstDate = convertDateToString(a.start_date)
      const secondDate = convertDateToString(b.start_date)

      const firstDateObject: HistoricalDateObject = {
        date: a.start_date,
        time: null
      }
      const secondDateObject: HistoricalDateObject = {
        date: b.start_date,
        time: null
      }

      return dateColumnSort(
        firstDateObject,
        secondDateObject,
        firstDate,
        secondDate
      )
    },
    title: 'Foundation Date',
    width: 70
  },
  {
    dataIndex: 'end_date',
    key: 'end_date',
    sortDirections: ['ascend', 'descend', 'ascend'],
    render(_, historicalState) {
      return <div>{historicalState.end_date}</div>
    },
    sorter: (a, b) => {
      const firstDate = convertDateToString(a.end_date)
      const secondDate = convertDateToString(b.end_date)

      const firstDateObject: HistoricalDateObject = {
        date: a.start_date,
        time: null
      }
      const secondDateObject: HistoricalDateObject = {
        date: b.start_date,
        time: null
      }

      return dateColumnSort(
        firstDateObject,
        secondDateObject,
        firstDate,
        secondDate
      )
    },
    title: 'Dissolution Date',
    width: 70
  },
  {
    dataIndex: 'present_countries',
    key: 'present_countries',
    render: (text, historicalState) => {
      return (
        <div>
          {historicalState.present_countries.map((presentCountry) => (
            <Tag color="blue" key={presentCountry.id}>
              <a
                href={`${PRESENT_COUNTRIES_SECTION + '/' + presentCountry.id}`}
              >
                {presentCountry.name}
              </a>
            </Tag>
          ))}
        </div>
      )
    },
    title: 'Present Countries',
    width: 200
  },
  {
    dataIndex: 'url',
    key: 'url',
    render: (_, historicalState) => {
      return (
        <Button
          href={`${HISTORICAL_STATES_SECTION + '/' + historicalState.id}`}
        >
          Details
        </Button>
      )
    },
    width: 50
  }
]
