import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { Card, List } from 'antd'
import React from 'react'

import { EVENT_CATEGORY_NAME } from '../../models/constants/constants'
import { EVENT_CATEGORIES_SECTION } from '../../models/constants/urls'
import { EventCategory } from '../../models/types/eventCategory'
import { useDetailPageHandlers } from '../../partials/handlers/detailsPageHandlers'
import { DeleteModal, FormModal } from '../../partials/modals'
import { objectDelete } from '../../utils/hooks/generalHooks'
import EventCategoryModalForm from './EventCategoryModalForm'

interface EventCategoryDetailsProps {
  eventCategory: EventCategory
}

export default function EventCategoryDetails({
  eventCategory
}: EventCategoryDetailsProps) {
  const useDetailPageHandlersProps = {
    detailsPageObject: eventCategory,
    objectDeleteHook: objectDelete,
    objectTypeName: EVENT_CATEGORY_NAME,
    returnPage: EVENT_CATEGORIES_SECTION
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
        key={eventCategory.id}
        hoverable={true}
        title={eventCategory.name}
      />
      <FormModal
        confirmLoading={confirmLoadingEdit}
        formComponent={
          <EventCategoryModalForm
            onFinish={onFinishEdit}
            {...{ eventCategory, form }}
          />
        }
        closeObjectModal={closeObjectEditModal}
        handleModalOk={handleEditModalOk}
        modalTitle="Edit"
        objectName={EVENT_CATEGORY_NAME}
        openModal={openEdit}
      />

      <DeleteModal
        objectName={EVENT_CATEGORY_NAME}
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
