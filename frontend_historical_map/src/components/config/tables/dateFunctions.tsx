import { HistoricalDateObject } from "../../models/types/historicalDateObject";


export function convertDateToString(date: string | null) : Date | undefined {
    const dateArr = extractDateFromString(date);
    if (dateArr !== undefined) {
        const year = Number(dateArr[0])
        const month = dateArr[1] ? Number(dateArr[1]) - 1 : 0
        const day = dateArr[2] ? Number(dateArr[2]) : 1
    
        return new Date(year, month, day)
    }
}

export function dateColumnSort(firstObjectDate: HistoricalDateObject, secondObjectDate: HistoricalDateObject, firstDate: Date | undefined, secondDate: Date | undefined) {
    // For negative dates the order is reversed
    const isFirstDateNegative = firstObjectDate.date && firstObjectDate.date[0] === '-'
    const isSecondDateNegative = secondObjectDate.date && secondObjectDate.date[0] === '-'

    if (isFirstDateNegative && !isSecondDateNegative) return -1
    if (!isFirstDateNegative && isSecondDateNegative) return 1

    if (firstDate === undefined) return secondDate === undefined ? 0 : 1
    if (secondDate === undefined) return -1

    if (firstDate !== secondDate) return firstDate > secondDate ? 1 : -1

    if (firstObjectDate.time === null) return secondObjectDate.time === null ? 0 : 1
    if (secondObjectDate.time === null) return -1

    if (firstObjectDate.time !== secondObjectDate.time) {
        if (firstObjectDate.time > secondObjectDate.time) return 1
        else return -1
    }
    else return 0
}

function extractDateFromString(date : string | null): String[] | undefined {
    if (date) {
        let dateComponents = []
        if (date[0] === '-') {
            dateComponents = date.substring(1).split('-')
            dateComponents[0] = '-'.concat(dateComponents[0])
        }
        else {
            dateComponents = date.split('-')
        }
    
        return dateComponents
    }
}