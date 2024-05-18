import { Button, Tag } from "antd";
import { ColumnsType } from "antd/es/table";
import React from 'react';

import { convertDateToString, dateColumnSort } from "./dateFunctions";
import { sortRowsByNameProperty } from "./sortFunctions";
import { HISTORICAL_STATES_SECTION, PRESENT_COUNTRIES_SECTION } from '../../models/constants/urls';
import { HistoricalDateObject } from '../../models/types/historicalDateObject';
import { HistoricalState } from "../../models/types/historicalState";

export const columnsConfig: ColumnsType<HistoricalState> = [
    {
        dataIndex: 'name',
        defaultSortOrder: 'ascend',
        key: 'name',
        sortDirections: ['ascend', 'descend', 'ascend'],
        render: (text, historicalState) => <a href={`${HISTORICAL_STATES_SECTION + '/' + historicalState.id}`} style={{color:'#1e90ff'}}>{text}</a>,
        sorter: (a, b) => sortRowsByNameProperty(a, b),
        title: 'Name',
        width: 200
    },
    {
        dataIndex: 'dateFrom',
        key: 'dateFrom',
        sortDirections: ['ascend', 'descend', 'ascend'],
        render(_, historicalState) {
          return (
            <div>
              {historicalState.dateFrom}
            </div>
          )
        },
        sorter: (a, b) => {
            const firstDate = convertDateToString(a.dateFrom);
            const secondDate = convertDateToString(b.dateFrom);

            const firstDateObject: HistoricalDateObject = {
                date: a.dateFrom,
                time: null
            }
            const secondDateObject: HistoricalDateObject = {
                date: b.dateFrom,
                time: null
            }

            return dateColumnSort(firstDateObject, secondDateObject, firstDate, secondDate);
        },
        title: 'Foundation Date',
        width: 70
    },
    {
        dataIndex: 'dateTo',
        key: 'dateTo',
        sortDirections: ['ascend', 'descend', 'ascend'],
        render(_, historicalState) {
          return (
            <div>
              {historicalState.dateTo}
            </div>
          )
        },
        sorter: (a, b) => {
            const firstDate = convertDateToString(a.dateTo);
            const secondDate = convertDateToString(b.dateTo);

            const firstDateObject: HistoricalDateObject = {
                date: a.dateFrom,
                time: null
            }
            const secondDateObject: HistoricalDateObject = {
                date: b.dateFrom,
                time: null
            }

            return dateColumnSort(firstDateObject, secondDateObject, firstDate, secondDate);
        },
        title: 'Dissolution Date',
        width: 70
    },
    {
        dataIndex: 'presentCountries',
        key: 'presentCountries',
        render: (text, historicalState) => {
            return (
                <div>
                    {historicalState.presentCountries.map(presentCountry => 
                        <Tag color="blue">
                            <a href={`${PRESENT_COUNTRIES_SECTION + '/' + presentCountry.id}`}>{presentCountry.name}</a>
                        </Tag>)
                    }
                </div>
            )
        },
        title: 'Present Countries',
        width: 200
    },
    {
        dataIndex: 'url',
        key: 'url',
        render: (_, historicalState) => {
            return (
                <Button href={`${HISTORICAL_STATES_SECTION + '/' + historicalState.id}`}>
                    Details
                </Button>
            )
        },
        width: 50
    }
]