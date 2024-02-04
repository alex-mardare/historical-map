import { InfoCircleOutlined } from '@ant-design/icons';
import { Button, Tooltip } from 'antd';
import React from 'react';

import { EVENT_TOOLTIP_TEXT } from '../models/constants/constants';
import { HistoricalEvent } from '../models/types/historicalEvent';
import { HistoricalFigure } from '../models/types/historicalFigure';


export function antCardHeaderEvent(event: HistoricalEvent | null, handleGoBack: () => void) {
    return (
        <div className='card-header'>
            <Button onClick={handleGoBack} type="primary">Go Back</Button>
            <div className='card-title-div'>
                <h1 className='card-title-header'>
                    {event?.name}
                    {!event?.approximateRealLocation && returnToolTip(EVENT_TOOLTIP_TEXT)}
                </h1>
            </div>
        </div>
    );
}

export function antCardHeaderFigure(figure: HistoricalFigure | null, handleGoBack: () => void) {
    return (
        <div className='card-header'>
            <Button onClick={handleGoBack} type="primary">Go Back</Button>
            <div className='card-title-div'>
                <h1 className='card-title-header'>
                    {figure?.name}
                </h1>
            </div>
        </div>
    );
}

function returnToolTip(tooltipText: string) {
    return (
        <Tooltip placement='right' title={tooltipText}>
            <span style={{marginLeft: '5px'}}>
                <InfoCircleOutlined />
            </span>
        </Tooltip>
    );
}