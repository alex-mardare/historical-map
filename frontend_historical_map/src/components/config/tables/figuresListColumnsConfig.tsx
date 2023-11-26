import { Button } from "antd";
import { ColumnsType } from "antd/es/table";
import React from 'react';

import { convertDateToString, dateColumnSort } from "./dateFunctions";
import { HISTORICAL_FIGURES_ENDPOINT } from "../../models/constants/urls";
import { HistoricalDateObject } from "../../models/types/historicalDateObject";
import { HistoricalFigure } from "../../models/types/historicalFigure";

export const columnsConfig: ColumnsType<HistoricalFigure> = [
    {
        dataIndex: 'name',
        defaultSortOrder: 'ascend',
        key: 'name',
        sortDirections: ['ascend', 'descend', 'ascend'],
        render: (text, figure) => <a href={`${HISTORICAL_FIGURES_ENDPOINT + figure.id}`} style={{color:'#1e90ff'}}>{text}</a>,
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
        title: 'Birth Date'
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
    },
    {
        dataIndex: 'url',
        key: 'url',
        render: (text, figure) => {
            return (
                <Button href={`${HISTORICAL_FIGURES_ENDPOINT + figure.id}`}>
                    Details
                </Button>
            )
        }
    }
]