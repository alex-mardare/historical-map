import { Button, Form, Input, Modal, Table } from 'antd'
import React, { useState } from 'react'

import HistoricalStateModalForm from './HistoricalStateModalForm'
import { columnsConfig } from '../../config/tables/historicalStatesListColumnsConfig'
import { handleFormSubmission } from '../../utils/forms/formSubmission'
import { useGetHistoricalStates, usePostHistoricalState } from '../../utils/hooks/historicalStatesHooks'

import '../../../assets/styling/tablePage.css'


const { Search } = Input;

export default function HistoricalStatesList() {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [searchText, setSearchText] = useState('');

  const { historicalStates, refreshFunction } = useGetHistoricalStates();
  const [form] = Form.useForm();
  const { submitData } = usePostHistoricalState();

  let filteredHistoricalEvents = historicalStates?.filter((historicalState) => {
    return Object.values(historicalState).some((value) => {
      if (value === null || value === undefined) {
        return false;
      }
      return value.toString().toLowerCase().includes(searchText.toLowerCase());
    })
  });

//#region MODAL
  const handleCancel = () => {
    setOpen(false);
  }

  const handleOk = () => {
    handleFormSubmission(form, onFinish, setConfirmLoading);
  }

  const onFinish = async (values: any) => {
    try {
        await submitData(values, setConfirmLoading, setOpen);
        refreshFunction();
    }
    catch(error) {
        console.log(error);
    }
  }

  const showModal = () => {
    setOpen(true);
  }
//#endregion

//#region SEARCH BAR
  const handleSearch = (value:string) => {
    setSearchText(value);
  };
//#endregion

  return(
      <div className='mainDivTablePage'>
        <div className='topBarTablePage'>
          <Search
              allowClear
              enterButton
              onChange={(e) => handleSearch(e.target.value)} 
              placeholder='Search' 
              style={{ maxWidth: 400, paddingRight: '5px' }}
            />
          <Button onClick={showModal} type='primary'>Create</Button>
            <Modal
              confirmLoading={confirmLoading}
              okText='Create'
              onCancel={handleCancel}
              onOk={handleOk}
              open={open}
              title='Create Historical State'
            >
              <HistoricalStateModalForm historicalState={null} form={form} onFinish={onFinish} />
            </Modal>
        </div>
        <div className='tableDiv'>
          <Table 
                columns={columnsConfig}
                dataSource={filteredHistoricalEvents}
                pagination={{ hideOnSinglePage:true }}
                rowKey={(historicalState) => historicalState.id}
                size='middle'
            />
        </div>
      </div>
  )
}