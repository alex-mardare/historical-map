import Icon from '@ant-design/icons';
import type { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon';
import React from 'react';
import { Link } from 'react-router-dom';

import { HISTORICAL_EVENTS_SECTION, HISTORICAL_FIGURES_SECTION, HISTORICAL_STATES_SECTION } from '../models/constants/urls';


//#region COUNTRIES MENU
const CountriesMenuItem = (props: Partial<CustomIconComponentProps>) => (
    <Icon component={() => <img src={`${process.env.PUBLIC_URL}/countries.png`} alt='Countries menu item'/>} {...props} />
)
const HistoricalStatesSubItem = () => (
    <Link to={HISTORICAL_STATES_SECTION} />
)
//#endregion

//#region EVENTS MENU
const EventsMenuItem = (props: Partial<CustomIconComponentProps>) => (
    <Icon component={() => <img src={`${process.env.PUBLIC_URL}/world.png`} alt='Historical events map menu item'/>} {...props} />
)

const EventsMenuSubItemMap = () => (
    <Link to="/" />
)

const EventsMenuSubItemList = () => (
    <Link to={HISTORICAL_EVENTS_SECTION} />
)
//#endregion

//#region FIGURES MENU
const FiguresMenuItem = (props: Partial<CustomIconComponentProps>) => (
    <Icon component={() => <img src={`${process.env.PUBLIC_URL}/figures.png`} alt='Historical figures menu item'/>} {...props} />
)

const FiguresMenuSubItemList = () => (
    <Link to={HISTORICAL_FIGURES_SECTION} />
)
//#endregion

export {
    CountriesMenuItem, HistoricalStatesSubItem,
    EventsMenuItem, EventsMenuSubItemMap, EventsMenuSubItemList,
    FiguresMenuItem, FiguresMenuSubItemList
}