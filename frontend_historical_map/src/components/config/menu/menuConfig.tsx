import type { MenuProps } from 'antd';
import React from 'react';

import { EventsMenuItem, EventsMenuSubItemList, EventsMenuSubItemMap, FiguresMenuItem, FiguresMenuSubItemList } from '../../partials/menuItems';

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
  getItem('Historical Events', '1', <EventsMenuItem/>, [
    getItem('Map', '1.1', <EventsMenuSubItemMap />),
    getItem('Events List', '1.2', <EventsMenuSubItemList />)
  ]),
  getItem('Historical Figures', '2', <FiguresMenuItem />, [
    getItem('Figures List', '2.1', <FiguresMenuSubItemList />),
  ])
];

export const rootMenuKeys = ['1', '2']