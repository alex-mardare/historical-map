export function transformHistoricalStatesForSelector(historicalStates) {
    let historicalStateOptions = [];
    historicalStates.forEach(hs => {
        historicalStateOptions.push({
            label: hs.dateTo.length > 0 ? hs.name + '\n (' + hs.dateFrom + ' - ' + hs.dateTo + ')' : hs.name,
            value: hs.id
        })
    });

    return historicalStateOptions;
}