import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { Card, Form, Modal } from "antd"
import React, { useState} from "react"
import { useParams } from "react-router"
import { useNavigate } from "react-router-dom"

import FiguresModalForm from './FiguresModalForm'
import { HistoricalFigure } from "../../models/types/historicalFigure"
import { antCardHeaderFigure } from "../../partials/antdCardHeader"
import { handleFormSubmission } from '../../utils/forms/formSubmission'
import { figureDelete, useFigureGet, useFigurePut } from '../../utils/hooks/figuresHooks'

import '../../../assets/styling/detailsPage.css'


export default function FigureDetails(){
    const [confirmLoadingDelete, setConfirmLoadingDelete] = useState(false)
    const [confirmLoadingEdit, setConfirmLoadingEdit] = useState(false)
    const [openDelete, setOpenDelete] = useState(false)
    const [openEdit, setOpenEdit] = useState(false)

    const [form] = Form.useForm()
    const { submitData } = useFigurePut()
    const navigate = useNavigate()
  
    const { figureId } = useParams()
    let figure = useFigureGet(figureId)  
  
    //#region DISPLAY FUNCTIONALITY
    const displayTitleSection = (figure: HistoricalFigure | null) => {
      return antCardHeaderFigure(figure, handleGoBack)
    }

    const displayDeathSection = (figure: HistoricalFigure | null) => {
      if (figure && figure.deathDate) {
        return (
          <>
            <h2>Death</h2>
            <div>
              {figure.deathDate && <p><b>Date:</b> {figure?.deathDate}</p>}
              {figure.deathHistoricalState && <p><b>Historical State:</b> {figure?.deathHistoricalState.name}</p>}
              {figure.deathPresentCountry && <p><b>Present Country:</b> {figure?.deathPresentCountry.name}</p>}
            </div>
          </>
        )
          
      }
    }
    //#endregion
  
    //#region HANDLERS PAGE
    const handleGoBack = () => {
      navigate('/figures')
    }
    //#endregion
  
  
    //#region HANDLERS DELETE
    const handleCancelDelete = () => {
      setOpenDelete(false)  
    }
  
    const handleFigureDelete = () => {
      setOpenDelete(true)
    }
  
    const handleOkDelete = () => {
      try {
        setConfirmLoadingDelete(true)
        figureDelete(figure)
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
        await submitData(values, setConfirmLoadingEdit, setOpenEdit)
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
            <DeleteOutlined key='delete' onClick={handleFigureDelete} />
          ]} 
          loading={figure == null} 
          title={displayTitleSection(figure)}
          >
            <h2>Birth</h2>
            <p><b>Date:</b> {figure?.birthDate}</p>
            <p><b>Historical State:</b> {figure?.birthHistoricalState.name}</p>
            <p><b>Present Country:</b> {figure?.birthPresentCountry.name}</p>
            {displayDeathSection(figure)}
        </Card>
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
        <Modal
          confirmLoading={confirmLoadingDelete}
          okButtonProps={{danger:true}}
          okText='Delete'
          onCancel={handleCancelDelete}
          onOk={handleOkDelete}
          open={openDelete}
          title='Delete Figure'
        >
          <h2>Are you sure you want to remove this historical figure?</h2>
        </Modal>
      </>
    )
}