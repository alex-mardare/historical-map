import { Table } from 'antd'
import React from 'react'

import { columnsConfig } from '../../config/tables/presentCountryPeriod'
import { PresentCountry } from '../../models/types/presentCountry'

import '../../../assets/styling/tablePage.css'

type propType = {
  presentCountries: PresentCountry[] | undefined
}

export default function PresentCountryPeriodList({
  presentCountries
}: propType) {
  return (
    <div className="table-div">
      <Table
        columns={columnsConfig}
        dataSource={presentCountries}
        pagination={{ hideOnSinglePage: true }}
        rowKey={(object) => object.id}
      />
    </div>
  )
}
