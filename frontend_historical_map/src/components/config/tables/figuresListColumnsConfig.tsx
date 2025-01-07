import { Button } from 'antd'
import { ColumnsType } from 'antd/es/table'
import React from 'react'

import { HISTORICAL_FIGURES_SECTION } from '../../models/constants/urls'
import { HistoricalDateObject } from '../../models/types/historicalDateObject'
import { HistoricalFigure } from '../../models/types/historicalFigure'
import { convertDateToString, dateColumnSort } from './dateFunctions'
import { sortRowsByNameProperty } from './sortFunctions'

export const columnsConfig: ColumnsType<HistoricalFigure> = [
  {
    dataIndex: 'name',
    defaultSortOrder: 'ascend',
    key: 'name',
    sortDirections: ['ascend', 'descend', 'ascend'],
    render: (text, figure) => (
      <a
        href={`${HISTORICAL_FIGURES_SECTION + '/' + figure.id}`}
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
    dataIndex: 'birth_date',
    key: 'birth_date',
    sortDirections: ['ascend', 'descend', 'ascend'],
    sorter: (a, b) => {
      const firstDate = convertDateToString(a.birth_date)
      const secondDate = convertDateToString(b.birth_date)

      const firstDateObject: HistoricalDateObject = {
        date: a.birth_date,
        time: null
      }
      const secondDateObject: HistoricalDateObject = {
        date: b.birth_date,
        time: null
      }

      return dateColumnSort(
        firstDateObject,
        secondDateObject,
        firstDate,
        secondDate
      )
    },
    title: 'Birth Date',
    width: 110
  },
  {
    dataIndex: 'death_date',
    key: 'death_date',
    sortDirections: ['ascend', 'descend', 'ascend'],
    sorter: (a, b) => {
      const firstDate = convertDateToString(a.death_date)
      const secondDate = convertDateToString(b.death_date)

      const firstDateObject: HistoricalDateObject = {
        date: a.death_date,
        time: null
      }
      const secondDateObject: HistoricalDateObject = {
        date: b.death_date,
        time: null
      }

      return dateColumnSort(
        firstDateObject,
        secondDateObject,
        firstDate,
        secondDate
      )
    },
    title: 'Death Date',
    width: 110
  },
  {
    dataIndex: 'birth_historical_state',
    defaultSortOrder: 'ascend',
    key: 'birth_historical_state',
    render: (_, historicalFigure) =>
      historicalFigure.birth_historical_state.name,
    sortDirections: ['ascend', 'descend', 'ascend'],
    sorter: (a, b) =>
      sortRowsByNameProperty(
        a.birth_historical_state,
        b.birth_historical_state
      ),
    title: 'Birth Historical State',
    width: 275
  },
  {
    dataIndex: 'birth_present_country',
    defaultSortOrder: 'ascend',
    key: 'birth_present_country',
    render: (_, historicalFigure) =>
      historicalFigure.birth_present_country.name,
    sortDirections: ['ascend', 'descend', 'ascend'],
    sorter: (a, b) =>
      sortRowsByNameProperty(a.birth_present_country, b.birth_present_country),
    title: 'Birth Present Country',
    width: 175
  },
  {
    dataIndex: 'death_historical_state',
    defaultSortOrder: 'ascend',
    key: 'death_historical_state',
    render: (_, historicalFigure) =>
      historicalFigure.death_historical_state?.name,
    sortDirections: ['ascend', 'descend', 'ascend'],
    sorter: (a, b) =>
      sortRowsByNameProperty(
        a.death_historical_state,
        b.death_historical_state
      ),
    title: 'Death Historical State',
    width: 275
  },
  {
    dataIndex: 'death_present_country',
    defaultSortOrder: 'ascend',
    key: 'death_present_country',
    render: (_, historicalFigure) =>
      historicalFigure.death_present_country?.name,
    sortDirections: ['ascend', 'descend', 'ascend'],
    sorter: (a, b) =>
      sortRowsByNameProperty(a.death_present_country, b.death_present_country),
    title: 'Death Present Country',
    width: 175
  },
  {
    dataIndex: 'url',
    key: 'url',
    render: (_, figure) => {
      return (
        <Button href={`${HISTORICAL_FIGURES_SECTION + '/' + figure.id}`}>
          Details
        </Button>
      )
    },
    width: 50
  }
]
