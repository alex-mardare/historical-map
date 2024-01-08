import { Button } from 'antd';
import { ColumnsType } from 'antd/es/table';
import React from 'react';

import { convertDateToString, dateColumnSort } from "./dateFunctions";
import { HISTORICAL_EVENTS_SECTION } from '../../models/constants/urls';
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
        render: (text, event) => <a href={`${HISTORICAL_EVENTS_SECTION + '/' + event.id}`} style={{color:'#1e90ff'}}>{text}</a>,
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
            const firstDate = convertDateToString(a.date);
            const secondDate = convertDateToString(b.date);

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
                {displayLatitudeDMS(event.latitude)}
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
                <Button href={`${HISTORICAL_EVENTS_SECTION + '/' + event.id}`}>
                    Details
                </Button>
            )
        }
    }
]