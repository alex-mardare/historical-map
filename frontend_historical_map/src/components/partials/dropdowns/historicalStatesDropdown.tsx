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

    const optionRender = (option: any) => {
        return (
            <div style={{ whiteSpace: "pre-wrap" }}>
                <div>{option.label}</div>
                <div>{option.data.description}</div>
            </div>
        )
    }

    return (
        <Select
            filterOption={(input, option) => searchHistoricalStatesDropdown(input, option)}
            id={selectId}
            labelInValue
            onChange={(valueObj: any, option) => {
                // dropdown option value is an object containing value
                const { value } = valueObj
                onChangeHistoricalState(value, option)
            }}
            optionRender={optionRender}
            options={historicalStates}
            placeholder='Please select a historical state.'
            showSearch
            value={selectedValue}
        />
    )
}