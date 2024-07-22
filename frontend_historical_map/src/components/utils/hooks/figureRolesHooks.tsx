import axios from 'axios'
import { useState } from 'react'

import { HISTORICAL_FIGURE_ROLE_NAME } from '../../models/constants/constants'
import { FIGURE_ROLES_FULL_URL } from '../../models/constants/urls'
import { HistoricalFigureRole } from '../../models/types/historicalFigureRole'
import { DataGetFigureRoles } from '../../models/types/hooksDataTypes'
import {
  objectListLoadingError,
  objectLoadingError
} from '../../partials/notifications'
import { useEffectOnceWrapper } from './generalHooks'

function useGetFigureRoles(): DataGetFigureRoles {
  const [figureRoles, setFigureRoles] = useState([])

  const fetchFigureRoles = async () => {
    try {
      const response = await axios.get(FIGURE_ROLES_FULL_URL)
      setFigureRoles(response.data)
    } catch (error) {
      objectListLoadingError(HISTORICAL_FIGURE_ROLE_NAME)
    }
  }

  useEffectOnceWrapper(() => {
    fetchFigureRoles()
  })

  return {
    figureRoles,
    refreshFunction: fetchFigureRoles
  }
}

function useGetFigureRole(
  figureRoleId: string | undefined
): HistoricalFigureRole | null {
  const [figureRole, setFigureRole] = useState(null)

  useEffectOnceWrapper(() => {
    async function fetchData() {
      try {
        const response = await axios.get(FIGURE_ROLES_FULL_URL + figureRoleId)
        setFigureRole(response.data)
      } catch (error) {
        objectLoadingError(HISTORICAL_FIGURE_ROLE_NAME)
      }
    }

    fetchData()
  })

  return figureRole
}

export { useGetFigureRoles, useGetFigureRole }
