import { Select } from 'antd'
import React from 'react'

import { PresentCountries } from '../../models/types/presentCountry'

type PresentCountriesDropdownProps = {
    onChangePresentCountry: (value: any, option: any) => void
    presentCountries: PresentCountries,
    selectedValue: number | undefined,
    selectId: string
}

export const PresentCountriesDropdown = (props: PresentCountriesDropdownProps) => {
    const { onChangePresentCountry, presentCountries, selectedValue, selectId } = props

    return (
        <Select
            fieldNames={{ label: 'name', value:'id'}}
            filterOption={(input, option) => (option?.name ?? '').toLowerCase().includes(input.toLowerCase())}
            id={selectId}
            onChange={onChangePresentCountry} 
            options={presentCountries} 
            placeholder='Please select a country.'
            showSearch
            value={selectedValue}
        />
    )
}