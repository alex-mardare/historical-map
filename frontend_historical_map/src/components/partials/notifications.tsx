import { notification } from 'antd';

//#region HISTORICAL EVENTS NOTIFICATIONS
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

export const eventDeletionError = (title: string | undefined) => {
    notification.error({
        description: 'There was an issue deleting ' + title + ' historical event.',
        message: 'Problems deleting the event.'
    });
}

export const eventDeletionSuccess = (title: string | undefined) => {
    notification.success({
        description: 'Event ' + title + ' was deleted successfully.',
        message: 'Event deleted.'
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
        message: 'Problems loading the events.'
    });
}
//#endregion

//#region HISTORICAL FIGURES NOTIFICATIONS
export const figureCreationError = () => {
    notification.error({
        description: 'There was an issue creating the historical figure.',
        message: 'Problems creating the figure.'
    });
}

export const figureCreationSuccess = (title: string) => {
    notification.success({
        description: 'Figure ' + title + ' was created successfully.',
        message: 'Figure created.'
    });
}

export const figureEditError = (title: string) => {
    notification.error({
        description: 'There was an issue editing ' + title + ' historical figure.',
        message: 'Problems editing the figure.'
    });
}

export const figureEditSuccess = (title: string) => {
    notification.success({
        description: 'Figure ' + title + ' was updated successfully.',
        message: 'Figure updated.'
    });
}

export const figureLoadingError = () => {
    notification.error({
        description: 'There was an issue loading the list of historical figures.',
        message: 'Problems loading the data.'
    });
}
//#endregion

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