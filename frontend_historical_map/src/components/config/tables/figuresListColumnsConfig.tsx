import { ColumnsType } from "antd/es/table";
import React from 'react';

import { dateColumnSort } from "./dateColumnSort";
import { HistoricalFigure } from "../../models/types/historicalFigure";
import { FIGURES_LIST_AREA } from "../../models/constants/urls";
import { HistoricalDateObject } from "../../models/types/historicalDateObject";

export const columnsConfig: ColumnsType<HistoricalFigure> = [
    {
        dataIndex: 'name',
        defaultSortOrder: 'ascend',
        key: 'name',
        sortDirections: ['ascend', 'descend', 'ascend'],
        render: (text, figure) => <a href={`${FIGURES_LIST_AREA + '/' + figure.id}`} style={{color:'#1e90ff'}}>{text}</a>,
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
        dataIndex: 'birthDate',
        key: 'birthDate',
        sortDirections: ['ascend', 'descend', 'ascend'],
        sorter: (a, b) => {
            // For negative dates the order is reversed
            const firstDateArr = a.birthDate[0] === '-' ? a.birthDate.substring(1).split('-') : a.birthDate.split('-');
            const secondDateArr = b.birthDate[0] === '-' ? b.birthDate.substring(1).split('-') : b.birthDate.split('-');
            const firstDate = new Date(Number(firstDateArr[0]), Number(firstDateArr[1]) - 1, Number(firstDateArr[2]));
            const secondDate = new Date(Number(secondDateArr[0]), Number(secondDateArr[1]) - 1, Number(secondDateArr[2]));

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
        title: 'Birth Date'
    },
    {
        dataIndex: 'deathDate',
        key: 'deathDate',
        sortDirections: ['ascend', 'descend', 'ascend'],
        sorter: (a, b) => {
            // For negative dates the order is reversed
            const firstDateArr = a.deathDate[0] === '-' ? a.deathDate.substring(1).split('-') : a.deathDate.split('-');
            const secondDateArr = b.deathDate[0] === '-' ? b.deathDate.substring(1).split('-') : b.deathDate.split('-');
            const firstDate = new Date(Number(firstDateArr[0]), Number(firstDateArr[1]) - 1, Number(firstDateArr[2]));
            const secondDate = new Date(Number(secondDateArr[0]), Number(secondDateArr[1]) - 1, Number(secondDateArr[2]));

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
        title: 'Death Date'
    },
    {
        dataIndex: 'birthHistoricalState',
        defaultSortOrder: 'ascend',
        key: 'birthHistoricalState',
        render: (text, historicalFigure) => historicalFigure.birthHistoricalState.name,
        sortDirections: ['ascend', 'descend', 'ascend'],
        sorter: (a, b) => {
            if (a.birthHistoricalState.name > b.birthHistoricalState.name) {
                return 1;
            }
            else if (a.birthHistoricalState.name < b.birthHistoricalState.name) {
                return -1;
            }
            return 0;
        },
        title: 'Birth Historical State',
    },
    {
        dataIndex: 'birthPresentCountry',
        defaultSortOrder: 'ascend',
        key: 'birthPresentCountry',
        render: (text, historicalFigure) => historicalFigure.birthPresentCountry.name,
        sortDirections: ['ascend', 'descend', 'ascend'],
        sorter: (a, b) => {
            if (a.birthPresentCountry.name > b.birthPresentCountry.name) {
                return 1;
            }
            else if (a.birthPresentCountry.name < b.birthPresentCountry.name) {
                return -1;
            }
            return 0;
        },
        title: 'Birth Present Country',
    }
]