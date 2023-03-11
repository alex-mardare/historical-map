import type { MenuProps } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';

import { FiguresMenuItem, MapMenuItem } from '../../elements/menuItem';

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

export const menuItems: MenuItem[] = [
  getItem('Historical Events', '1', <MapMenuItem/>, [
    getItem('Map', '1.1', <Link to="/" />),
    getItem('Create Event', '1.2'),
    getItem('Events List', '1.3', <Link to="/events-list" />)
  ]),
  getItem('Historical Figures', '2', <FiguresMenuItem />)
];