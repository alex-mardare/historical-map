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
    figure?.birth_historical_state?.id
  )
  const [birthPresentCountryOption, setBirthPresentCountryOption] = useState(
    figure?.birth_present_country?.id
  )
  const [deathHistoricalStateOption, setDeathHistoricalStateOption] = useState(
    figure?.death_historical_state?.id
  )
  const [deathPresentCountryOption, setDeathPresentCountryOption] = useState(
    figure?.death_present_country?.id
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
          initialValue={figure?.birth_date}
          label="Date"
          name="birth_date"
          rules={[{ required: true }, { validator: dateFieldValidator }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          initialValue={birthHistoricalStateOption}
          label="Historical State"
          name="birth_historical_state"
          rules={[{ required: true }]}
        >
          <HistoricalStatesDropdown
            form={form}
            presentCountryFormName="birth_present_country"
            selectedValue={birthHistoricalStateOption}
            selectId={'birth_historical_state'}
            setHistoricalStateOption={setBirthHistoricalStateOption}
            setPresentCountryOption={setBirthPresentCountryOption}
            {...{ historicalStates }}
          />
        </Form.Item>
        <Form.Item
          initialValue={birthPresentCountryOption}
          label="Present Country"
          name="birth_present_country"
          rules={[{ required: true }]}
        >
          <PresentCountriesDropdown
            form={form}
            presentCountries={birthPresentCountries}
            selectedValue={birthPresentCountryOption}
            selectId={'birth_present_country'}
            setPresentCountryOption={setBirthPresentCountryOption}
          />
        </Form.Item>

        <h4 style={{ paddingLeft: '75px' }}>Death</h4>
        <Form.Item
          initialValue={figure?.death_date}
          label="Date"
          name="death_date"
          rules={[{ validator: dateFieldValidator }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          initialValue={deathHistoricalStateOption}
          label="Historical State"
          name="death_historical_state"
        >
          <HistoricalStatesDropdown
            form={form}
            presentCountryFormName="death_present_country"
            selectedValue={deathHistoricalStateOption}
            selectId={'death_historical_state'}
            setHistoricalStateOption={setDeathHistoricalStateOption}
            setPresentCountryOption={setDeathPresentCountryOption}
            {...{ historicalStates }}
          />
        </Form.Item>
        <Form.Item
          initialValue={deathPresentCountryOption}
          label="Present Country"
          name="death_present_country"
        >
          <PresentCountriesDropdown
            form={form}
            presentCountries={deathPresentCountries}
            selectedValue={deathPresentCountryOption}
            selectId={'death_present_country'}
            setPresentCountryOption={setDeathPresentCountryOption}
          />
        </Form.Item>
      </Form>
    </div>
  )
}
