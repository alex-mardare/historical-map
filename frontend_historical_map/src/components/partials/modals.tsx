import { Button, Modal } from 'antd'
import React, { ReactElement } from 'react'

import { entitiesDictionary } from './notifications'
import { capitaliseWord } from '../utils/display/displayStrings'


interface DeleteModalProps {
    confirmLoadingDelete: any,
    closeObjectDeleteModal: any,
    handleDeleteModalOk: any,
    isLoadingDeleteButton: boolean,
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


const DeleteModal: React.FC<DeleteModalProps> = ({closeObjectDeleteModal, confirmLoadingDelete, handleDeleteModalOk, isLoadingDeleteButton, objectName, openDelete}) => (
    <Modal
        confirmLoading={confirmLoadingDelete}
        footer={[
            <Button key='cancel' onClick={closeObjectDeleteModal}>Cancel</Button>,
            <Button danger loading={isLoadingDeleteButton} key='delete' onClick={handleDeleteModalOk} type='primary'>Delete</Button>
        ]}
        onCancel={closeObjectDeleteModal}
        onOk={handleDeleteModalOk}
        open={openDelete}
        title={`Delete ${capitaliseWord(entitiesDictionary[objectName])}`}
    >
        {<h2>Are you sure you want to remove this {`${entitiesDictionary[objectName]}`}?</h2>}
    </Modal>
)

const FormModal: React.FC<FormModalProps> = ({confirmLoading, formComponent, closeObjectModal, handleModalOk, modalTitle, objectName, openModal}) => (
    <Modal
        confirmLoading={confirmLoading}
        okText='Save'
        onCancel={closeObjectModal}
        onOk={handleModalOk}
        open={openModal}
        title={`${modalTitle + ' ' + capitaliseWord(entitiesDictionary[objectName])}`}
    >
        {formComponent}
    </Modal>
)

export { DeleteModal, FormModal }