import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { Card, Form, Modal } from "antd"
import React, { useState} from "react"
import { useParams } from "react-router"
import { useNavigate } from "react-router-dom"

//import FiguresModalForm from './FiguresModalForm'
import { HistoricalState } from '../../models/types/historicalState'
import { antCardHeaderHistoricalState } from "../../partials/antdCardHeader"
import { handleFormSubmission } from '../../utils/forms/formSubmission'
import { deleteHistoricalState, useGetHistoricalState } from '../../utils/hooks/historicalStatesHooks'

import '../../../assets/styling/detailsPage.css'


export default function HistoricalStateDetails(){
    const [confirmLoadingDelete, setConfirmLoadingDelete] = useState(false)
    const [confirmLoadingEdit, setConfirmLoadingEdit] = useState(false)
    const [openDelete, setOpenDelete] = useState(false)
    const [openEdit, setOpenEdit] = useState(false)

    const [form] = Form.useForm()
    //const { submitData } = useFigurePut()
    const navigate = useNavigate()
  
    const { historicalStateId } = useParams()
    let historicalState = useGetHistoricalState(historicalStateId)  
  
    //#region DISPLAY FUNCTIONALITY
    const displayTitleSection = (historicalState: HistoricalState | null) => {
      return antCardHeaderHistoricalState(historicalState, handleGoBack)
    }
    //#endregion
  
    //#region HANDLERS PAGE
    const handleGoBack = () => {
      navigate('/historical-states')
    }
    //#endregion
  
    //#region HANDLERS DELETE
    const handleCancelDelete = () => {
      setOpenDelete(false)  
    }
  
    const handleHistoricalStateDelete = () => {
      setOpenDelete(true)
    }
  
    const handleOkDelete = () => {
      try {
        setConfirmLoadingDelete(true)
        const ceva = deleteHistoricalState(historicalState)
        setOpenDelete(false)
        console.log(ceva)

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
    //#endregion
  
    //#region HANDLERS EDIT
    const handleCancelEdit = () => {
      setOpenEdit(false)
    }
  
    const handleFigureEdit = () => {
      setOpenEdit(true)
    }
  
    const handleOkEdit = () => {
      handleFormSubmission(form, onFinishEdit, setConfirmLoadingEdit)
    }
  
    const onFinishEdit = async (values: any) => {
      try {
        //await submitData(values, setConfirmLoadingEdit, setOpenEdit)
        window.location.reload()
      }
      catch(error) {
        console.log(error)
      }
    }
    //#endregion
  
    return(
      <>
        <Card 
          actions={[
            <EditOutlined key='edit' onClick={handleFigureEdit} />,
            <DeleteOutlined key='delete' onClick={handleHistoricalStateDelete} />
          ]} 
          loading={historicalState == null} 
          title={displayTitleSection(historicalState)}
          >
            <p><b>Foundation Date:</b> {historicalState?.dateFrom}</p>
            <p><b>Dissolution Date:</b> {historicalState?.dateTo}</p>
            <p><b>Flag</b></p>
            <img alt={`${'Flag of ' + historicalState?.name}`} className='stateFlag' src={`${historicalState?.flagUrl}`}></img>
        </Card>
        {/*
        <Modal
          confirmLoading={confirmLoadingEdit}
          okText='Save'
          onCancel={handleCancelEdit}
          onOk={handleOkEdit}
          open={openEdit}
          title='Edit Figure'
        >
          <FiguresModalForm figure={figure} form={form} onFinish={onFinishEdit} />
        </Modal>
        */}
        <Modal
          confirmLoading={confirmLoadingDelete}
          okButtonProps={{danger:true}}
          okText='Delete'
          onCancel={handleCancelDelete}
          onOk={handleOkDelete}
          open={openDelete}
          title='Delete Historical State'
        >
          <h2>Are you sure you want to remove this historical state?</h2>
        </Modal>
      </>
    )
}