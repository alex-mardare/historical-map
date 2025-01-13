import { Table } from 'antd'
import React from 'react'

import { columnsConfig } from '../../config/tables/historicalStatePeriod'
import { HistoricalState } from '../../models/types/historicalState'

import '../../../assets/styling/tablePage.css'

type propType = {
  historicalStates: HistoricalState[] | undefined
}

export default function HistoricalStatePeriodList({
  historicalStates
}: propType) {
  return (
    <div className="table-div">
      <Table
        columns={columnsConfig}
        dataSource={historicalStates}
        pagination={{ hideOnSinglePage: true }}
        rowKey={(object) => object.id}
      />
    </div>
  )
}
