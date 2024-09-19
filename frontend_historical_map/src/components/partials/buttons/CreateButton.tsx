import { Button } from 'antd'
import React, { ReactElement } from 'react'
import { FormModal } from '../modals'

interface CreateButtonProps {
  closeObjectModal: () => void
  confirmLoading: boolean
  formComponent: ReactElement
  handleModalOk: () => void
  objectName: string
  openModal: boolean
  showModal: () => void
}

const CreateButton: React.FC<CreateButtonProps> = ({
  closeObjectModal,
  confirmLoading,
  formComponent,
  handleModalOk,
  objectName,
  openModal,
  showModal
}) => {
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

export { CreateButton }
