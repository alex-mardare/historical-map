import { Form, Input, Select } from 'antd'
import React from 'react'

import { HistoricalState } from '../../models/types/historicalState'
import { useGetPresentCountries } from '../../utils/hooks/presentCountriesHooks'
import { dateFieldValidator } from '../../utils/validators/dateValidator'
import { formValidationMessages } from '../../utils/validators/formValidator'

type propType = {
  form: any
  historicalState: HistoricalState | null
  onFinish?: (values: any) => void
}

export default function HistoricalStateModalForm({
  form,
  historicalState,
  onFinish
}: propType) {
  const { presentCountries } = useGetPresentCountries(null)

  const displayIdFormItem = (historicalState: HistoricalState | null) => {
    if (historicalState !== null) {
      return (
        <Form.Item
          hidden={true}
          initialValue={historicalState?.id}
          label="Id"
          name="id"
        >
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
        labelCol={{ span: 7 }}
        onFinish={handleSubmit}
        validateMessages={formValidationMessages}
        wrapperCol={{ span: 16 }}
      >
        {displayIdFormItem(historicalState)}
        <Form.Item
          initialValue={historicalState?.name}
          label="Name"
          name="name"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          initialValue={historicalState?.start_date}
          label="Foundation Date"
          name="start_date"
          rules={[{ required: true }, { validator: dateFieldValidator }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          initialValue={historicalState?.end_date}
          label="Dissolution Date"
          name="end_date"
          rules={[{ required: true }, { validator: dateFieldValidator }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          initialValue={historicalState?.present_countries.map((hs) => hs.id)}
          label="Present Countries"
          name="present_countries"
          rules={[{ required: true }]}
        >
          <Select
            fieldNames={{ label: 'name', value: 'id' }}
            filterOption={(input, option) =>
              (option?.name ?? '').toLowerCase().includes(input.toLowerCase())
            }
            mode="multiple"
            options={presentCountries}
            placeholder="Please select the present countries."
            showSearch
          />
        </Form.Item>
      </Form>
    </div>
  )
}
