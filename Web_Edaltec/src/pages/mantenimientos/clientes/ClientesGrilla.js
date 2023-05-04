import React from 'react'
import {  Button,  Paper , Snackbar } from '@material-ui/core';
import {  Row  } from 'react-bootstrap';
import { DataGrid, esES } from '@material-ui/data-grid'
import {  useDispatch, useSelector } from 'react-redux';
import { editarCliente } from '../../../redux/slice/mantenimientos/clientesSlice';
import EditIcon from '@material-ui/icons/Edit';

import { Alert, AlertTitle } from '@material-ui/lab';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import { useNotificacion } from '../../../hooks/useNotificacion';

export const ClientesGrilla = () => {

    //----usando el hook  redux
  const dispatch = useDispatch();
  const { clientes } = useSelector(state => state.mant_cliente);

      //  //----- notificaciones-----
      const {  notification, openNotification, closeNotification, objNotification, assignNotification } = useNotificacion({
        nombre_usuario_creacion : '',
        fecha_creacion : '',
        nombre_usuario_edicion : '',
        fecha_edicion:  ''
    })

  const columns = [
    { field: 'id', headerName: 'ID', width: 120 },
    { field: 'nombre_Cliente', headerName: 'Razon Social', width: 200 },
    { field: 'ruc_cliente', headerName: 'Ruc', width: 120 },
    { field: 'direccion_cliente', headerName: 'Direccion', width: 450 },
    { field: 'descripcion_estado', headerName: 'Estado', width: 150},
    {
        field: "action",
        headerName: "Acciones",
        sortable: false,
        width: 350,
        renderCell: (params) => {
            const onClick = (e) => {
                e.stopPropagation(); // don't select this row after clicking     
                    handleClick_editar(params.row);
            };        
            const onClickAuditoria = (e) => {
                e.stopPropagation(); // don't select this row after clicking     
                handleClick_Auditoria(params.row);
            }; 

            return (
            <strong>
                <Button
                    variant="contained"
                    startIcon={<EditIcon />}
                    color="primary"
                    size="small"
                    style={{ marginLeft: 16 }}
                    onClick={onClick}
                >
                    Editar
                </Button>
                <Button  startIcon={<LibraryBooksIcon />} style={{color:'white', backgroundColor: '#13b013'}}  variant="contained"   onClick={onClickAuditoria} > Auditoria </Button> 
            </strong>
            )
        }
    },
  ];   

  
  const handleClick_editar = (objEditar)=>{
       dispatch(editarCliente(objEditar))
  }   

  const handleClick_Auditoria = ({nombre_usuario_creacion, fecha_creacion, nombre_usuario_edicion, fecha_edicion })=>{  
    openNotification(true);
    assignNotification({
            nombre_usuario_creacion,
            fecha_creacion,
            nombre_usuario_edicion ,
            fecha_edicion,
    })
}  

  return (
    <Paper className='mt-1'>
        <Row>
            <div style={{ height: 500, width: '100%' }}>
                <DataGrid
                    rows={clientes}
                    columns={columns}
                    pageSize={10}
                    rowsPerPageOptions={[10, 20, 50]}
                    // checkboxSelection
                    onSelectionModelChange={(ids) => {      
                        console.log(ids);
                    }}      
                    localeText={esES.props.MuiDataGrid.localeText}                                        
                    getCellClassName={(params) => {
                        if ( params.value == null)  return '';
                        return params.row.estado === '002' ? 'filaEstadoAnulada' : ''
                    }}    
                />
            </div>
        </Row> 

        <Snackbar open={notification}        
                anchorOrigin={{vertical: 'top', horizontal: 'right'} }   
                autoHideDuration={3000} onClose={closeNotification}>
            <Alert onClose={closeNotification} severity="success">
            <AlertTitle>   Auditoria </AlertTitle>                        
            Usuario Creacion : { objNotification.nombre_usuario_creacion } — <strong> {objNotification.fecha_creacion} </strong> 
                <br></br>       
                <hr/>   
            Usuario Edicion : { objNotification.nombre_usuario_edicion } — <strong> {objNotification.fecha_edicion} </strong> 
            </Alert>                    
        </Snackbar>

    </Paper>
  )
}
