import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';

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
        <div style={{height: 350, width: '100%'}}>
            <DataGrid 
                columns={columnsConfig}
                rows={events}
            />
        </div>
    )
}