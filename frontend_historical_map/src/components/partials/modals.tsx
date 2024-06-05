import { Modal } from 'antd'
import React, { ReactElement } from 'react'

import { entitiesDictionary } from './notifications'
import { capitaliseWord } from '../utils/display/displayStrings'


interface DeleteModalProps {
    confirmLoadingDelete: any,
    closeObjectDeleteModal: any,
    handleDeleteModalOk: any,
    objectName: string,
    openDelete: any
}

interface FormModalProps {
    confirmLoadingEdit: any,
    formComponent: ReactElement,
    closeObjectEditModal: any,
    handleEditModalOk: any,
    objectName: string,
    openEdit: any
}


const DeleteModal: React.FC<DeleteModalProps> = ({closeObjectDeleteModal, confirmLoadingDelete, handleDeleteModalOk, objectName, openDelete}) => (
    <Modal
        confirmLoading={confirmLoadingDelete}
        okButtonProps={{danger:true}}
        okText='Delete'
        onCancel={closeObjectDeleteModal}
        onOk={handleDeleteModalOk}
        open={openDelete}
        title={`Delete ${capitaliseWord(entitiesDictionary[objectName])}`}
    >
        {<h2>Are you sure you want to remove this {`${entitiesDictionary[objectName]}`}?</h2>}
    </Modal>
)

const FormModal: React.FC<FormModalProps> = ({confirmLoadingEdit, formComponent, closeObjectEditModal, handleEditModalOk, objectName, openEdit}) => {
    return (<Modal
        confirmLoading={confirmLoadingEdit}
        okText='Save'
        onCancel={closeObjectEditModal}
        onOk={handleEditModalOk}
        open={openEdit}
        title={`Edit ${capitaliseWord(entitiesDictionary[objectName])}`}
    >
        {formComponent}
    </Modal>)
}

export {
    DeleteModal, FormModal
}