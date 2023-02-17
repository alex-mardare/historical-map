import { Button, Form, Modal } from 'antd';
import axios from 'axios';
import { useState } from 'react';

import { DEV_API_EVENTS_APP_BASE_URL } from '../config/constants/endpoints';
import EventCreateForm from '../events/EventCreateForm';
import EventsList from '../events/EventsList';

function Home() {
  const [form] = Form.useForm();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  }

  const handleCancel = () => {
    setIsModalOpen(false);
  }

  const handleOk = () => {
    form.submit();
    setIsModalOpen(false);
  }

  const submitForm = (values) => {
    axios.post(DEV_API_EVENTS_APP_BASE_URL, values)
      .catch(error => console.log(error));
  }

  return (
    <div className="App">
      <EventsList/>
      <Button onClick={showModal} type='primary'> Create Event </Button>
      <Modal
        okText='Submit'
        onCancel={handleCancel}
        onOk={handleOk}
        open={isModalOpen}
        title='Create Historical Event'>
          <EventCreateForm form={form} onFinish={submitForm} />
      </Modal>
    </div>
  );
}

export default Home;
