import { Table } from 'antd'
import React from 'react'

import { columnsConfig } from '../../config/tables/presentCountryPeriod'
import { PresentCountry } from '../../models/types/presentCountry'

import '../../../assets/styling/tablePage.css'

type PresentCountryPeriodsProps = {
  presentCountries: PresentCountry[] | undefined
}

export default function PresentCountryPeriods({
  presentCountries
}: PresentCountryPeriodsProps) {
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
