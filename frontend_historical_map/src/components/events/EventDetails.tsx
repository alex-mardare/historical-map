import { Card } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import React from 'react';
import { useParams } from 'react-router';

import { useFetchEvent } from '../hooks/useFetchEvents';


const { Meta } = Card;


export default function EventDetails(){
  const { eventId } = useParams();
  
  const event = useFetchEvent(eventId);

  return(
    <>
      <Card actions={[<EditOutlined key="edit"/>]} loading={event == null} style={{width: 300}}>
        <Meta description={event?.description} title={event?.name}/>
      </Card>
    </>
  )
}