import {
  HistoricalState,
  HistoricalStateOption
} from '../../models/types/historicalState'

export function transformHistoricalStatesForSelector(
  historicalStates: HistoricalState[]
) {
  let historicalStateOptions: HistoricalStateOption[] = []
  historicalStates.forEach((hs) => {
    historicalStateOptions.push({
      description:
        hs.end_date && hs.end_date.length > 0
          ? '(' + hs.start_date + ' - ' + hs.end_date + ')'
          : '',
      label: hs.name,
      value: hs.id
    })
  })
  return historicalStateOptions
}
