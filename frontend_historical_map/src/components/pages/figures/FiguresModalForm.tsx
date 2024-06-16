import { Form, Input } from "antd"
import React, { useState } from "react"

import { HistoricalFigure } from "../../models/types/historicalFigure"
import { PresentCountriesDropdown } from "../../partials/dropdowns/presentCountriesDropdown"
import { useGetPresentCountries } from "../../utils/hooks/presentCountriesHooks"
import { useGetHistoricalStatesOptions } from "../../utils/hooks/historicalStatesHooks"
import { dateFieldValidator } from "../../utils/validators/dateValidator"
import { formValidationMessages } from '../../utils/validators/formValidator'
import { HistoricalStatesDropdown } from "../../partials/dropdowns/historicalStatesDropdown"


type FigurelModalProp = {
    figure: HistoricalFigure | null
    form: any
    onFinish?: (values: any) => void
}

export default function FiguresModalForm(props:FigurelModalProp) {
    const [birthHistoricalStateOption, setBirthHistoricalStateOption] = useState(props.figure?.birthHistoricalState?.id)
    const [birthPresentCountryOption, setBirthPresentCountryOption] = useState(props.figure?.birthPresentCountry?.id)
    const [deathHistoricalStateOption, setDeathHistoricalStateOption] = useState(props.figure?.deathHistoricalState?.id)
    const [deathPresentCountryOption, setDeathPresentCountryOption] = useState(props.figure?.deathPresentCountry?.id)

    const { historicalStates } = useGetHistoricalStatesOptions()
    const birthPresentCountries = useGetPresentCountries(birthHistoricalStateOption).presentCountries
    const deathPresentCountries = useGetPresentCountries(deathHistoricalStateOption).presentCountries

    const displayIdFormItem = (figure: HistoricalFigure | null) => {
        if (figure !== null) {
            return (
                <Form.Item hidden={true} initialValue={props.figure?.id} label='Id' name='id'>
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

    const onChangeBirthHistoricalState = (value: any, option: any) => {
        setBirthHistoricalStateOption(value)
        setBirthPresentCountryOption(undefined)

        props.form.resetFields(['birthPresentCountryId'])
    }

    const onChangeBirthPresentCountry = (value: any, option: any) => {
        setBirthPresentCountryOption(value)

        props.form.setFieldsValue({ birthPresentCountryId: value })
    }

    const onChangeDeathHistoricalState = (value: any, option: any) => {
        setDeathHistoricalStateOption(value)
        setDeathPresentCountryOption(undefined)

        props.form.resetFields(['deathPresentCountryId'])
    }

    const onChangeDeathPresentCountry = (value: any, option: any) => {
        setDeathPresentCountryOption(value)

        props.form.setFieldsValue({ deathPresentCountryId: value })
    }
    
    return (
        <div>
          <Form form={props.form} labelCol={{span: 6}} onFinish={handleSubmit} validateMessages={formValidationMessages} wrapperCol={{span: 16}}>
              {displayIdFormItem(props.figure)}
              <Form.Item initialValue={props.figure?.name} label='Name' name='name' rules={[{ required: true }]}>
                  <Input />
              </Form.Item>

              <h4 style={{paddingLeft:'75px'}}>Birth</h4>
              <Form.Item initialValue={props.figure?.birthDate} label='Date' name='birthDate' rules={[{ required: true }, { validator: dateFieldValidator}]}>
                  <Input />
              </Form.Item>
              <Form.Item initialValue={birthHistoricalStateOption} label='Historical State' name='birthHistoricalStateId' rules={[{ required: true }]}>
                <HistoricalStatesDropdown {...{ historicalStates }} 
                    onChangeHistoricalState={onChangeBirthHistoricalState}
                    selectedValue={birthHistoricalStateOption} 
                    selectId={'birthHistoricalStateId'}
                />
              </Form.Item>
              <Form.Item initialValue={birthPresentCountryOption} label='Present Country' name='birthPresentCountryId' rules={[{ required: true }]}>
                <PresentCountriesDropdown 
                    onChangePresentCountry={onChangeBirthPresentCountry}
                    presentCountries={birthPresentCountries} 
                    selectedValue={birthPresentCountryOption} 
                    selectId={'birthPresentCountryId'}
                />
              </Form.Item>

              <h4 style={{paddingLeft:'75px'}}>Death</h4>
              <Form.Item initialValue={props.figure?.deathDate} label='Date' name='deathDate' rules={[{ validator: dateFieldValidator}]}>
                  <Input />
              </Form.Item>
              <Form.Item initialValue={deathHistoricalStateOption} label='Historical State' name='deathHistoricalStateId'>
                <HistoricalStatesDropdown {...{ historicalStates }} 
                        onChangeHistoricalState={onChangeDeathHistoricalState}
                        selectedValue={deathHistoricalStateOption} 
                        selectId={'deathHistoricalStateId'}
                    />
              </Form.Item>
              <Form.Item initialValue={deathPresentCountryOption} label='Present Country' name='deathPresentCountryId'>
                <PresentCountriesDropdown 
                        onChangePresentCountry={onChangeDeathPresentCountry}
                        presentCountries={deathPresentCountries} 
                        selectedValue={deathPresentCountryOption} 
                        selectId={'deathPresentCountryId'}
                />
              </Form.Item>
          </Form>
        </div>  
      )
}