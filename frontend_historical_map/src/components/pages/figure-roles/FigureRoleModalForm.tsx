import { Form, Input } from 'antd'
import React from 'react'

import TextArea from 'antd/es/input/TextArea'
import { HistoricalFigureRole } from '../../models/types/historicalFigureRole'
import { formValidationMessages } from '../../utils/validators/formValidator'

type FigureRoleModalProps = {
  figureRole: HistoricalFigureRole | null
  form: any
  onFinish?: (values: any) => void
}

export default function FigureRoleModalForm({
  figureRole,
  form,
  onFinish
}: FigureRoleModalProps) {
  const displayIdFormItem = (figureRole: HistoricalFigureRole | null) => {
    if (figureRole !== null) {
      return (
        <Form.Item
          hidden={true}
          initialValue={figureRole?.id}
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
        {displayIdFormItem(figureRole)}
        <Form.Item
          initialValue={figureRole?.name}
          label="Name"
          name="name"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          initialValue={figureRole?.description}
          label="Description"
          name="description"
        >
          <TextArea rows={4} />
        </Form.Item>
      </Form>
    </div>
  )
}
