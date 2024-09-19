import { useState } from 'react'

import apiClient from '../../../config/axiosSetup'
import { HISTORICAL_FIGURE_ROLE_NAME } from '../../models/constants/constants'
import { HISTORICAL_FIGURE_ROLES_ENDPOINT } from '../../models/constants/urls'
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
      const response = await apiClient.get(HISTORICAL_FIGURE_ROLES_ENDPOINT)
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
        const response = await apiClient.get(
          HISTORICAL_FIGURE_ROLES_ENDPOINT + figureRoleId
        )
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
