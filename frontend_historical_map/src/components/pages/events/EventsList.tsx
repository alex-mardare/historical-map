import { Button, Form, Input, Modal, Table } from 'antd';
import React, { useState } from 'react';

import EventCreateForm from './EventModalForm';
import { columnsConfig } from '../../config/tables/eventsListColumnsConfig';
import { HistoricalEvent } from '../../models/types/historicalEvent';
import { handleFormSubmission } from '../../utils/forms/formSubmission';
import { useEventPost } from '../../utils/hooks/eventsHooks';

import '../../../assets/styling/events/eventsList.css';


const { Search } = Input;

type HistoricalEvents = HistoricalEvent[];
type EventsListProps = {
  events: HistoricalEvents | null,
  onRefreshEvents: () => void
}

export default function EventsList(props:EventsListProps) {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [searchText, setSearchText] = useState('');

  const [form] = Form.useForm();
  const { submitData } = useEventPost();

  let filteredEvents = props.events?.filter((event) => {
    return Object.values(event).some((value) => {
      if (value === null || value === undefined) {
        return false;
      }
      if (value === event.approximateRealLocation) {
        return searchText === 'yes' ? value : !value;
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
      props.onRefreshEvents();
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
      <div id='eventsList'>
        <div className='topBar'>
          <Search
              allowClear
              enterButton
              onChange={(e) => handleSearch(e.target.value)} 
              placeholder='Search' 
              style={{ maxWidth: 400, paddingRight: '5px' }}
            />
          <Button onClick={showModal} type='primary'>Create Event</Button>
          <Modal
            confirmLoading={confirmLoading}
            okText='Create'
            onCancel={handleCancel}
            onOk={handleOk}
            open={open}
            title='Create Historical Event'
          >
            <EventCreateForm event={null} form={form} onFinish={onFinish} />
          </Modal>
        </div>
        <div className='tableContainer'>
          <Table 
                columns={columnsConfig}
                dataSource={filteredEvents}
                pagination={{ hideOnSinglePage:true }}
                rowKey={(event) => event.id}
            />
        </div>
      </div>
  )
}