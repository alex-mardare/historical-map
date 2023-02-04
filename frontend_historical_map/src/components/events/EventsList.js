import { Table } from 'antd';
import axios from 'axios';
import React, { useState, useEffect } from 'react';

import { columnsConfig } from '../config/tables/EventsListColumnsConfig';
import { DEV_API_EVENTS_APP_BASE_URL, EVENTS_ENDPOINT } from '../config/constants/endpoints';


export default function EventsList() {
    const [events, setEvents] = useState([])

    useEffect(() => {
        axios.get(DEV_API_EVENTS_APP_BASE_URL + EVENTS_ENDPOINT)
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