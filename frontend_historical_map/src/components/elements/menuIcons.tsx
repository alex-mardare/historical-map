import Icon from '@ant-design/icons';
import type { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon';
import React from 'react';

export const MapIcon = (props: Partial<CustomIconComponentProps>) => (
    <Icon component={() => <img src={`${process.env.PUBLIC_URL}/world.png`} alt='Historical events button'/>} {...props} />
)

export const FiguresIcon = (props: Partial<CustomIconComponentProps>) => (
    <Icon component={() => <img src={`${process.env.PUBLIC_URL}/figures.png`} alt='Historical figures button'/>} {...props} />
)