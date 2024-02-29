import { Select } from 'antd'
import React from 'react'

import { HistoricalStateOptions } from '../../models/types/historicalState'
import { DefaultOptionType } from 'antd/es/select'

type HistoricalStatesDropdownProps = {
    historicalStates: HistoricalStateOptions,
    onChangeHistoricalState: (value: any, option: any) => void
    selectedValue: number | undefined,
    selectId: string
}

export const HistoricalStatesDropdown = (props: HistoricalStatesDropdownProps) => {
    const { onChangeHistoricalState, historicalStates, selectedValue, selectId } = props

    const searchHistoricalStatesDropdown = (input: string, option: DefaultOptionType | undefined) => {
        const historicalState = historicalStates.filter(hs => hs.value === option?.value).at(0)
        return historicalState?.label.toLocaleLowerCase().includes(input.toLocaleLowerCase()) || false
    }

    return (
        <Select
            dropdownRender={(menu) => (
                <div style={{ maxHeight: "300px" }}>
                    {menu}
                </div>
            )}
            filterOption={(input, option) => searchHistoricalStatesDropdown(input, option)}
            id={selectId}
            onChange={onChangeHistoricalState}
            placeholder='Please select a historical state.'
            showSearch
            value={selectedValue}
        >
                {historicalStates.map(option => (
                    <Select.Option key={option.value} value={option.value}>
                        <div style={{ whiteSpace: "pre-wrap" }}>{option.label}</div>
                    </Select.Option>
                ))}
        </Select>
    )
}