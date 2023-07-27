import Icon from '@ant-design/icons';
import type { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon';
import React from 'react';
import { Link } from 'react-router-dom';

import { EVENTS_LIST_URL } from '../models/constants/urls';


export const FiguresMenuItem = (props: Partial<CustomIconComponentProps>) => (
    <Icon component={() => <img src={`${process.env.PUBLIC_URL}/figures.png`} alt='Historical figures menu item'/>} {...props} />
)

export const MapMenuItem = (props: Partial<CustomIconComponentProps>) => (
    <Icon component={() => <img src={`${process.env.PUBLIC_URL}/world.png`} alt='Historical events map menu item'/>} {...props} />
)

export const MapMenuListSubItem = () => (
    <Link to={EVENTS_LIST_URL} />
)

export const MapMenuMapSubItem = () => (
    <Link to="/" />
)