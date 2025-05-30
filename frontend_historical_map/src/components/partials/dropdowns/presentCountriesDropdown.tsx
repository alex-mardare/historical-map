import { Select } from 'antd'
import React from 'react'

import { PresentCountry } from '../../models/types/presentCountry'

type propType = {
  form: any
  presentCountries: PresentCountry[]
  selectedValue: number | undefined
  selectId: string
  setPresentCountryOption: (value: any) => void
}

export default function PresentCountriesDropdown({
  form,
  presentCountries,
  selectedValue,
  selectId,
  setPresentCountryOption
}: propType) {
  const onChangePresentCountry = (value: any) => {
    setPresentCountryOption(value)

    form.setFieldsValue({ [selectId]: value })
  }

  return (
    <Select
      fieldNames={{ label: 'name', value: 'id' }}
      filterOption={(input, option) =>
        (option?.name ?? '').toLowerCase().includes(input.toLowerCase())
      }
      id={selectId}
      onChange={onChangePresentCountry}
      options={presentCountries}
      placeholder="Please select a country."
      showSearch
      value={selectedValue}
    />
  )
}
