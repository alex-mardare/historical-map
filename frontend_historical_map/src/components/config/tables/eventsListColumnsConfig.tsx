import { Button } from 'antd';
import { ColumnsType } from 'antd/es/table';
import React from 'react';

import { EVENTS_LIST_AREA } from '../../models/constants/urls';
import { displayBooleanValues } from '../../utils/display/displayBooleanValues';
import { displayLatitudeDMS, displayLongitudeDMS } from '../../utils/display/displayCoordinates';
import { HistoricalEvent } from '../../models/types/historicalEvent';


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
        dataIndex: 'date',
        key: 'date',
        sortDirections: ['ascend', 'descend', 'ascend'],
        sorter: (a, b) => {
            // For negative dates the order is reversed
            const firstDateArr = a.date[0] === '-' ? a.date.substring(1).split('-') : a.date.split('-');
            const secondDateArr = b.date[0] === '-' ? b.date.substring(1).split('-') : b.date.split('-');
            const firstDate = new Date(Number(firstDateArr[0]), Number(firstDateArr[1]) - 1, Number(firstDateArr[2]));
            const secondDate = new Date(Number(secondDateArr[0]), Number(secondDateArr[1]) - 1, Number(secondDateArr[2]));

            if (a.date[0] === '-') {
                if (b.date[0] !== '-') {
                    return -1;
                }
                else {
                    if (firstDate > secondDate) {
                        return -1;
                    }
                    else if (firstDate < secondDate) {
                        return 1;
                    }
                    else {
                        if (a.time === null) {
                            return b.time === null ? 0 : 1;
                        }
                        else {
                            if (b.time === null) {
                                return -1;
                            }
                            else {
                                if (a.time > b.time) {
                                    return -1;
                                }
                                else if (a.time < b.time) {
                                    return 1;
                                }
                                return 0;
                            }
                        }
                    }
                }
            }
            else {
                if (b.date[0] === '-') {
                    return 1;
                }
                else {
                    if (firstDate > secondDate) {
                        return 1;
                    }
                    else if (firstDate < secondDate) {
                        return -1;
                    }
                    else {
                        if (a.time === null) {
                            return b.time === null ? 0 : -1;
                        }
                        else {
                            if (b.time === null) {
                                return 1;
                            }
                            else {
                                if (a.time > b.time) {
                                    return 1;
                                }
                                else if (a.time < b.time) {
                                    return -1;
                                }
                                return 0;
                            }
                        }
                    }
                }
            }
        },
        title: 'Date'
    },
    {
        dataIndex: 'time',
        key: 'time', 
        title: 'Local Time'
    },
    {
        dataIndex: 'latitude',
        key: 'latitude', 
        render: (value) => displayLatitudeDMS(value),
        title: 'Latitude'
    },
    {
        dataIndex: 'longitude',
        key: 'longitude', 
        render: (value) => displayLongitudeDMS(value),
        title: 'Longitude'
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