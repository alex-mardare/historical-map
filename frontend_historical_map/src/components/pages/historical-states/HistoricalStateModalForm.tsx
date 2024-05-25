import { Form, Input, Select } from 'antd'
import React from 'react'

import { HistoricalState } from '../../models/types/historicalState'
import { useFetchPresentCountries } from '../../utils/hooks/countriesHooks'
import { dateFieldValidator } from '../../utils/validators/dateValidator'
import { formValidationMessages } from '../../utils/validators/formValidator'


type HistoricalStateModalProp = {
    form: any,
    historicalState: HistoricalState | null
    onFinish?: (values: any) => void
}

export default function HistoricalStateModalForm(props:HistoricalStateModalProp) {
    const { presentCountries } = useFetchPresentCountries(null)

    const displayIdFormItem = (historicalState: HistoricalState | null) => {
        if (historicalState !== null) {
            return (
                <Form.Item hidden={true} initialValue={props.historicalState?.id} label='Id' name='id'>
                    <Input />
                </Form.Item>
            )
        }
    }

    const handleSubmit = (values: any) => {
        if (props.onFinish) {
            props.onFinish(values)
        }
    }

    return (
      <div>
        <Form form={props.form} labelCol={{span: 7}} onFinish={handleSubmit} validateMessages={formValidationMessages} wrapperCol={{span: 16}}>
            {displayIdFormItem(props.historicalState)}
            <Form.Item initialValue={props.historicalState?.name} label='Name' name='name' rules={[{ required: true }]}>
                <Input />
            </Form.Item>
            <Form.Item initialValue={props.historicalState?.dateFrom} label='Foundation Date' name='dateFrom' rules={[{ required: true }, { validator: dateFieldValidator}]}>
                <Input />
            </Form.Item>
            <Form.Item initialValue={props.historicalState?.dateTo} label='Dissolution Date' name='dateTo' rules={[{ required: true }, { validator: dateFieldValidator}]}>
                <Input />
            </Form.Item>
            <Form.Item initialValue={props.historicalState?.presentCountries.map(hs => hs.id)} label='Present Countries' name='presentCountries' rules={[{ required: true }]}>
                <Select
                    fieldNames={{ label: 'name', value:'id'}}
                    filterOption={(input, option) => (option?.name ?? '').toLowerCase().includes(input.toLowerCase())} 
                    mode='multiple'
                    options={presentCountries} 
                    placeholder='Please select the present countries.'
                    showSearch
                />
            </Form.Item>
        </Form>
      </div>  
    )
}
