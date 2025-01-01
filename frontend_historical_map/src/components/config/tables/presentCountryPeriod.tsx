import { ColumnsType } from 'antd/es/table'
import React from 'react'

import { Tag } from 'antd'
import { PresentCountry } from '../../models/types/presentCountry'
import { displayHumanReadableDate } from '../../utils/display/displayDates'

export const columnsConfig: ColumnsType<PresentCountry> = [
  {
    dataIndex: 'name',
    key: 'name',
    sortDirections: ['ascend', 'descend', 'ascend'],
    title: 'Present Country',
    width: '30%'
  },
  {
    dataIndex: 'flagUrl',
    key: 'flagUrl',
    render: (_, presentCountry) => {
      return (
        <img
          alt={`${presentCountry.name} flag`}
          className="present-country-period-flag"
          src={`${presentCountry.flagUrl}`}
        />
      )
    },
    title: 'Flag',
    width: '5%'
  },
  {
    dataIndex: 'period',
    key: 'period',
    render: (_, presentCountry) => {
      return (
        <div>
          <Tag color="blue" key={presentCountry.id}>
            {`${displayHumanReadableDate(presentCountry.dateFrom)} -> ${displayHumanReadableDate(presentCountry.dateTo)}`}
          </Tag>
        </div>
      )
    },
    title: 'Time periods',
    width: '65%'
  }
]
