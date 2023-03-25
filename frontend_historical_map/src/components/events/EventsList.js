import { Table } from 'antd';
import React from 'react';

import { columnsConfig } from '../config/tables/eventsListColumnsConfig';


export default function EventsList(props) {
    return(
        <div className='EventsList' style={{height: '100vh'}}>
            <Table 
                columns={columnsConfig}
                dataSource={props.events}
                pagination={{ hideOnSinglePage:true }}
                rowKey={(event) => event.id}
                style={{ padding:'50px 10px 0px 10px' }}
            />
        </div>
    )
}