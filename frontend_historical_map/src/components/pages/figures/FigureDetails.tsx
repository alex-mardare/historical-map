import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Card, Form, Modal } from "antd";
import React, { useState} from "react";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";

import FiguresModalForm from './FiguresModalForm';
import { HistoricalFigure } from "../../models/types/historicalFigure";
import { antCardHeaderFigure } from "../../partials/antdCardHeader";
import { useFetchFigure } from '../../utils/hooks/figuresHooks';

export default function FigureDetails(){
    const [confirmLoadingDelete, setConfirmLoadingDelete] = useState(false);
    const [confirmLoadingEdit, setConfirmLoadingEdit] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);

    const [form] = Form.useForm();
    //const { submitData } = useEventPut();
    const navigate = useNavigate();
  
    const { figureId } = useParams();
    let figure = useFetchFigure(figureId);  
  
    //#region DISPLAY FUNCTIONALITY    
    const displayTitleSection = (figure: HistoricalFigure | null) => {
      return antCardHeaderFigure(figure, handleGoBack);
    }
    //#endregion
  
    //#region HANDLERS PAGE
    const handleGoBack = () => {
      navigate(-1);
    }
    //#endregion
  
  
    //#region HANDLERS DELETE
    const handleCancelDelete = () => {
      setOpenDelete(false);  
    }
  
    const handleEventDelete = () => {
      setOpenDelete(true);
    }
  
    const handleOkDelete = () => {
      try {
        setConfirmLoadingDelete(true);
        //eventDelete(event);
        setOpenDelete(false);
  
        setTimeout(() => {
          handleGoBack();
        }, 1250);
      }
      catch(error) {
        setConfirmLoadingDelete(false);
        setOpenDelete(true);
        console.log(error);
      }
      
    }
    //#endregion
  
    //#region HANDLERS EDIT
    const handleCancelEdit = () => {
      setOpenEdit(false);
    }
  
    const handleEventEdit = () => {
      setOpenEdit(true);
    }
  
    const handleOkEdit = () => {
      setConfirmLoadingEdit(true);
      form.validateFields()
        .then((values) => {
          form.resetFields();
          onFinishEdit(values);
        })
    }
  
    const onFinishEdit = async (values: any) => {
      try {
        //await submitData(values, setConfirmLoadingEdit, setOpenEdit);
        window.location.reload()
      }
      catch(error) {
        console.log(error);
      }
    }
    //#endregion
  
    return(
      <>
        <Card 
          actions={[
            <EditOutlined key='edit' onClick={handleEventEdit} />,
            <DeleteOutlined key='delete' onClick={handleEventDelete} />
          ]} 
          loading={figure == null} 
          title={displayTitleSection(figure)}
          >
            <p><b>Birth Date:</b> {figure?.birthDate}</p>
            <p><b>Death Date:</b> {figure?.deathDate}</p>
            <p><b>Birth Present Country:</b> {figure?.birthPresentCountry.name}</p>
            <p><b>Birth Historical State:</b> {figure?.birthHistoricalState.name}</p>
        </Card>
        <Modal
          confirmLoading={confirmLoadingEdit}
          okText='Save'
          onCancel={handleCancelEdit}
          onOk={handleOkEdit}
          open={openEdit}
          title='Edit Figure'
        >
          <FiguresModalForm figure={null} form={form} onFinish={onFinishEdit} />
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