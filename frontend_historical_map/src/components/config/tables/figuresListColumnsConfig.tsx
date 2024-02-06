import { Button } from "antd";
import { ColumnsType } from "antd/es/table";
import React from 'react';

import { convertDateToString, dateColumnSort } from "./dateFunctions";
import { sortRowsByNameProperty } from "./sortFunctions";
import { HISTORICAL_FIGURES_SECTION } from '../../models/constants/urls';
import { HistoricalDateObject } from "../../models/types/historicalDateObject";
import { HistoricalFigure } from "../../models/types/historicalFigure";

export const columnsConfig: ColumnsType<HistoricalFigure> = [
    {
        dataIndex: 'name',
        defaultSortOrder: 'ascend',
        key: 'name',
        sortDirections: ['ascend', 'descend', 'ascend'],
        render: (text, figure) => <a href={`${HISTORICAL_FIGURES_SECTION + '/' + figure.id}`} style={{color:'#1e90ff'}}>{text}</a>,
        sorter: (a, b) => sortRowsByNameProperty(a, b),
        title: 'Name',
        width: 200
    },
    {
        dataIndex: 'birthDate',
        key: 'birthDate',
        sortDirections: ['ascend', 'descend', 'ascend'],
        sorter: (a, b) => {
            const firstDate = convertDateToString(a.birthDate);
            const secondDate = convertDateToString(b.birthDate);

            const firstDateObject: HistoricalDateObject = {
                date: a.birthDate,
                time: null
            }
            const secondDateObject: HistoricalDateObject = {
                date: b.birthDate,
                time: null
            }

            return dateColumnSort(firstDateObject, secondDateObject, firstDate, secondDate);
        },
        title: 'Birth Date',
        width: 110
    },
    {
        dataIndex: 'deathDate',
        key: 'deathDate',
        sortDirections: ['ascend', 'descend', 'ascend'],
        sorter: (a, b) => {
            const firstDate = convertDateToString(a.deathDate);
            const secondDate = convertDateToString(b.deathDate);

            const firstDateObject: HistoricalDateObject = {
                date: a.deathDate,
                time: null
            }
            const secondDateObject: HistoricalDateObject = {
                date: b.deathDate,
                time: null
            }

            return dateColumnSort(firstDateObject, secondDateObject, firstDate, secondDate);
        },
        title: 'Death Date',
        width: 110
    },
    {
        dataIndex: 'birthHistoricalState',
        defaultSortOrder: 'ascend',
        key: 'birthHistoricalState',
        render: (text, historicalFigure) => historicalFigure.birthHistoricalState.name,
        sortDirections: ['ascend', 'descend', 'ascend'],
        sorter: (a, b) => sortRowsByNameProperty(a.birthHistoricalState, b.birthHistoricalState),
        title: 'Birth Historical State',
        width: 275
    },
    {
        dataIndex: 'birthPresentCountry',
        defaultSortOrder: 'ascend',
        key: 'birthPresentCountry',
        render: (text, historicalFigure) => historicalFigure.birthPresentCountry.name,
        sortDirections: ['ascend', 'descend', 'ascend'],
        sorter: (a, b) => sortRowsByNameProperty(a.birthPresentCountry, b.birthPresentCountry),
        title: 'Birth Present Country',
        width: 175
    },
    {
        dataIndex: 'deathHistoricalState',
        defaultSortOrder: 'ascend',
        key: 'deathHistoricalState',
        render: (text, historicalFigure) => historicalFigure.deathHistoricalState?.name,
        sortDirections: ['ascend', 'descend', 'ascend'],
        sorter: (a, b) => sortRowsByNameProperty(a.deathHistoricalState, b.deathHistoricalState),
        title: 'Death Historical State',
        width: 275
    },
    {
        dataIndex: 'deathPresentCountry',
        defaultSortOrder: 'ascend',
        key: 'deathPresentCountry',
        render: (text, historicalFigure) => historicalFigure.deathPresentCountry?.name,
        sortDirections: ['ascend', 'descend', 'ascend'],
        sorter: (a, b) => sortRowsByNameProperty(a.deathPresentCountry, b.deathPresentCountry),
        title: 'Death Present Country',
        width: 175
    },
    {
        dataIndex: 'url',
        key: 'url',
        render: (text, figure) => {
            return (
                <Button href={`${HISTORICAL_FIGURES_SECTION + '/' + figure.id}`}>
                    Details
                </Button>
            )
        },
        width: 50
    }
]