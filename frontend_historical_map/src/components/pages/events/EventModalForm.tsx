import { Form, Input, InputNumber, Select, TimePicker } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import dayjs from 'dayjs'
import React, { useState } from 'react'

import { TIME_FORMAT } from '../../models/constants/constants'
import { HistoricalEvent } from '../../models/types/historicalEvent'
import { HistoricalStatesDropdown } from '../../partials/dropdowns/HistoricalStatesDropdown'
import { PresentCountriesDropdown } from '../../partials/dropdowns/PresentCountriesDropdown'
import { useGetEventCategories } from '../../utils/hooks/eventCategoriesHooks'
import { useGetHistoricalStatesOptions } from '../../utils/hooks/historicalStatesHooks'
import { useGetPresentCountries } from '../../utils/hooks/presentCountriesHooks'
import { dateFieldValidator } from '../../utils/validators/dateValidator'
import { formValidationMessages } from '../../utils/validators/formValidator'

type EventModalProp = {
  event: HistoricalEvent | null
  form: any
  onFinish?: (values: any) => void
}

export default function EventModalForm({
  event,
  form,
  onFinish
}: EventModalProp) {
  const [historicalStateOption, setHistoricalStateOption] = useState(
    event?.historicalState?.id
  )
  const [presentCountryOption, setPresentCountryOption] = useState(
    event?.presentCountry?.id
  )

  const { eventCategories } = useGetEventCategories()
  const { historicalStates } = useGetHistoricalStatesOptions()
  const { presentCountries } = useGetPresentCountries(historicalStateOption)

  const displayIdFormItem = (event: HistoricalEvent | null) => {
    if (event !== null) {
      return (
        <Form.Item hidden={true} initialValue={event?.id} label="Id" name="id">
          <Input />
        </Form.Item>
      )
    }
  }

  const handleSubmit = (values: any) => {
    if (onFinish) {
      onFinish(values)
    }
  }

  return (
    <div>
      <Form
        form={form}
        labelCol={{ span: 6 }}
        onFinish={handleSubmit}
        validateMessages={formValidationMessages}
        wrapperCol={{ span: 16 }}
      >
        {displayIdFormItem(event)}
        <Form.Item
          initialValue={event?.name}
          label="Name"
          name="name"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          initialValue={event?.description}
          label="Description"
          name="description"
          rules={[{ required: true }]}
        >
          <TextArea rows={4} />
        </Form.Item>
        <Form.Item
          initialValue={event?.date}
          label="Date"
          name="date"
          rules={[{ required: true }, { validator: dateFieldValidator }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          initialValue={event?.time ? dayjs(event?.time, 'HH:mm:ss') : null}
          label="Time"
          name="time"
        >
          <TimePicker format={TIME_FORMAT} />
        </Form.Item>
        <Form.Item
          initialValue={event?.latitude}
          label="Latitude"
          name="latitude"
        >
          <InputNumber
            max={180}
            min={-180}
            step={0.000001}
            style={{ width: 120 }}
          />
        </Form.Item>
        <Form.Item
          initialValue={event?.longitude}
          label="Longitude"
          name="longitude"
        >
          <InputNumber
            max={180}
            min={-180}
            step={0.000001}
            style={{ width: 120 }}
          />
        </Form.Item>
        <Form.Item
          initialValue={event?.eventCategory.id}
          label="Event Category"
          name="eventCategoryId"
          rules={[{ required: true }]}
        >
          <Select
            fieldNames={{ label: 'name', value: 'id' }}
            filterOption={(input, option) =>
              (option?.name ?? '').toLowerCase().includes(input.toLowerCase())
            }
            options={eventCategories}
            placeholder="Please select an event category."
            showSearch
          />
        </Form.Item>
        <Form.Item
          initialValue={historicalStateOption}
          label="Historical State"
          name="historicalStateId"
          rules={[{ required: true }]}
        >
          <HistoricalStatesDropdown
            form={form}
            presentCountryFormName="presentCountryId"
            selectedValue={historicalStateOption}
            selectId={'historicalStateId'}
            {...{
              historicalStates,
              setHistoricalStateOption,
              setPresentCountryOption
            }}
          />
        </Form.Item>
        <Form.Item
          initialValue={presentCountryOption}
          label="Present Country"
          name="presentCountryId"
          rules={[{ required: true }]}
        >
          <PresentCountriesDropdown
            form={form}
            selectedValue={presentCountryOption}
            selectId={'presentCountryId'}
            {...{ presentCountries, setPresentCountryOption }}
          />
        </Form.Item>
      </Form>
    </div>
  )
}
