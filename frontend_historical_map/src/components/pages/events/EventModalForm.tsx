import { Form, Input, InputNumber, Select, TimePicker } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import axios from 'axios';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';

import { DATE_FORMAT, TIME_FORMAT } from '../../models/constants/constants';
import { DEV_API_EVENTS_APP_BASE_URL, 
    EVENTS_APP_EVENT_CATEGORIES_ENDPOINT, 
    EVENTS_APP_HISTORICAL_STATES_ENDPOINT, 
    EVENTS_APP_PRESENT_COUNTRIES_ENDPOINT } from '../../models/constants/urls';
import { EventCategories } from '../../models/types/eventCategory';
import { HistoricalEvent } from '../../models/types/historicalEvent';
import { HistoricalStateOptions } from '../../models/types/historicalState';
import { PresentCountries } from '../../models/types/presentCountry';
import { eventCategoriesLoadingError, historicalStatesLoadingError, presentCountriesLoadingError } from '../../partials/notifications';
import { transformHistoricalStatesForSelector } from '../../utils/selectors/eventCategorySelector';


type EventCreateFormProps = {
    event: HistoricalEvent | null;
    form: any;
    onFinish?: (values: any) => void;
}

export default function EventModalForm(props:EventCreateFormProps)
{
    const [eventCategories, setEventCategories] = useState<EventCategories>([])
    const [presentCountries, setPresentCountries] = useState<PresentCountries>([])
    const [historicalStates, setHistoricalStates] = useState<HistoricalStateOptions>([])

    useEffect(() => {
        axios.get(DEV_API_EVENTS_APP_BASE_URL + EVENTS_APP_EVENT_CATEGORIES_ENDPOINT)
            .then(res => setEventCategories(res.data))
            .catch(() => eventCategoriesLoadingError());

        axios.get(DEV_API_EVENTS_APP_BASE_URL + EVENTS_APP_HISTORICAL_STATES_ENDPOINT)
            .then(res => setHistoricalStates(transformHistoricalStatesForSelector(res.data)))
            .catch(() => historicalStatesLoadingError())

        axios.get(DEV_API_EVENTS_APP_BASE_URL + EVENTS_APP_PRESENT_COUNTRIES_ENDPOINT)
            .then(res => setPresentCountries(res.data))
            .catch(() => presentCountriesLoadingError())
    }, []);

    const dateFieldValidator = async (rule: any, value: string) => {
        if (!DATE_FORMAT.test(value)) {
            return Promise.reject('The date must have one of the following formats: YYYY, YYYY-MM, YYYY-MM-DD. Negative years are allowed.');
        }
        return Promise.resolve();
    }

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
            props.onFinish(values);
        }
    }

    return (
      <div>
        <Form form={props.form} labelCol={{span: 6}} onFinish={handleSubmit} wrapperCol={{span: 16}}>
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
            <Form.Item initialValue={props.event?.presentCountry.id} label='Present Country' name='presentCountryId' rules={[{ required: true }]}>
                <Select 
                    fieldNames={{ label: 'name', value:'id'}}
                    filterOption={(input, option) => (option?.name ?? '').toLowerCase().includes(input.toLowerCase())} 
                    options={presentCountries} 
                    placeholder='Please select a country.'
                    showSearch
                />
            </Form.Item>
            <Form.Item initialValue={props.event?.historicalState.id} label='Historical State' name='historicalStateId' rules={[{ required: true }]}>
                <Select
                    dropdownRender={(menu) => (
                        <div style={{ maxHeight: "300px" }}>
                            {menu}
                        </div>
                    )}
                    placeholder='Please select a historical state.'
                    showSearch>
                        {historicalStates.map(option => (
                            <Select.Option key={option.value} value={option.value}>
                                <div style={{ whiteSpace: "pre-wrap" }}>{option.label}</div>
                            </Select.Option>
                        ))}
                </Select>
            </Form.Item>
        </Form>
      </div>  
    );
}
