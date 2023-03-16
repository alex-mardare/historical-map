import { Table } from 'antd';
import React from 'react';

import { columnsConfig } from '../config/tables/eventsListColumnsConfig';


export default function EventsList(props) {
    return(
        <div className='EventsList'>
            <Table 
                columns={columnsConfig}
                dataSource={props.events}
                rowKey={(event) => event.id}
            />
        </div>
    )
}