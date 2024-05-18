import { Input, Table } from 'antd';
import React, { useState } from 'react';

import { columnsConfig } from '../../config/tables/historicalStatesListColumnsConfig';
import { useGetHistoricalStates } from '../../utils/hooks/countriesHooks';

import '../../../assets/styling/tablePage.css';


const { Search } = Input;

export default function HistoricalStatesList() {
  const [searchText, setSearchText] = useState('');

  const { historicalStates } = useGetHistoricalStates();

  let filteredHistoricalEvents = historicalStates?.filter((historicalState) => {
    return Object.values(historicalState).some((value) => {
      if (value === null || value === undefined) {
        return false;
      }
      return value.toString().toLowerCase().includes(searchText.toLowerCase());
    })
  });

//#region SEARCH BAR
  const handleSearch = (value:string) => {
    setSearchText(value);
  };
//#endregion

  return(
      <div className='mainDivTablePage'>
        <div className='topBarTablePage'>
          <Search
              allowClear
              enterButton
              onChange={(e) => handleSearch(e.target.value)} 
              placeholder='Search' 
              style={{ maxWidth: 400, paddingRight: '5px' }}
            />
        </div>
        <div className='tableDiv'>
          <Table 
                columns={columnsConfig}
                dataSource={filteredHistoricalEvents}
                pagination={{ hideOnSinglePage:true }}
                rowKey={(historicalState) => historicalState.id}
                size='middle'
            />
        </div>
      </div>
  )
}