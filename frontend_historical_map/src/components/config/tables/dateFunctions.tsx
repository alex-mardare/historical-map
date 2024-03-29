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
    if (firstObjectDate.date && firstObjectDate.date[0] === '-') {
        if (secondObjectDate.date && secondObjectDate.date[0] !== '-') {
            return -1;
        }
        else {
            if (firstDate === undefined || secondDate === undefined) {
                if (firstDate === undefined && secondDate !== undefined) {
                    return -1;
                }
                else if (firstDate !== undefined && secondDate === undefined) {
                    return 1;
                }
                else {
                    return 0;
                }
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
    }
    else {
        if (secondObjectDate.date && secondObjectDate.date[0] === '-') {
            return 1;
        }
        else {
            if (firstDate === undefined || secondDate === undefined) {
                if (firstDate === undefined && secondDate !== undefined) {
                    return -1;
                }
                else if (firstDate !== undefined && secondDate === undefined) {
                    return 1;
                }
                else {
                    return 0;
                }
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