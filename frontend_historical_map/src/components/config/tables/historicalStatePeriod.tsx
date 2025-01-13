import { Tag } from 'antd'
import { ColumnsType } from 'antd/es/table'
import React from 'react'

import { HistoricalState } from '../../models/types/historicalState'
import { displayHumanReadableDate } from '../../utils/display/displayDates'

export const columnsConfig: ColumnsType<HistoricalState> = [
  {
    dataIndex: 'name',
    key: 'name',
    sortDirections: ['ascend', 'descend', 'ascend'],
    title: 'Historical State',
    width: '40%'
  },
  {
    dataIndex: 'period',
    key: 'period',
    render: (_, historicalState) => {
      return (
        <div>
          <Tag color="blue" key={historicalState.id}>
            {`${displayHumanReadableDate(historicalState.start_date)} -> ${displayHumanReadableDate(historicalState.end_date)}`}
          </Tag>
        </div>
      )
    },
    title: 'Time periods',
    width: '60%%'
  }
]
