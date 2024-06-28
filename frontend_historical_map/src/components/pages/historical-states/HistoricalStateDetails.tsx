import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { Card } from "antd"
import React from "react"
import { useParams } from "react-router"

import HistoricalStateModalForm from './HistoricalStateModalForm'
import { HISTORICAL_STATE_NAME } from '../../models/constants/constants'
import { HISTORICAL_STATES_SECTION } from '../../models/constants/urls'
import { HistoricalState } from '../../models/types/historicalState'
import { antCardHeaderHistoricalState } from "../../partials/antdCardHeader"
import { useDetailPageHandlers } from '../../partials/handlers/detailsPageHandlers'
import { DeleteModal, FormModal } from '../../partials/modals'
import { objectDelete } from '../../utils/hooks/generalHooks'
import { useGetHistoricalState } from '../../utils/hooks/historicalStatesHooks'

import '../../../assets/styling/detailsPage.css'


export default function HistoricalStateDetails(){
  const { historicalStateId } = useParams()
  let historicalState = useGetHistoricalState(historicalStateId)  

  const useDetailPageHandlersProps = {detailsPageObject: historicalState, objectDeleteHook: objectDelete, objectTypeName: HISTORICAL_STATE_NAME, 
    returnPage: HISTORICAL_STATES_SECTION}
  const { closeObjectDeleteModal, closeObjectEditModal, confirmLoadingDelete, confirmLoadingEdit, form, handleDeleteModalOk, handleGoBack, isLoadingDeleteButton,
    openObjectEditModal, handleEditModalOk, onFinishEdit, openDelete, openEdit, openObjectDeleteModal } = useDetailPageHandlers(useDetailPageHandlersProps)
  
  //#region DISPLAY FUNCTIONALITY
  const displayTitleSection = (historicalState: HistoricalState | null) => {
    return antCardHeaderHistoricalState(historicalState, handleGoBack)
  }
  //#endregion

  const historicalStateModalForm = () => { return <HistoricalStateModalForm historicalState={historicalState} form={form} onFinish={onFinishEdit} />}
  
  return(
    <>
      <Card 
        actions={[
          <EditOutlined key='edit' onClick={openObjectEditModal} />,
          <DeleteOutlined key='delete' onClick={openObjectDeleteModal} />
        ]} 
        loading={historicalState == null} 
        title={displayTitleSection(historicalState)}
        >
          <p><b>Foundation Date:</b> {historicalState?.dateFrom}</p>
          <p><b>Dissolution Date:</b> {historicalState?.dateTo}</p>
          <p><b>Flag</b></p>
          <img alt={`${'Flag of ' + historicalState?.name}`} className='stateFlag' src={`${historicalState?.flagUrl}`}></img>
      </Card>

      <FormModal
        confirmLoading={confirmLoadingEdit}
        formComponent={historicalStateModalForm()}
        closeObjectModal={closeObjectEditModal}
        handleModalOk={handleEditModalOk}
        modalTitle='Edit'
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