import { Input, Table } from 'antd';
import React, { useState } from 'react';

import { columnsConfig } from '../config/tables/eventsListColumnsConfig';
import { HistoricalEvent } from '../config/types/historicalEvent';


const { Search } = Input;

type HistoricalEvents = HistoricalEvent[];
type props = {
  events: HistoricalEvents
}

export default function EventsList(props:props) {
  const [searchText, setSearchText] = useState('');

  const handleSearch = (value:string) => {
    setSearchText(value);
  };

  const filteredEvents = props.events?.filter((event) => {
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

  return(
      <div className='EventsList' style={{height: '100vh'}}>
          <Search
            allowClear
            enterButton
            onChange={(e) => handleSearch(e.target.value)} 
            placeholder='Search' 
            style={{ maxWidth: 400, paddingTop: '10px' }}
          />
          <Table 
              columns={columnsConfig}
              dataSource={filteredEvents}
              pagination={{ hideOnSinglePage:true }}
              rowKey={(event) => event.id}
              style={{ padding:'10px 10px 0px 10px' }}
          />
      </div>
  )
}