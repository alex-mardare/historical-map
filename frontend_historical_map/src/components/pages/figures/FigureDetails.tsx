import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { Card } from 'antd'
import React from 'react'
import { useParams } from 'react-router'

import { HISTORICAL_FIGURE_NAME } from '../../models/constants/constants'
import { HISTORICAL_FIGURES_SECTION } from '../../models/constants/urls'
import { HistoricalFigure } from '../../models/types/historicalFigure'
import { antCardHeaderBasic } from '../../partials/antdCardHeader'
import { useDetailPageHandlers } from '../../partials/handlers/detailsPageHandlers'
import { DeleteModal, FormModal } from '../../partials/modals'
import { useGetFigure } from '../../utils/hooks/figuresHooks'
import { objectDelete } from '../../utils/hooks/generalHooks'
import FiguresModalForm from './FiguresModalForm'

import '../../../assets/styling/detailsPage.css'

export default function FigureDetails() {
  const { figureId } = useParams()
  let figure = useGetFigure(figureId)

  const detailPageHandlerObj = {
    detailsPageObject: figure,
    objectDeleteHook: objectDelete,
    objectTypeName: HISTORICAL_FIGURE_NAME,
    returnPage: HISTORICAL_FIGURES_SECTION
  }
  const {
    closeObjectDeleteModal,
    closeObjectEditModal,
    confirmLoadingDelete,
    confirmLoadingEdit,
    form,
    handleDeleteModalOk,
    handleEditModalOk,
    handleGoBack,
    isLoadingDeleteButton,
    openObjectEditModal,
    onFinishEdit,
    openDelete,
    openEdit,
    openObjectDeleteModal
  } = useDetailPageHandlers(detailPageHandlerObj)

  //#region DISPLAY FUNCTIONALITY
  const displayTitleSection = (figureName: string | undefined) => {
    return antCardHeaderBasic(handleGoBack, figureName)
  }

  const displayDeathSection = (figure: HistoricalFigure | null) => {
    if (figure && figure.death_date) {
      return (
        <>
          <h2>Death</h2>
          <div>
            {figure.death_date && (
              <p>
                <b>Date:</b> {figure?.death_date}
              </p>
            )}
            {figure.death_historical_state && (
              <p>
                <b>Historical State:</b> {figure?.death_historical_state.name}
              </p>
            )}
            {figure.death_present_country && (
              <p>
                <b>Present Country:</b> {figure?.death_present_country.name}
              </p>
            )}
          </div>
        </>
      )
    }
  }
  //#endregion

  const figureModalForm = () => {
    return <FiguresModalForm onFinish={onFinishEdit} {...{ figure, form }} />
  }

  return (
    <>
      <Card
        actions={[
          <EditOutlined key="edit" onClick={openObjectEditModal} />,
          <DeleteOutlined key="delete" onClick={openObjectDeleteModal} />
        ]}
        loading={figure == null}
        title={displayTitleSection(figure?.name)}
      >
        <h2>Birth</h2>
        <p>
          <b>Date:</b> {figure?.birth_date}
        </p>
        <p>
          <b>Historical State:</b> {figure?.birth_historical_state.name}
        </p>
        <p>
          <b>Present Country:</b> {figure?.birth_present_country.name}
        </p>
        {displayDeathSection(figure)}
      </Card>

      <FormModal
        confirmLoading={confirmLoadingEdit}
        formComponent={figureModalForm()}
        closeObjectModal={closeObjectEditModal}
        handleModalOk={handleEditModalOk}
        modalTitle="Edit"
        objectName={HISTORICAL_FIGURE_NAME}
        openModal={openEdit}
      />

      <DeleteModal
        objectName={HISTORICAL_FIGURE_NAME}
        {...{
          closeObjectDeleteModal,
          confirmLoadingDelete,
          handleDeleteModalOk,
          isLoadingDeleteButton,
          openDelete
        }}
      />
    </>
  )
}
