import { notification } from 'antd';

//#region HISTORICAL EVENTS NOTIFICATIONS
const eventCreationError = () => {
    notification.error({
        description: 'There was an issue creating the historical event.',
        message: 'Problems creating the event.'
    });
}

const eventCreationSuccess = (title: string) => {
    notification.success({
        description: 'Event ' + title + ' was created successfully.',
        message: 'Event created.'
    });
}

const eventDeletionError = (title: string | undefined) => {
    notification.error({
        description: 'There was an issue deleting ' + title + ' historical event.',
        message: 'Problems deleting the event.'
    });
}

const eventDeletionSuccess = (title: string | undefined) => {
    notification.success({
        description: 'Event ' + title + ' was deleted successfully.',
        message: 'Event deleted.'
    });
}

const eventEditError = (title: string) => {
    notification.error({
        description: 'There was an issue editing ' + title + ' historical event.',
        message: 'Problems editing the event.'
    });
}

const eventEditSuccess = (title: string) => {
    notification.success({
        description: 'Event ' + title + ' was updated successfully.',
        message: 'Event updated.'
    });
}

const eventLoadingError = () => {
    notification.error({
        description: 'There was an issue loading the historical event.',
        message: 'Problems loading the event.'
    });
}

const eventsLoadingError = () => {
    notification.error({
        description: 'There was an issue loading the list of historical events.',
        message: 'Problems loading the events.'
    });
}
//#endregion

//#region HISTORICAL FIGURES NOTIFICATIONS
const figureCreationError = () => {
    notification.error({
        description: 'There was an issue creating the historical figure.',
        message: 'Problems creating the figure.'
    });
}

const figureCreationSuccess = (title: string) => {
    notification.success({
        description: 'Figure ' + title + ' was created successfully.',
        message: 'Figure created.'
    });
}

const figureDeletionError = (title: string | undefined) => {
    notification.error({
        description: 'There was an issue deleting ' + title + ' historical figure.',
        message: 'Problems deleting the figure.'
    });
}

const figureDeletionSuccess = (title: string | undefined) => {
    notification.success({
        description: 'Figure ' + title + ' was deleted successfully.',
        message: 'Figure deleted.'
    });
}

const figureEditError = (title: string) => {
    notification.error({
        description: 'There was an issue editing ' + title + ' historical figure.',
        message: 'Problems editing the figure.'
    });
}

const figureEditSuccess = (title: string) => {
    notification.success({
        description: 'Figure ' + title + ' was updated successfully.',
        message: 'Figure updated.'
    });
}

const figureLoadingError = () => {
    notification.error({
        description: 'There was an issue loading the historical figure.',
        message: 'Problems loading the data.'
    });
}

const figuresLoadingError = () => {
    notification.error({
        description: 'There was an issue loading the list of historical figures.',
        message: 'Problems loading the data.'
    });
}
//#endregion

//#region HISTORICAL STATES NOTIFICATIONS
const historicalStateDeletionError = (title: string | undefined) => {
    notification.error({
        description: 'There was an issue deleting ' + title + ' historical state.',
        message: 'Problems deleting the historical state.'
    });
}

const historicalStateDeletionSuccess = (title: string | undefined) => {
    notification.success({
        description: 'Historical state ' + title + ' was deleted successfully.',
        message: 'Historical state deleted.'
    });
}

const historicalStateLoadingError = () => {
    notification.error({
        description: 'There was an issue loading the historical state.',
        message: 'Problems loading the data.'
    });
}

const historicalStatesLoadingError = () => {
    notification.error({
        description: 'There was an issue loading the list of historical states.',
        message: 'Problems loading the data.'
    });
}
//#endregion

const eventCategoriesLoadingError = () => {
    notification.error({
        description: 'There was an issue loading the list of event categories.',
        message: 'Problems loading the data.'
    });
}

const presentCountriesLoadingError = () => {
    notification.error({
        description: 'There was an issue loading the list of countries.',
        message: 'Problems loading the data.'
    });
}

export {
    eventCreationError, eventCreationSuccess, eventDeletionError, eventDeletionSuccess, eventEditError, eventEditSuccess, eventLoadingError, eventsLoadingError,
    figureCreationError, figureCreationSuccess, figureDeletionError, figureDeletionSuccess, figureEditError, figureEditSuccess, figureLoadingError, figuresLoadingError,
    historicalStateDeletionError, historicalStateDeletionSuccess, historicalStateLoadingError, historicalStatesLoadingError,
    eventCategoriesLoadingError, presentCountriesLoadingError    
}