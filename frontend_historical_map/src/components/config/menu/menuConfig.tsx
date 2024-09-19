import type { MenuProps } from 'antd'
import React from 'react'

import {
  CountriesMenuItem,
  EventCategoriesSubItem,
  EventPropertiesMenuItem,
  EventsMenuItem,
  EventsMenuItemNoAccount,
  EventsMenuSubItemList,
  EventsMenuSubItemMap,
  FigurePropertiesMenuItem,
  FigureRolesSubItem,
  FiguresMenuItem,
  FiguresMenuSubItemList,
  HistoricalStatesSubItem,
  PresentCountriesSubItem
} from '../../partials/menuItems'

type MenuItem = Required<MenuProps>['items'][number]

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label
  } as MenuItem
}

const menuItemsLoggedIn: MenuItem[] = [
  getItem('Historical Events', '1', <EventsMenuItem />, [
    getItem('Map', '1.1', <EventsMenuSubItemMap />),
    getItem('Events List', '1.2', <EventsMenuSubItemList />)
  ]),
  getItem('Historical Figures', '2', <FiguresMenuItem />, [
    getItem('Figures List', '2.1', <FiguresMenuSubItemList />)
  ]),
  getItem('Countries', '3', <CountriesMenuItem />, [
    getItem('Historical States', '3.1', <HistoricalStatesSubItem />),
    getItem('Present Countries', '3.2', <PresentCountriesSubItem />)
  ]),
  getItem('Event Properties', '4', <EventPropertiesMenuItem />, [
    getItem('Event Categories', '4.1', <EventCategoriesSubItem />)
  ]),
  getItem('Figure Properties', '5', <FigurePropertiesMenuItem />, [
    getItem('Figulre Roles', '5.1', <FigureRolesSubItem />)
  ])
]

const menuItemsNoAccount: MenuItem[] = [
  getItem('Historical Events', '1', <EventsMenuItemNoAccount />)
]

const rootMenuKeys = ['1', '2', '3', '4', '5']

export { menuItemsLoggedIn, menuItemsNoAccount, rootMenuKeys }
