import { Form, Input, InputNumber, Select, TimePicker } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import dayjs from 'dayjs'
import React, { useState } from 'react'

import { TIME_FORMAT } from '../../models/constants/constants'
import { HistoricalEvent } from '../../models/types/historicalEvent'
import { HistoricalStatesDropdown } from '../../partials/dropdowns/historicalStatesDropdown'
import { PresentCountriesDropdown } from '../../partials/dropdowns/presentCountriesDropdown'
import { useGetPresentCountries } from '../../utils/hooks/presentCountriesHooks'
import { useGetHistoricalStatesOptions } from '../../utils/hooks/historicalStatesHooks'
import { useGetEventCategories } from '../../utils/hooks/eventPropertiesHooks'
import { dateFieldValidator } from '../../utils/validators/dateValidator'
import { formValidationMessages } from '../../utils/validators/formValidator'


type EventModalProp = {
    event: HistoricalEvent | null
    form: any
    onFinish?: (values: any) => void
}

export default function EventModalForm(props:EventModalProp) {
    const [historicalStateOption, setHistoricalStateOption] = useState(props.event?.historicalState?.id)
    const [presentCountryOption, setPresentCountryOption] = useState(props.event?.presentCountry?.id)

    const { eventCategories } = useGetEventCategories()
    const { historicalStates } = useGetHistoricalStatesOptions()
    const { presentCountries } = useGetPresentCountries(historicalStateOption)

    const displayIdFormItem = (event: HistoricalEvent | null) => {
        if (event !== null) {
            return (
                <Form.Item hidden={true} initialValue={props.event?.id} label='Id' name='id'>
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

    const onChangeHistoricalState = (value: any, option: any) => {
        setHistoricalStateOption(value)
        setPresentCountryOption(undefined)

        props.form.setFieldsValue({ historicalStateId: value })
        props.form.resetFields(['presentCountryId'])
    }

    const onChangePresentCountry = (value: any, option: any) => {
        setPresentCountryOption(value)
        
        props.form.setFieldsValue({ presentCountryId: value })
    }

    return (
      <div>
        <Form form={props.form} labelCol={{span: 6}} onFinish={handleSubmit} validateMessages={formValidationMessages} wrapperCol={{span: 16}}>
            {displayIdFormItem(props.event)}
            <Form.Item initialValue={props.event?.name} label='Name' name='name' rules={[{ required: true }]}>
                <Input />
            </Form.Item>
            <Form.Item initialValue={props.event?.description} label='Description' name='description' rules={[{ required: true }]}>
                <TextArea rows={4}/>
            </Form.Item>
            <Form.Item initialValue={props.event?.date} label='Date' name='date' rules={[{ required: true }, { validator: dateFieldValidator}]}>
                <Input />
            </Form.Item>
            <Form.Item initialValue={props.event?.time ? dayjs(props.event?.time, 'HH:mm:ss') : null} label='Time' name='time'>
                <TimePicker format={TIME_FORMAT} />
            </Form.Item>
            <Form.Item initialValue={props.event?.latitude} label='Latitude' name='latitude'>
                <InputNumber max={180} min={-180} step={0.000001} style={{width:120}} />
            </Form.Item>
            <Form.Item initialValue={props.event?.longitude} label='Longitude' name='longitude'>
                <InputNumber max={180} min={-180} step={0.000001} style={{width:120}} />
            </Form.Item>
            <Form.Item initialValue={props.event?.eventCategory.id} label='Event Category' name='eventCategoryId' rules={[{ required: true }]}>
                <Select
                    fieldNames={{ label: 'name', value:'id'}}
                    filterOption={(input, option) => (option?.name ?? '').toLowerCase().includes(input.toLowerCase())} 
                    options={eventCategories} 
                    placeholder='Please select an event category.'
                    showSearch
                />
            </Form.Item>
            <Form.Item initialValue={historicalStateOption} label='Historical State' name='historicalStateId' rules={[{ required: true }]}>
                <HistoricalStatesDropdown {...{ historicalStates, onChangeHistoricalState }} selectedValue={historicalStateOption} selectId={'historicalStateId'}/>
            </Form.Item>
            <Form.Item initialValue={presentCountryOption} label='Present Country' name='presentCountryId' rules={[{ required: true }]}>
                <PresentCountriesDropdown {...{ onChangePresentCountry, presentCountries }} selectedValue={presentCountryOption} selectId={'presentCountryId'} />
            </Form.Item>
        </Form>
      </div>  
    )
}
