import { Form, Input } from 'antd'
import React from 'react'

import { EventCategory } from '../../models/types/eventCategory'
import { formValidationMessages } from '../../utils/validators/formValidator'

type EventCategoryModalProps = {
  eventCategory: EventCategory | null
  form: any
  onFinish?: (values: any) => void
}

export default function EventCategoryModalForm({
  eventCategory,
  form,
  onFinish
}: EventCategoryModalProps) {
  const displayIdFormItem = (eventCategory: EventCategory | null) => {
    if (eventCategory !== null) {
      return (
        <Form.Item
          hidden={true}
          initialValue={eventCategory?.id}
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
        labelCol={{ span: 7 }}
        onFinish={handleSubmit}
        validateMessages={formValidationMessages}
        wrapperCol={{ span: 16 }}
        {...{ form }}
      >
        {displayIdFormItem(eventCategory)}
        <Form.Item
          initialValue={eventCategory?.name}
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
