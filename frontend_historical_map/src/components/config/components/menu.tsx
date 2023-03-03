import type { MenuProps } from 'antd';
import React from 'react';

import { FiguresIcon, MapIcon } from '../../elements/menuIcons';

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
  getItem('Historical Events', '1', <MapIcon />),
  getItem('Historical Figures', '2', <FiguresIcon />)
];