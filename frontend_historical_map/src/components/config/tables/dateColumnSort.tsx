import { HistoricalDateObject } from "../../models/types/historicalDateObject";

export function dateColumnSort(firstObjectDate: HistoricalDateObject, secondObjectDate: HistoricalDateObject, firstDate: Date, secondDate: Date) {
    if (firstObjectDate.date[0] === '-') {
        if (secondObjectDate.date[0] !== '-') {
            return -1;
        }
        else {
            if (firstDate > secondDate) {
                return -1;
            }
            else if (firstDate < secondDate) {
                return 1;
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