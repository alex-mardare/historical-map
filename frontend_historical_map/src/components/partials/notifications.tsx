import { notification } from 'antd';

export const eventCreationError = () => {
    notification.error({
        description: 'There was an issue creating the historical event.',
        message: 'Problems creating the event.'
    });
}

export const eventCreationSuccess = (title: string) => {
    notification.success({
        description: 'Event ' + title + ' was created successfully.',
        message: 'Event created.'
    });
}

export const eventEditError = (title: string) => {
    notification.error({
        description: 'There was an issue editing ' + title + ' historical event.',
        message: 'Problems editing the event.'
    });
}

export const eventEditSuccess = (title: string) => {
    notification.success({
        description: 'Event ' + title + ' was updated successfully.',
        message: 'Event updated.'
    });
}

export const eventLoadingError = () => {
    notification.error({
        description: 'There was an issue loading the historical event.',
        message: 'Problems loading the event.'
    });
}

export const eventsLoadingError = () => {
    notification.error({
        description: 'There was an issue loading the list of historical events.',
        message: 'Problems loading the data.'
    });
}

export const eventCategoriesLoadingError = () => {
    notification.error({
        description: 'There was an issue loading the list of event categories.',
        message: 'Problems loading the data.'
    });
}

export const historicalStatesLoadingError = () => {
    notification.error({
        description: 'There was an issue loading the list of historical states.',
        message: 'Problems loading the data.'
    });
}

export const presentCountriesLoadingError = () => {
    notification.error({
        description: 'There was an issue loading the list of countries.',
        message: 'Problems loading the data.'
    });
}