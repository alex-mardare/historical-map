import { Button } from 'antd';
import React from 'react';

export function antCardHeader(headerTitle: string | undefined, handleGoBack: () => void) {
    if (headerTitle !== undefined) {
        return (
            <div className='card-header'>
                <Button onClick={handleGoBack} type="primary">Go Back</Button>
                <div className='card-title-div'>
                    <h3 className='card-title-header'>{headerTitle}</h3>
                </div>
            </div>
        );
    }
}