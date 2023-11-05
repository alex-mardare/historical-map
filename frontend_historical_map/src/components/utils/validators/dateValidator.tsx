import { DATE_FORMAT } from "../../models/constants/constants";


export const dateFieldValidator = async (rule: any, value: string) => {
    if (rule.field === 'deathDate' && (value === undefined || value.length == 0)) {
        return Promise.resolve();
    }
    if (!DATE_FORMAT.test(value)) {
        return Promise.reject('The date must have one of the following formats: YYYY, YYYY-MM, YYYY-MM-DD. Negative years are allowed.');
    }
    return Promise.resolve();
}