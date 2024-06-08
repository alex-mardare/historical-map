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
    confirmLoading: any,
    formComponent: ReactElement,
    closeObjectModal: any,
    handleModalOk: any,
    modalTitle: string,
    objectName: string,
    openModal: any
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

const FormModal: React.FC<FormModalProps> = ({confirmLoading, formComponent, closeObjectModal, handleModalOk, modalTitle, objectName, openModal}) => {
    return (<Modal
        confirmLoading={confirmLoading}
        okText='Save'
        onCancel={closeObjectModal}
        onOk={handleModalOk}
        open={openModal}
        title={`${modalTitle + ' ' + capitaliseWord(entitiesDictionary[objectName])}`}
    >
        {formComponent}
    </Modal>)
}

export { DeleteModal, FormModal }