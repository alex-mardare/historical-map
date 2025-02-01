import { Form } from 'antd'
import { useState } from 'react'

import { usePostObject } from '../../utils/hooks/generalHooks'

type propType = {
  objectName: string
  refreshFunction: () => void
}

export const useModalsHandlers = ({
  objectName,
  refreshFunction
}: propType) => {
  const [confirmLoading, setConfirmLoading] = useState(false)
  const [openModal, setOpenModal] = useState(false)

  const [form] = Form.useForm()
  const { submitData } = usePostObject(objectName)

  //#region MODAL
  const closeObjectModal = () => {
    setOpenModal(false)
  }

  const handleModalOk = () => {
    setConfirmLoading(true)
  }

  const onFormSubmit = async (values: any) => {
    try {
      await form
        .validateFields()
        .then(() => {
          submitData(values, setConfirmLoading, setOpenModal)
          refreshFunction()
        })
        .catch((error) => {
          console.log('There was an issue submitting the form.')
          console.log(error.errorFields)
        })
    } catch (error) {
      console.log(error)
    }
    setConfirmLoading(false)
  }

  const showModal = () => {
    setOpenModal(true)
  }
  //#endregion

  return {
    closeObjectModal,
    confirmLoading,
    form,
    handleModalOk,
    onFormSubmit,
    openModal,
    showModal
  }
}
