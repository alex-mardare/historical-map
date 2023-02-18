import { Table } from 'antd';
import React from 'react';

import { columnsConfig } from '../config/tables/EventsListColumnsConfig';


export default function EventsList(props) {
    return(
        <Table 
            columns={columnsConfig}
            dataSource={props.events}
            rowKey={(event) => event.id}
        />
    )
}