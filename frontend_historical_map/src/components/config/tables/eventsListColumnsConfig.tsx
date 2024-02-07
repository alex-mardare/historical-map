import { Button } from 'antd';
import { ColumnsType } from 'antd/es/table';
import React from 'react';

import { convertDateToString, dateColumnSort } from "./dateFunctions";
import { sortRowsByNameProperty } from './sortFunctions';
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
        sorter: (a, b) => sortRowsByNameProperty(a, b),
        title: 'Name',
        width: 750
    },
    {
        dataIndex: 'dateTime',
        key: 'dateTime',
        sortDirections: ['ascend', 'descend', 'ascend'],
        render(_, event) {
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
        title: 'Date & Local Time',
        width: 125
    },
    {
        dataIndex: 'historicalState',
        defaultSortOrder: 'ascend',
        key: 'historicalState',
        render: (_, event) => event.historicalState.name,
        sortDirections: ['ascend', 'descend', 'ascend'],
        sorter: (a, b) => sortRowsByNameProperty(a.historicalState, b.historicalState),
        title: 'Historical State',
        width: 275
    },
    {
        dataIndex: 'presentCountry',
        defaultSortOrder: 'ascend',
        key: 'presentCountry',
        render: (_, event) => event.presentCountry.name,
        sortDirections: ['ascend', 'descend', 'ascend'],
        sorter: (a, b) => sortRowsByNameProperty(a.presentCountry, b.presentCountry),
        title: 'Birth Present Country',
        width: 175
    },
    {
        dataIndex: 'coordinates',
        key: 'coordinates', 
        render(_, event) {
            return event.approximateRealLocation && (
                <div>
                    {displayLatitudeDMS(event.latitude)}
                    <br/>
                    {displayLongitudeDMS(event.longitude)}
                </div>
            )
          },
        title: 'Coordinates',
        width: 75
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
        title:'Real Location',
        width: 75
    },
    {
        dataIndex: 'url',
        key: 'url',
        render: (_, event) => {
            return (
                <Button href={`${HISTORICAL_EVENTS_SECTION + '/' + event.id}`}>
                    Details
                </Button>
            )
        },
        width: 50
    }
]