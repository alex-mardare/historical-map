import Icon from '@ant-design/icons';
import type { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon';
import React from 'react';
import { Link } from 'react-router-dom';

import { HISTORICAL_EVENTS_SECTION, HISTORICAL_FIGURES_SECTION } from '../models/constants/urls';


//#region EVENTS MENU
export const EventsMenuItem = (props: Partial<CustomIconComponentProps>) => (
    <Icon component={() => <img src={`${process.env.PUBLIC_URL}/world.png`} alt='Historical events map menu item'/>} {...props} />
)

export const EventsMenuSubItemMap = () => (
    <Link to="/" />
)

export const EventsMenuSubItemList = () => (
    <Link to={HISTORICAL_EVENTS_SECTION} />
)
//#endregion

//#region FIGURES MENU
export const FiguresMenuItem = (props: Partial<CustomIconComponentProps>) => (
    <Icon component={() => <img src={`${process.env.PUBLIC_URL}/figures.png`} alt='Historical figures menu item'/>} {...props} />
)

export const FiguresMenuSubItemList = () => (
    <Link to={HISTORICAL_FIGURES_SECTION} />
)
//#endregion