import { Button, Input, Table } from 'antd';
import React, { useState } from 'react';

import { columnsConfig } from '../../config/tables/eventsListColumnsConfig';
import { HistoricalEvent } from '../../models/types/historicalEvent';

import '../../../assets/styling/events/eventsList.css';


const { Search } = Input;

type HistoricalEvents = HistoricalEvent[];
type EventsListProps = {
  events: HistoricalEvents
}

export default function EventsList(props:EventsListProps) {
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
      <div id='eventsList'>
        <div className='topBar'>
          <Search
              allowClear
              enterButton
              onChange={(e) => handleSearch(e.target.value)} 
              placeholder='Search' 
              style={{ maxWidth: 400, paddingRight: '5px' }}
            />
          <Button type='primary'>Create Event</Button>
        </div>
        <div className='tableContainer'>
          <Table 
                columns={columnsConfig}
                dataSource={filteredEvents}
                pagination={{ hideOnSinglePage:true }}
                rowKey={(event) => event.id}
            />
        </div>
      </div>
  )
}