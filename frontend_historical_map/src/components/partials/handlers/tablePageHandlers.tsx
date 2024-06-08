import { Form } from 'antd'
import { useState } from 'react'

import { DataCreateUpdate } from '../../models/types/hooksDataTypes'
import { handleFormSubmission } from '../../utils/forms/formSubmission'


interface TablePageHandlersProps {
    objectPostHook: () => DataCreateUpdate<any>,
    refreshFunction: () => void,
    tableObjects: any[] | null
}

export const useTablePadeHandlers = ({objectPostHook, refreshFunction, tableObjects}: TablePageHandlersProps) => {
    const [confirmLoading, setConfirmLoading] = useState(false)
    const [openModal, setOpenModal] = useState(false)
    const [searchText, setSearchText] = useState('')

    const [form] = Form.useForm()
    const { submitData } = objectPostHook()

    let filteredObjectsArray = tableObjects?.filter((object) => {
        return Object.values(object).some((value) => {
          if (value === null || value === undefined) {
            return false
          }
          if (typeof(value) === 'boolean') {
            if (searchText === 'yes') {
              return value
            }
            else if (searchText === 'no') {
              return !value
            }
            return false
          }
          if (value === null || value === undefined) {
            return false
          }
          if (Object.hasOwn(value, 'name')) {
              return (value as any).name.toString().toLowerCase().includes(searchText.toLowerCase())
          }
          return value.toString().toLowerCase().includes(searchText.toLowerCase())
        })
      })

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
        }
        catch(error) {
        console.log(error)
        }
    }

    const showModal = () => {
      setOpenModal(true)
    }
    //#endregion

    //#region SEARCH BAR
    const handleSearch = (value:string) => {
        setSearchText(value)
    }
    //#endregion

    return {
      closeObjectModal,
      confirmLoading,
      filteredObjectsArray,
      form,
      handleModalOk,
      handleSearch,
      onFormSubmit,
      openModal,
      showModal
    }
}