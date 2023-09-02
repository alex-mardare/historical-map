import { InfoCircleOutlined } from '@ant-design/icons';
import { Button, Tooltip } from 'antd';
import React from 'react';

import { EVENT_TOOLTIP_TEXT } from '../models/constants/constants';
import { HistoricalEvent } from '../models/types/historicalEvent';


function returnToolTip(tooltipText: string) {
    return (
        <Tooltip placement='right' title={tooltipText}>
            <span style={{marginLeft: '5px'}}>
                <InfoCircleOutlined />
            </span>
        </Tooltip>
    );
}


export function antCardHeaderEvent(event: HistoricalEvent | null, handleGoBack: () => void) {
    return (
        <div className='card-header'>
            <Button onClick={handleGoBack} type="primary">Go Back</Button>
            <div className='card-title-div'>
                <h3 className='card-title-header'>
                    {event?.name}
                    {!event?.approximateRealLocation && returnToolTip(EVENT_TOOLTIP_TEXT)}
                </h3>
            </div>
        </div>
    );
}