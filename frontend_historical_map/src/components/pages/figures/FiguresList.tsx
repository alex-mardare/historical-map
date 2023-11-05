import { Button, Form, Input, Modal, Table } from 'antd';
import React, { useState } from 'react';

import FiguresModalForm from './FiguresModalForm';
import { columnsConfig } from '../../config/tables/figuresListColumnsConfig';
import { handleFormSubmission } from '../../utils/forms/formSubmission';
import { useFiguresGet, useFigurePost } from '../../utils/hooks/figuresHooks';


const { Search } = Input;

export default function FiguresList() {
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [searchText, setSearchText] = useState('');

    const { figures, refreshFunction } = useFiguresGet();
    const [form] = Form.useForm();
    const { submitData } = useFigurePost();

    let filteredFigures = figures?.filter((figure) => {
        return Object.values(figure).some((value) => {
            if (value === null || value === undefined) {
                return false;
            }
            if (value.name) {
                return value.name.toString().toLowerCase().includes(searchText.toLowerCase());
            }
            return value.toString().toLowerCase().includes(searchText.toLowerCase());
        })
    });

//#region MODAL
    const handleCancel = () => {
        setOpen(false);
    }

    const handleOk = () => {
        handleFormSubmission(form, onFinish, setConfirmLoading);
    }

    const onFinish = async (values: any) => {
        try {
            await submitData(values, setConfirmLoading, setOpen);
            refreshFunction();
        }
        catch(error) {
            console.log(error);
        }
    }

    const showModal = () => {
        setOpen(true);
    }
//#endregion
    
//#region SEARCH BAR
    const handleSearch = (value:string) => {
        setSearchText(value);
    };
//#endregion

    return(
        <div id='figuresList'>
          <div className='topBar'>
            <Search
                allowClear
                enterButton
                onChange={(e) => handleSearch(e.target.value)} 
                placeholder='Search' 
                style={{ maxWidth: 400, paddingRight: '5px' }}
              />
            <Button onClick={showModal} type='primary'>Create Figure</Button>
            <Modal
              confirmLoading={confirmLoading}
              okText='Create'
              onCancel={handleCancel}
              onOk={handleOk}
              open={open}
              title="Create Historical Figure"
            >
              <FiguresModalForm figure={null} form={form} onFinish={onFinish} />
            </Modal>
          </div>
          <div className='tableContainer'>
            <Table 
                  columns={columnsConfig}
                  dataSource={filteredFigures}
                  pagination={{ hideOnSinglePage:true }}
                  rowKey={(figure) => figure.id}
              />
          </div>
        </div>
    )
}