import { Button } from 'antd'
import React, { ReactElement } from 'react'
import { FormModal } from '../modals'

type propType = {
  closeObjectModal: () => void
  confirmLoading: boolean
  formComponent: ReactElement
  handleModalOk: () => void
  objectName: string
  openModal: boolean
  showModal: () => void
}

export default function CreateButton({
  closeObjectModal,
  confirmLoading,
  formComponent,
  handleModalOk,
  objectName,
  openModal,
  showModal
}: propType) {
  return (
    <div>
      <Button onClick={showModal} type="primary">
        Create
      </Button>
      <FormModal
        modalTitle="Create"
        {...{
          closeObjectModal,
          confirmLoading,
          formComponent,
          handleModalOk,
          objectName,
          openModal
        }}
      />
    </div>
  )
}
