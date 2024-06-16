import { Form } from 'antd'
import { AxiosResponse } from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { handleFormSubmission } from '../../utils/forms/formSubmission'
import { usePutObject } from '../../utils/hooks/generalHooks'


interface DetailsPageHandlersProps {
    detailsPageObject: any,
    objectDeleteHook: (objectId: number, objectName: string, objectTypeName: string) => Promise<AxiosResponse<any, any> | undefined>,
    objectTypeName: string,
    returnPage: string
}

export const useDetailPageHandlers = ({detailsPageObject, objectDeleteHook, objectTypeName, returnPage}: DetailsPageHandlersProps) => {
    const [confirmLoadingDelete, setConfirmLoadingDelete] = useState(false)
    const [confirmLoadingEdit, setConfirmLoadingEdit] = useState(false)
    const [openDelete, setOpenDelete] = useState(false)
    const [openEdit, setOpenEdit] = useState(false)

    const [form] = Form.useForm()
    const { submitData } = usePutObject(objectTypeName)
    const navigate = useNavigate()

    //#region HANDLERS DELETE
    const closeObjectDeleteModal = () => {
        setOpenDelete(false)  
    }

    const handleDeleteModalOk = () => {
        try {
            setConfirmLoadingDelete(true)
            objectDeleteHook(detailsPageObject.id, detailsPageObject.name, objectTypeName)
            setOpenDelete(false)

            setTimeout(() => {
                handleGoBack()
            }, 1250)
        }
        catch(error) {
            setConfirmLoadingDelete(false)
            setOpenDelete(true)
            console.log(error)
        }
    }

    const openObjectDeleteModal = () => {
        setOpenDelete(true)
    }
    //#endregion

    //#region HANDLERS EDIT
    const closeObjectEditModal = () => {
        setOpenEdit(false)
    }

    const handleEditModalOk = () => {
        handleFormSubmission(form, onFinishEdit, setConfirmLoadingEdit)
    }

    const onFinishEdit = async (values: any) => {
        try {
            await submitData(values, setConfirmLoadingEdit, setOpenEdit)
            window.location.reload()
        }
        catch(error) {
            console.log(error)
        }
    }

    const openObjectEditModal = () => {
        setOpenEdit(true)
    }
    //#endregion

    //#region HANDLERS NAVIGATION
    const handleGoBack = () => {
        navigate(`/${returnPage}`)
    }
    //#endregion

    return {
        closeObjectDeleteModal,
        closeObjectEditModal,
        confirmLoadingDelete,
        confirmLoadingEdit,
        detailsPageObject,
        form,
        handleDeleteModalOk,
        handleEditModalOk,
        handleGoBack,
        onFinishEdit,
        openDelete,
        openEdit,
        openObjectDeleteModal,
        openObjectEditModal
    }
}