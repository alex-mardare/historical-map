import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { Card} from "antd"
import React from "react"
import { useParams } from "react-router"

import FiguresModalForm from './FiguresModalForm'
import { HISTORICAL_FIGURE_NAME } from '../../models/constants/constants'
import { HistoricalFigure } from "../../models/types/historicalFigure"
import { antCardHeaderFigure } from "../../partials/antdCardHeader"
import { useDetailPageHandlers } from '../../partials/detailsPageHandlers'
import { DeleteModal, FormModal } from '../../partials/modals'
import { figureDelete, useGetFigure, usePutFigure } from '../../utils/hooks/figuresHooks'

import '../../../assets/styling/detailsPage.css'


export default function FigureDetails(){
  const { figureId } = useParams()
  let figure = useGetFigure(figureId)

  const useDetailPageHandlersProps = {detailsPageObject: figure, objectDeleteHook: figureDelete, objectPutHook: usePutFigure, returnPage: 'figures'}
  const { closeObjectDeleteModal, closeObjectEditModal, confirmLoadingDelete, confirmLoadingEdit, form, handleDeleteModalOk, handleGoBack, openObjectEditModal, 
    handleEditModalOk, onFinishEdit, openDelete, openEdit, openObjectDeleteModal } = useDetailPageHandlers(useDetailPageHandlersProps)
  
  //#region DISPLAY FUNCTIONALITY
  const displayTitleSection = (figure: HistoricalFigure | null) => {
    return antCardHeaderFigure(figure, handleGoBack)
  }

  const displayDeathSection = (figure: HistoricalFigure | null) => {
    if (figure && figure.deathDate) {
      return (
        <>
          <h2>Death</h2>
          <div>
            {figure.deathDate && <p><b>Date:</b> {figure?.deathDate}</p>}
            {figure.deathHistoricalState && <p><b>Historical State:</b> {figure?.deathHistoricalState.name}</p>}
            {figure.deathPresentCountry && <p><b>Present Country:</b> {figure?.deathPresentCountry.name}</p>}
          </div>
        </>
      )
        
    }
  }
  //#endregion

  const figureModalForm = () => { return (<FiguresModalForm figure={figure} form={form} onFinish={onFinishEdit} />)}

  return(
    <>
      <Card 
        actions={[
          <EditOutlined key='edit' onClick={openObjectEditModal} />,
          <DeleteOutlined key='delete' onClick={openObjectDeleteModal} />
        ]}
        loading={figure == null} 
        title={displayTitleSection(figure)}
        >
          <h2>Birth</h2>
          <p><b>Date:</b> {figure?.birthDate}</p>
          <p><b>Historical State:</b> {figure?.birthHistoricalState.name}</p>
          <p><b>Present Country:</b> {figure?.birthPresentCountry.name}</p>
          {displayDeathSection(figure)}
      </Card>

      <FormModal
        confirmLoadingEdit={confirmLoadingEdit}
        formComponent={figureModalForm()}
        closeObjectEditModal={closeObjectEditModal}
        handleEditModalOk={handleEditModalOk}
        objectName={HISTORICAL_FIGURE_NAME}
        openEdit={openEdit}
      />

      <DeleteModal
        confirmLoadingDelete={confirmLoadingDelete}
        closeObjectDeleteModal={closeObjectDeleteModal}
        handleDeleteModalOk={handleDeleteModalOk}
        objectName={HISTORICAL_FIGURE_NAME}
        openDelete={openDelete}
      />
    </>
  )
}