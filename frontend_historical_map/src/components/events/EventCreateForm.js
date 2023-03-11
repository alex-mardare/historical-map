import { Form, Input, InputNumber, Select, TimePicker } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

import { HistoricalStateDropdown } from '../config/components/HistoricalStateDropdown';
import { DATE_FORMAT, TIME_FORMAT } from '../config/constants/constants';
import { DEV_API_EVENTS_APP_BASE_URL, 
    EVENTS_APP_EVENT_CATEGORIES_ENDPOINT, 
    EVENTS_APP_HISTORICAL_STATES_ENDPOINT, 
    EVENTS_APP_PRESENT_COUNTRIES_ENDPOINT } from '../config/constants/endpoints';
import { eventCategoriesLoadingError, historicalStatesLoadingError, presentCountriesLoadingError } from '../config/notifications/events';
import { transformHistoricalStatesForSelector } from '../config/transformers/eventCategorySelector';


export default function EventCreateForm(props)
{
    const [eventCategories, setEventCategories] = useState([])
    const [presentCountries, setPresentCountries] = useState([])
    const [historicalStates, setHistoricalStates] = useState([])

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

    const dateFieldValidator = async (rule, value) => {
        if (!DATE_FORMAT.test(value)) {
            return Promise.reject('The date must have one of the following formats: YYYY, YYYY-MM, YYYY-MM-DD. Negative years are allowed.');
        }
        return Promise.resolve();
    }

    const handleSubmit = (values) => {
        if (props.onFinish) {
            props.onFinish(values);
        }
    }

    return (
      <div>
        <Form form={props.form} labelCol={{span: 6}} onFinish={handleSubmit} wrapperCol={{span: 16}}>
            <Form.Item label='Name' name='name' rules={[{ required: true }]}>
                <Input />
            </Form.Item>
            <Form.Item label='Description' name='description' rules={[{ required: true }]}>
                <TextArea rows={4}/>
            </Form.Item>
            <Form.Item label='Date' name='date' rules={[{ required: true }, { validator: dateFieldValidator}]}>
                <Input />
            </Form.Item>
            <Form.Item label='Time' name='time'>
                <TimePicker format={TIME_FORMAT} />
            </Form.Item>
            <Form.Item label='Latitude' name='latitude'>
                <InputNumber max={180} min={-180} step={0.000001} style={{width:120}} />
            </Form.Item>
            <Form.Item label='Longitude' name='longitude'>
                <InputNumber max={180} min={-180} step={0.000001} style={{width:120}} />
            </Form.Item>
            <Form.Item label='Event Category' name='eventCategoryId' rules={[{ required: true }]}>
                <Select
                    fieldNames={{ label: 'name', value:'id'}}
                    filterOption={(input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase())} 
                    options={eventCategories} 
                    placeholder='Please select an event category.'
                    showSearch>
                </Select>
            </Form.Item>
            <Form.Item label='Present Country' name='presentCountryId' rules={[{ required: true }]}>
                <Select 
                    fieldNames={{ label: 'name', value:'id'}}
                    filterOption={(input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase())} 
                    options={presentCountries} 
                    placeholder='Please select a country.'
                    showSearch>
                </Select>
            </Form.Item>
            <Form.Item label='Historical State' name='historicalStateId' rules={[{ required: true }]}>
                <HistoricalStateDropdown options={historicalStates} />
            </Form.Item>
        </Form>
      </div>  
    );
}
