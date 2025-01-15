import { Select } from 'antd'
import React from 'react'

import { DefaultOptionType } from 'antd/es/select'
import { HistoricalStateOption } from '../../models/types/historicalState'

type propType = {
  form: any
  historicalStates: HistoricalStateOption[]
  presentCountryFormName: string
  selectedValue: number | undefined
  selectId: string
  setHistoricalStateOption: (value: any) => void
  setPresentCountryOption: (value: any) => void
}

export default function HistoricalStatesDropdown({
  form,
  historicalStates,
  presentCountryFormName,
  selectedValue,
  selectId,
  setHistoricalStateOption,
  setPresentCountryOption
}: propType) {
  const onChangeHistoricalState = (value: any) => {
    setHistoricalStateOption(value)
    setPresentCountryOption(undefined)

    form.setFieldsValue({ historicalStateId: value })
    form.resetFields([presentCountryFormName])
  }

  const optionRender = (option: any) => {
    return (
      <div style={{ whiteSpace: 'pre-wrap' }}>
        <div>{option.label}</div>
        <div>{option.data.description}</div>
      </div>
    )
  }

  const searchHistoricalStatesDropdown = (
    input: string,
    option: DefaultOptionType | undefined
  ) => {
    const historicalState = historicalStates
      .filter((hs) => hs.value === option?.value)
      .at(0)
    return (
      historicalState?.label
        .toLocaleLowerCase()
        .includes(input.toLocaleLowerCase()) || false
    )
  }

  return (
    <Select
      filterOption={(input, option) =>
        searchHistoricalStatesDropdown(input, option)
      }
      id={selectId}
      onChange={(value: any, option) => {
        onChangeHistoricalState(value)
      }}
      optionRender={optionRender}
      options={historicalStates}
      placeholder="Please select a historical state."
      showSearch
      value={selectedValue}
    />
  )
}
