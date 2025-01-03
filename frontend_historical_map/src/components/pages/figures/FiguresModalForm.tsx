import { Form, Input } from 'antd'
import React, { useState } from 'react'

import { HistoricalFigure } from '../../models/types/historicalFigure'
import { HistoricalStatesDropdown } from '../../partials/dropdowns/HistoricalStatesDropdown'
import { PresentCountriesDropdown } from '../../partials/dropdowns/PresentCountriesDropdown'
import { useGetHistoricalStatesOptions } from '../../utils/hooks/historicalStatesHooks'
import { useGetPresentCountries } from '../../utils/hooks/presentCountriesHooks'
import { dateFieldValidator } from '../../utils/validators/dateValidator'
import { formValidationMessages } from '../../utils/validators/formValidator'

type FigurelModalProps = {
  figure: HistoricalFigure | null
  form: any
  onFinish?: (values: any) => void
}

export default function FiguresModalForm({
  figure,
  form,
  onFinish
}: FigurelModalProps) {
  const [birthHistoricalStateOption, setBirthHistoricalStateOption] = useState(
    figure?.birthHistoricalState?.id
  )
  const [birthPresentCountryOption, setBirthPresentCountryOption] = useState(
    figure?.birthPresentCountry?.id
  )
  const [deathHistoricalStateOption, setDeathHistoricalStateOption] = useState(
    figure?.deathHistoricalState?.id
  )
  const [deathPresentCountryOption, setDeathPresentCountryOption] = useState(
    figure?.deathPresentCountry?.id
  )

  const { historicalStates } = useGetHistoricalStatesOptions()
  const birthPresentCountries = useGetPresentCountries(
    birthHistoricalStateOption
  ).presentCountries
  const deathPresentCountries = useGetPresentCountries(
    deathHistoricalStateOption
  ).presentCountries

  const displayIdFormItem = (figure: HistoricalFigure | null) => {
    if (figure !== null) {
      return (
        <Form.Item hidden={true} initialValue={figure?.id} label="Id" name="id">
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
        {displayIdFormItem(figure)}
        <Form.Item
          initialValue={figure?.name}
          label="Name"
          name="name"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>

        <h4 style={{ paddingLeft: '75px' }}>Birth</h4>
        <Form.Item
          initialValue={figure?.birthDate}
          label="Date"
          name="birthDate"
          rules={[{ required: true }, { validator: dateFieldValidator }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          initialValue={birthHistoricalStateOption}
          label="Historical State"
          name="birthHistoricalStateId"
          rules={[{ required: true }]}
        >
          <HistoricalStatesDropdown
            form={form}
            presentCountryFormName="birthPresentCountryId"
            selectedValue={birthHistoricalStateOption}
            selectId={'birthHistoricalStateId'}
            setHistoricalStateOption={setBirthHistoricalStateOption}
            setPresentCountryOption={setBirthPresentCountryOption}
            {...{ historicalStates }}
          />
        </Form.Item>
        <Form.Item
          initialValue={birthPresentCountryOption}
          label="Present Country"
          name="birthPresentCountryId"
          rules={[{ required: true }]}
        >
          <PresentCountriesDropdown
            form={form}
            presentCountries={birthPresentCountries}
            selectedValue={birthPresentCountryOption}
            selectId={'birthPresentCountryId'}
            setPresentCountryOption={setBirthPresentCountryOption}
          />
        </Form.Item>

        <h4 style={{ paddingLeft: '75px' }}>Death</h4>
        <Form.Item
          initialValue={figure?.deathDate}
          label="Date"
          name="deathDate"
          rules={[{ validator: dateFieldValidator }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          initialValue={deathHistoricalStateOption}
          label="Historical State"
          name="deathHistoricalStateId"
        >
          <HistoricalStatesDropdown
            form={form}
            presentCountryFormName="deathPresentCountryId"
            selectedValue={deathHistoricalStateOption}
            selectId={'deathHistoricalStateId'}
            setHistoricalStateOption={setDeathHistoricalStateOption}
            setPresentCountryOption={setDeathPresentCountryOption}
            {...{ historicalStates }}
          />
        </Form.Item>
        <Form.Item
          initialValue={deathPresentCountryOption}
          label="Present Country"
          name="deathPresentCountryId"
        >
          <PresentCountriesDropdown
            form={form}
            presentCountries={deathPresentCountries}
            selectedValue={deathPresentCountryOption}
            selectId={'deathPresentCountryId'}
            setPresentCountryOption={setDeathPresentCountryOption}
          />
        </Form.Item>
      </Form>
    </div>
  )
}
