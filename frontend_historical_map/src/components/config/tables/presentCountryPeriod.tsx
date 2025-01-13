import { Tag } from 'antd'
import { ColumnsType } from 'antd/es/table'
import React from 'react'

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
    dataIndex: 'flag_url',
    key: 'flag_url',
    render: (_, presentCountry) => {
      return (
        <img
          alt={`${presentCountry.name} flag`}
          className="present-country-period-flag"
          src={`${presentCountry.flag_url}`}
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
            {`${displayHumanReadableDate(presentCountry.start_date)} -> ${displayHumanReadableDate(presentCountry.end_date)}`}
          </Tag>
        </div>
      )
    },
    title: 'Time periods',
    width: '65%'
  }
]
