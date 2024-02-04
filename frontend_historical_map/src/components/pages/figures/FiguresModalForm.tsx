import { Form, Input, Select } from "antd";
import React from "react";

import { HistoricalFigure } from "../../models/types/historicalFigure";
import { useFetchHistoricalStates, useFetchPresentCountries } from "../../utils/hooks/countriesHooks";
import { dateFieldValidator } from "../../utils/validators/dateValidator";
import { formValidationMessages } from '../../utils/validators/formValidator';


type FigureModalFormProps = {
    figure: HistoricalFigure | null;
    form: any;
    onFinish?: (values: any) => void;
}

export default function FiguresModalForm(props:FigureModalFormProps) {
    const { historicalStates } = useFetchHistoricalStates();
    const { presentCountries } = useFetchPresentCountries();

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
            props.onFinish(values);
        }
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
              <Form.Item initialValue={props.figure?.birthHistoricalState.id} label='Historical State' name='birthHistoricalStateId' rules={[{ required: true }]}>
                  <Select
                      dropdownRender={(menu) => (
                          <div style={{ maxHeight: "300px" }}>
                              {menu}
                          </div>
                      )}
                      placeholder='Please select a historical state.'
                      showSearch>
                          {historicalStates.map(option => (
                              <Select.Option key={option.value} value={option.value}>
                                  <div style={{ whiteSpace: "pre-wrap" }}>{option.label}</div>
                              </Select.Option>
                          ))}
                  </Select>
              </Form.Item>
              <Form.Item initialValue={props.figure?.birthPresentCountry.id} label='Present Country' name='birthPresentCountryId' rules={[{ required: true }]}>
                  <Select 
                      fieldNames={{ label: 'name', value:'id'}}
                      filterOption={(input, option) => (option?.name ?? '').toLowerCase().includes(input.toLowerCase())} 
                      options={presentCountries} 
                      placeholder='Please select a country.'
                      showSearch
                  />
              </Form.Item>

              <h4 style={{paddingLeft:'75px'}}>Death</h4>
              <Form.Item initialValue={props.figure?.deathDate} label='Death Date' name='deathDate' rules={[{ validator: dateFieldValidator}]}>
                  <Input />
              </Form.Item>
              <Form.Item initialValue={props.figure?.deathHistoricalState?.id} label='Historical State' name='deathHistoricalStateId'>
                  <Select
                      dropdownRender={(menu) => (
                          <div style={{ maxHeight: "300px" }}>
                              {menu}
                          </div>
                      )}
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
                  <Select 
                      fieldNames={{ label: 'name', value:'id'}}
                      filterOption={(input, option) => (option?.name ?? '').toLowerCase().includes(input.toLowerCase())} 
                      options={presentCountries} 
                      placeholder='Please select a country.'
                      showSearch
                  />
              </Form.Item>
          </Form>
        </div>  
      );
}