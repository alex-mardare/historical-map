import { Form, Input, Select } from "antd"
import React, { useState } from "react"

import { HistoricalFigure } from "../../models/types/historicalFigure"
import { PresentCountriesDropdown } from "../../partials/dropdowns/presentCountriesDropdown"
import { useFetchHistoricalStates, useFetchPresentCountries } from "../../utils/hooks/countriesHooks"
import { dateFieldValidator } from "../../utils/validators/dateValidator"
import { formValidationMessages } from '../../utils/validators/formValidator'


type FigureModalFormProps = {
    figure: HistoricalFigure | null
    form: any
    onFinish?: (values: any) => void
}

export default function FiguresModalForm(props:FigureModalFormProps) {
    const [birthHistoricalStateOption, setBirthHistoricalStateOption] = useState(props.figure?.birthHistoricalState?.id)
    const [birthPresentCountryOption, setBirthPresentCountryOption] = useState(props.figure?.birthPresentCountry?.id)
    const [deathHistoricalStateOption, setDeathHistoricalStateOption] = useState(props.figure?.deathHistoricalState?.id)
    const [deathPresentCountryOption, setDeathPresentCountryOption] = useState(props.figure?.deathPresentCountry?.id)

    const { historicalStates } = useFetchHistoricalStates()
    const birthPresentCountries = useFetchPresentCountries(birthHistoricalStateOption).presentCountries
    const deathPresentCountries = useFetchPresentCountries(deathHistoricalStateOption).presentCountries

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
                  <Select
                      dropdownRender={(menu) => (
                          <div style={{ maxHeight: "300px" }}>
                              {menu}
                          </div>
                      )}
                      onChange={onChangeBirthHistoricalState}
                      placeholder='Please select a historical state.'
                      showSearch>
                          {historicalStates.map(option => (
                              <Select.Option key={option.value} value={option.value}>
                                  <div style={{ whiteSpace: "pre-wrap" }}>{option.label}</div>
                              </Select.Option>
                          ))}
                  </Select>
              </Form.Item>
              <Form.Item initialValue={props.figure?.birthPresentCountry?.id} label='Present Country' name='birthPresentCountryId' rules={[{ required: true }]}>
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
                  <Select
                      dropdownRender={(menu) => (
                          <div style={{ maxHeight: "300px" }}>
                              {menu}
                          </div>
                      )}
                      onChange={onChangeDeathHistoricalState}
                      placeholder='Please select a historical state.'
                      showSearch>
                          {historicalStates.map(option => (
                              <Select.Option key={option.value} value={option.value}>
                                  <div style={{ whiteSpace: "pre-wrap" }}>{option.label}</div>
                              </Select.Option>
                          ))}
                  </Select>
              </Form.Item>
              <Form.Item initialValue={props.figure?.deathPresentCountry?.id} label='Present Country' name='deathPresentCountryId'>
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