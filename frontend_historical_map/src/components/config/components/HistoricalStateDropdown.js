import React from 'react';
import { Select } from 'antd';

export const HistoricalStateDropdown = ({options, ...props}) => {
    return(
        <Select
            {...props}
            dropdownRender={(menu) => (
                <div style={{ maxHeight: "300px" }}>
                    {menu}
                </div>
                )}
            filterOption={(input, option) => (
                (option?.children?.props.children ?? '').toLowerCase().includes(input.toLowerCase())
            )}
            placeholder='Please select a historical state.'
            showSearch>
                {options.map(option => (
                    <Select.Option key={option.value} value={option.value}>
                        <div style={{ whiteSpace: "pre-wrap" }}>{option.label}</div>
                    </Select.Option>
                ))}
        </Select>
    );
}