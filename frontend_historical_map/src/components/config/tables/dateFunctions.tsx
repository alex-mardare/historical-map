import { HistoricalDateObject } from "../../models/types/historicalDateObject";


export function convertDateToString(date: String) : Date {
    const dateArr = extractDateFromString(date);

    const year = Number(dateArr[0])
    const month = dateArr[1] ? Number(dateArr[1]) - 1 : 0
    const day = dateArr[2] ? Number(dateArr[2]) : 1

    return new Date(year, month, day)
}

export function dateColumnSort(firstObjectDate: HistoricalDateObject, secondObjectDate: HistoricalDateObject, firstDate: Date, secondDate: Date) {
    // For negative dates the order is reversed
    if (firstObjectDate.date[0] === '-') {
        if (secondObjectDate.date[0] !== '-') {
            return -1;
        }
        else {
            if (firstDate > secondDate) {
                return 1;
            }
            else if (firstDate < secondDate) {
                return -1;
            }
            else {
                if (firstObjectDate.time === null) {
                    return secondObjectDate.time === null ? 0 : 1;
                }
                else {
                    if (secondObjectDate.time === null) {
                        return -1;
                    }
                    else {
                        if (firstObjectDate.time > secondObjectDate.time) {
                            return -1;
                        }
                        else if (firstObjectDate.time < secondObjectDate.time) {
                            return 1;
                        }
                        return 0;
                    }
                }
            }
        }
    }
    else {
        if (secondObjectDate.date[0] === '-') {
            return 1;
        }
        else {
            if (firstDate > secondDate) {
                return 1;
            }
            else if (firstDate < secondDate) {
                return -1;
            }
            else {
                if (firstObjectDate.time === null) {
                    return secondObjectDate.time === null ? 0 : -1;
                }
                else {
                    if (secondObjectDate.time === null) {
                        return 1;
                    }
                    else {
                        if (firstObjectDate.time > secondObjectDate.time) {
                            return 1;
                        }
                        else if (firstObjectDate.time < secondObjectDate.time) {
                            return -1;
                        }
                        return 0;
                    }
                }
            }
        }
    }
}

function extractDateFromString(date : String): String[] {
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