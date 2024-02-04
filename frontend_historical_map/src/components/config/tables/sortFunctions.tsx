export function sortRowsByNameProperty(a: any, b: any) : number {
    if (a !== null && b != null && a.hasOwnProperty('name') && b.hasOwnProperty('name')) {
        if (a.name > b.name) {
            return 1;
        }
        else if (a.name < b.name) {
            return -1;
        }
        return 0;
    }

    return 0;
}