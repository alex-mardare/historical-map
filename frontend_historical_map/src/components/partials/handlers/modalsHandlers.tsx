import { Form } from 'antd'
import { useState } from 'react'

import { handleFormSubmission } from '../../utils/forms/formSubmission'
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
    handleFormSubmission(form, onFormSubmit, setConfirmLoading)
  }

  const onFormSubmit = async (values: any) => {
    try {
      await submitData(values, setConfirmLoading, setOpenModal)
      refreshFunction()
    } catch (error) {
      console.log(error)
    }
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
