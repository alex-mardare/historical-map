import { Button, Form, Modal } from 'antd';
import axios from 'axios';
import { useEffect, useState } from 'react';

import { DEV_API_EVENTS_APP_BASE_URL } from '../config/constants/endpoints';
import EventCreateForm from '../events/EventCreateForm';
import EventsList from '../events/EventsList';

function Home() {
  const [form] = Form.useForm();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [events, setEvents] = useState([])

  useEffect(() => {
    axios.get(DEV_API_EVENTS_APP_BASE_URL)
        .then(res => { setEvents(res.data); })
        .catch(error => { console.log(error); })
  }, []);

  const handleCancel = () => {
    setIsModalOpen(false);
  }

  const handleOk = () => {
    form.submit();
    setIsModalOpen(false);
  }

  const showModal = () => {
    setIsModalOpen(true);
  }

  const submitForm = (values) => {
    axios.post(DEV_API_EVENTS_APP_BASE_URL, values)
      .then(() => {
        axios.get(DEV_API_EVENTS_APP_BASE_URL)
          .then(res => { setEvents(res.data); })
          .catch(error => { console.log(error); })
      })
      .catch(error => console.log(error));
  }

  return (
    <div className="App">
      <EventsList events={events}/>
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
