import { Table } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

import { DEV_API_EVENTS_APP_BASE_URL } from '../config/constants/endpoints';
import { columnsConfig } from '../config/tables/EventsListColumnsConfig';


export default function EventsList() {
    const [events, setEvents] = useState([])

    useEffect(() => {
        axios.get(DEV_API_EVENTS_APP_BASE_URL)
            .then(res => {
                setEvents(res.data);
            })
            .catch(error => {
                console.log(error)
            })
    }, []);

    return(
        <Table 
            columns={columnsConfig}
            dataSource={events}
            rowKey={(event) => event.id}
        />
    )
}