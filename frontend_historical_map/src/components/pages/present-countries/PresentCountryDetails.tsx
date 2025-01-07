import { Card, List } from 'antd'
import React from 'react'

import { PresentCountry } from '../../models/types/presentCountry'

import '../../../assets/styling/present-countries/detailsPage.css'

interface PresentCountryDetailsProps {
  presentCountry: PresentCountry
}

export default function PresentCountryDetails({
  presentCountry
}: PresentCountryDetailsProps) {
  const cardTile = (presentCountry: PresentCountry): JSX.Element => {
    return (
      <div>
        {presentCountry.flag_url && (
          <img
            alt={`${presentCountry.name} flag`}
            className="present-country-tile-flag"
            src={`${presentCountry.flag_url}`}
          />
        )}
        {presentCountry.name}
      </div>
    )
  }

  return (
    <List.Item>
      <Card
        hoverable={true}
        key={presentCountry.id}
        title={cardTile(presentCountry)}
      />
    </List.Item>
  )
}
