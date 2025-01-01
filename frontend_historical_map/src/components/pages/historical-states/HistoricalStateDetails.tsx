import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { Card } from 'antd'
import React from 'react'
import { useParams } from 'react-router'

import { HISTORICAL_STATE_NAME } from '../../models/constants/constants'
import { HISTORICAL_STATES_SECTION } from '../../models/constants/urls'
import { HistoricalState } from '../../models/types/historicalState'
import { antCardHeaderHistoricalState } from '../../partials/antdCardHeader'
import { useDetailPageHandlers } from '../../partials/handlers/detailsPageHandlers'
import { DeleteModal, FormModal } from '../../partials/modals'
import { displayHumanReadableDate } from '../../utils/display/displayDates'
import { objectDelete } from '../../utils/hooks/generalHooks'
import { useGetHistoricalState } from '../../utils/hooks/historicalStatesHooks'
import PresentCountryPeriods from '../present-countries/PresentCountryPeriods'
import HistoricalStateModalForm from './HistoricalStateModalForm'

import '../../../assets/styling/historical-states/detailsPage.css'

export default function HistoricalStateDetails() {
  const { historicalStateId } = useParams()
  let historicalState = useGetHistoricalState(historicalStateId)

  const useDetailPageHandlersProps = {
    detailsPageObject: historicalState,
    objectDeleteHook: objectDelete,
    objectTypeName: HISTORICAL_STATE_NAME,
    returnPage: HISTORICAL_STATES_SECTION
  }
  const {
    closeObjectDeleteModal,
    closeObjectEditModal,
    confirmLoadingDelete,
    confirmLoadingEdit,
    form,
    handleDeleteModalOk,
    handleGoBack,
    isLoadingDeleteButton,
    openObjectEditModal,
    handleEditModalOk,
    onFinishEdit,
    openDelete,
    openEdit,
    openObjectDeleteModal
  } = useDetailPageHandlers(useDetailPageHandlersProps)

  //#region DISPLAY FUNCTIONALITY
  const displayTitleSection = (historicalState: HistoricalState | null) => {
    return antCardHeaderHistoricalState(historicalState, handleGoBack)
  }
  //#endregion

  const historicalStateModalForm = () => {
    return (
      <HistoricalStateModalForm
        historicalState={historicalState}
        form={form}
        onFinish={onFinishEdit}
      />
    )
  }

  return (
    <>
      <Card
        actions={[
          <EditOutlined key="edit" onClick={openObjectEditModal} />,
          <DeleteOutlined key="delete" onClick={openObjectDeleteModal} />
        ]}
        loading={historicalState == null}
        title={displayTitleSection(historicalState)}
      >
        <div className="historical-state-card-content">
          <h2>
            Foundation Date:{' '}
            {displayHumanReadableDate(historicalState?.dateFrom)}
          </h2>
          <h2>
            Dissolution Date:{' '}
            {displayHumanReadableDate(historicalState?.dateTo)}
          </h2>
        </div>
        <h2>Present Countries</h2>
        <PresentCountryPeriods
          presentCountries={historicalState?.presentCountries}
        />
      </Card>

      <FormModal
        confirmLoading={confirmLoadingEdit}
        formComponent={historicalStateModalForm()}
        closeObjectModal={closeObjectEditModal}
        handleModalOk={handleEditModalOk}
        modalTitle="Edit"
        objectName={HISTORICAL_STATE_NAME}
        openModal={openEdit}
      />

      <DeleteModal
        confirmLoadingDelete={confirmLoadingDelete}
        closeObjectDeleteModal={closeObjectDeleteModal}
        handleDeleteModalOk={handleDeleteModalOk}
        isLoadingDeleteButton={isLoadingDeleteButton}
        objectName={HISTORICAL_STATE_NAME}
        openDelete={openDelete}
      />
    </>
  )
}
