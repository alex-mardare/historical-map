import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { Card, List } from 'antd'
import React from 'react'

import { HISTORICAL_FIGURE_ROLE_NAME } from '../../models/constants/constants'
import { HISTORICAL_FIGURE_ROLES_SECTION } from '../../models/constants/urls'
import { HistoricalFigureRole } from '../../models/types/historicalFigureRole'
import { useDetailPageHandlers } from '../../partials/handlers/detailsPageHandlers'
import { DeleteModal, FormModal } from '../../partials/modals'
import { objectDelete } from '../../utils/hooks/generalHooks'
import FigureRoleModalForm from './FigureRoleModalForm'

interface FigureRoleDetailsProps {
  figureRole: HistoricalFigureRole
}

export default function FigureRoleDetails({
  figureRole
}: FigureRoleDetailsProps) {
  const useDetailPageHandlersProps = {
    detailsPageObject: figureRole,
    objectDeleteHook: objectDelete,
    objectTypeName: HISTORICAL_FIGURE_ROLE_NAME,
    returnPage: HISTORICAL_FIGURE_ROLES_SECTION
  }
  const {
    closeObjectDeleteModal,
    closeObjectEditModal,
    confirmLoadingDelete,
    confirmLoadingEdit,
    form,
    handleDeleteModalOk,
    handleEditModalOk,
    isLoadingDeleteButton,
    onFinishEdit,
    openDelete,
    openEdit,
    openObjectEditModal,
    openObjectDeleteModal
  } = useDetailPageHandlers(useDetailPageHandlersProps)

  return (
    <List.Item>
      <Card
        actions={[
          <EditOutlined key="edit" onClick={openObjectEditModal} />,
          <DeleteOutlined key="delete" onClick={openObjectDeleteModal} />
        ]}
        key={figureRole.id}
        hoverable={true}
        title={figureRole.name}
      />
      <FormModal
        confirmLoading={confirmLoadingEdit}
        formComponent={
          <FigureRoleModalForm
            onFinish={onFinishEdit}
            {...{ figureRole, form }}
          />
        }
        closeObjectModal={closeObjectEditModal}
        handleModalOk={handleEditModalOk}
        modalTitle="Edit"
        objectName={HISTORICAL_FIGURE_ROLE_NAME}
        openModal={openEdit}
      />

      <DeleteModal
        objectName={HISTORICAL_FIGURE_ROLE_NAME}
        {...{
          confirmLoadingDelete,
          closeObjectDeleteModal,
          handleDeleteModalOk,
          isLoadingDeleteButton,
          openDelete
        }}
      />
    </List.Item>
  )
}
