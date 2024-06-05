import { notification } from 'antd'
import pluralize from 'pluralize'

import { Dictionary } from '../models/types/genericTypes'
import { capitaliseWord } from '../utils/display/displayStrings'


const entitiesDictionary: Dictionary = {
    EVENT: 'event',
    EVENT_CATEGORY: 'event category',
    HISTORICAL_FIGURE: 'historical figure',
    HISTORICAL_STATE: 'historical state',
    PRESENT_COUNTRY: 'country'
}

const objectCreationError = (objectName: string) => {
    notification.error({
        description: `There was an issue creating the ${entitiesDictionary[objectName]}.`,
        message: `Problems creating the ${entitiesDictionary[objectName]}`
    })
}
const objectCreationSuccess = (objectName: string, title: string | undefined) => {
    const capitalisedWord = capitaliseWord(entitiesDictionary[objectName])
    notification.success({
        description: `${capitalisedWord + ' ' + title} was created successfully.`,
        message: `${capitalisedWord} created`
    })
}
const objectDeletionError = (objectName: string, title: string | undefined) => {
    notification.error({
        description: `There was an issue deleting ${title} ${entitiesDictionary[objectName]}.`,
        message: `Problems deleting the ${entitiesDictionary[objectName]}`
    })
}
const objectDeletionSuccess = (objectName: string, title: string | undefined) => {
    const capitalisedWord = capitaliseWord(entitiesDictionary[objectName])
    notification.success({
        description: `${capitalisedWord} ${title} was deleted successfully.`,
        message: `${capitalisedWord} deleted`
    })
}
const objectEditError = (objectName: string, title: string | undefined) => {
    notification.error({
        description: `There was an issue editing ${title} ${entitiesDictionary[objectName]}.`,
        message: `Problems editing the ${entitiesDictionary[objectName]}`
    })
}
const objectEditSuccess = (objectName: string, title: string | undefined) => {
    const capitalisedWord = capitaliseWord(entitiesDictionary[objectName])
    notification.success({
        description: `${capitalisedWord} ${title} was updated successfully.`,
        message: `${capitalisedWord} updated`
    })
}
const objectLoadingError = (objectName: string) => {
    notification.error({
        description: `There was an issue loading the ${entitiesDictionary[objectName]}.`,
        message: `Problems loading the ${entitiesDictionary[objectName]}`
    })
}
const objectListLoadingError = (objectName: string) => {
    notification.error({
        description: `There was an issue loading the list of ${pluralize(entitiesDictionary[objectName])}.`,
        message: 'Problems loading the data'
    })
}

export {
    entitiesDictionary,
    objectCreationError, objectCreationSuccess, objectDeletionError, objectDeletionSuccess, objectEditError, objectEditSuccess, objectLoadingError, objectListLoadingError
}