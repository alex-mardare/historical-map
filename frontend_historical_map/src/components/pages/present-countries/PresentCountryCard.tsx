import { Card, List } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'

import { PRESENT_COUNTRIES_SECTION } from '../../models/constants/urls'
import { PresentCountry } from '../../models/types/presentCountry'

import '../../../assets/styling/present-countries/cardPage.css'

interface PresentCountryCardProps {
  presentCountry: PresentCountry
}

export default function PresentCountryCard({
  presentCountry
}: PresentCountryCardProps) {
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
      <Link to={`${PRESENT_COUNTRIES_SECTION + '/' + presentCountry.id}`}>
        <Card
          hoverable={true}
          key={presentCountry.id}
          title={cardTile(presentCountry)}
        />
      </Link>
    </List.Item>
  )
}
