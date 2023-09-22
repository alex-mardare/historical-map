import { Button } from 'antd';
import { ColumnsType } from 'antd/es/table';
import React from 'react';

import { dateColumnSort } from './dateColumnSort';
import { EVENTS_LIST_AREA } from '../../models/constants/urls';
import { HistoricalDateObject } from '../../models/types/historicalDateObject';
import { HistoricalEvent } from '../../models/types/historicalEvent';
import { displayBooleanValues } from '../../utils/display/displayBooleanValues';
import { displayLatitudeDMS, displayLongitudeDMS } from '../../utils/display/displayCoordinates';


export const columnsConfig : ColumnsType<HistoricalEvent> = [
    {
        dataIndex: 'name',
        defaultSortOrder: 'ascend',
        key: 'name',
        sortDirections: ['ascend', 'descend', 'ascend'],
        render: (text, event) => <a href={`${EVENTS_LIST_AREA + '/' + event.id}`} style={{color:'#1e90ff'}}>{text}</a>,
        sorter: (a, b) => {
            if (a.name > b.name) {
                return 1;
            }
            else if (a.name < b.name) {
                return -1;
            }
            return 0;
        },
        title: 'Name',
    },
    {
        dataIndex: 'dateTime',
        key: 'dateTime',
        sortDirections: ['ascend', 'descend', 'ascend'],
        render(text, event) {
          return (
            <div>
              {event.date}
              <br/>
              {event.time !== null ? event.time.toString() : ""}
            </div>
          )
        },
        sorter: (a, b) => {
            // For negative dates the order is reversed
            const firstDateArr = a.date[0] === '-' ? a.date.substring(1).split('-') : a.date.split('-');
            const secondDateArr = b.date[0] === '-' ? b.date.substring(1).split('-') : b.date.split('-');
            const firstDate = new Date(Number(firstDateArr[0]), Number(firstDateArr[1]) - 1, Number(firstDateArr[2]));
            const secondDate = new Date(Number(secondDateArr[0]), Number(secondDateArr[1]) - 1, Number(secondDateArr[2]));

            const firstDateObject: HistoricalDateObject = {
                date: a.date,
                time: null
            }
            const secondDateObject: HistoricalDateObject = {
                date: b.date,
                time: null
            }

            return dateColumnSort(firstDateObject, secondDateObject, firstDate, secondDate);
        },
        title: 'Date & Local Time'
    },
    {
        dataIndex: 'coordinates',
        key: 'coordinates', 
        render(text, event) {
            return (
              <div>
                {displayLongitudeDMS(event.latitude)}
                <br/>
                {displayLongitudeDMS(event.longitude)}
              </div>
            )
          },
        title: 'Coordinates'
    },
    {
        dataIndex: 'approximateRealLocation',
        key: 'approximateRealLocation', 
        render: (value) => displayBooleanValues(value),
        sortDirections: ['ascend', 'descend', 'ascend'],
        sorter: (a,b) => {
            if (a.approximateRealLocation && !b.approximateRealLocation) {
                return 1;
            }
            else if (!a.approximateRealLocation && b.approximateRealLocation) {
                return -1
            }
            return 0;
        },
        title:'Real Location'
    },
    {
        dataIndex: 'url',
        key: 'url',
        render: (text, event) => {
            return (
                <Button href={`${EVENTS_LIST_AREA + '/' + event.id}`}>
                    Details
                </Button>
            )
        }
    }
]