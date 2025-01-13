import { Card } from 'antd'
import React from 'react'
import { useParams } from 'react-router'

import { PRESENT_COUNTRY_NAME } from '../../models/constants/constants'
import { PRESENT_COUNTRIES_SECTION } from '../../models/constants/urls'
import { antCardHeaderBasic } from '../../partials/antdCardHeader'
import { useDetailPageHandlers } from '../../partials/handlers/detailsPageHandlers'
import { useGetPresentCountry } from '../../utils/hooks/presentCountriesHooks'
import HistoricalStatePeriodList from '../historical-states/HistoricalStatePeriodList'

export default function PresentCountryDetails() {
  const { presentCountryId } = useParams()
  let presentCountry = useGetPresentCountry(presentCountryId)

  const detailPageHandlerObj = {
    detailsPageObject: presentCountry,
    objectTypeName: PRESENT_COUNTRY_NAME,
    returnPage: PRESENT_COUNTRIES_SECTION
  }

  const { handleGoBack } = useDetailPageHandlers(detailPageHandlerObj)

  //#region DISPLAY FUNCTIONALITY
  const displayTitleSection = (presentCountryName: string | undefined) => {
    return antCardHeaderBasic(handleGoBack, presentCountryName)
  }
  //#endregion

  return (
    <Card
      loading={presentCountry == null}
      title={displayTitleSection(presentCountry?.name)}
    >
      <h2>Historical States</h2>
      <HistoricalStatePeriodList
        historicalStates={presentCountry?.historical_states}
      />
    </Card>
  )
}
