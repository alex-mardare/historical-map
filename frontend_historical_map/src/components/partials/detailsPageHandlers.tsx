import { Form } from 'antd'
import { AxiosResponse } from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { DataCreateUpdate } from "../models/types/hooksDataTypes"
import { handleFormSubmission } from '../utils/forms/formSubmission'


interface DetailsPageHandlersProps {
    detailsPageObject: any,
    objectDeleteHook: (object: any) => Promise<AxiosResponse<any, any> | undefined>,
    objectPutHook: () => DataCreateUpdate<any>,
    returnPage: string
}

export const useDetailPageHandlers = ({detailsPageObject, objectDeleteHook, objectPutHook, returnPage}: DetailsPageHandlersProps) => {
    const [confirmLoadingDelete, setConfirmLoadingDelete] = useState(false)
    const [confirmLoadingEdit, setConfirmLoadingEdit] = useState(false)
    const [openDelete, setOpenDelete] = useState(false)
    const [openEdit, setOpenEdit] = useState(false)

    const [form] = Form.useForm()
    const { submitData } = objectPutHook()
    const navigate = useNavigate()

    //#region HANDLERS DELETE
    const closeObjectDeleteModal = () => {
        setOpenDelete(false)  
    }

    const handleDeleteModalOk = () => {
        try {
            setConfirmLoadingDelete(true)
            objectDeleteHook(detailsPageObject)
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