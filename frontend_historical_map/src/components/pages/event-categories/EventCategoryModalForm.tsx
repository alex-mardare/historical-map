import { Form, Input } from 'antd'
import React from 'react'

import { EventCategory } from '../../models/types/eventCategory'
import { formValidationMessages } from '../../utils/validators/formValidator'

type EventCategoryModalProp = {
  eventCategory: EventCategory | null
  form: any
  onFinish?: (values: any) => void
}

export default function HistoricalStateModalForm(
  props: EventCategoryModalProp
) {
  const displayIdFormItem = (historicalState: EventCategory | null) => {
    if (historicalState !== null) {
      return (
        <Form.Item
          hidden={true}
          initialValue={props.eventCategory?.id}
          label="Id"
          name="id"
        >
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
      <Form
        form={props.form}
        labelCol={{ span: 7 }}
        onFinish={handleSubmit}
        validateMessages={formValidationMessages}
        wrapperCol={{ span: 16 }}
      >
        {displayIdFormItem(props.eventCategory)}
        <Form.Item
          initialValue={props.eventCategory?.name}
          label="Name"
          name="name"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </div>
  )
}
