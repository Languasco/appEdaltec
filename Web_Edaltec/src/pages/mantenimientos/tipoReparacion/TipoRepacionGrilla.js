import React from 'react'
import {  Button,  Paper, Snackbar  } from '@material-ui/core';
import {  Row  } from 'react-bootstrap';
import { DataGrid, esES } from '@material-ui/data-grid'
import {  useDispatch, useSelector } from 'react-redux';
import { editar } from '../../../redux/slice/mantenimientos/tipoReparacionSlice';
import EditIcon from '@material-ui/icons/Edit';
 
import { Alert, AlertTitle } from '@material-ui/lab';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import { useNotificacion } from '../../../hooks/useNotificacion';

export const TipoRepacionGrilla = () => {

    //----usando el hook  redux
  const dispatch = useDispatch();
  const { tiposReparacion } = useSelector(state => state.mant_tipoReparacion);

    //  //----- notificaciones-----
    const {  notification, openNotification, closeNotification, objNotification, assignNotification } = useNotificacion({
        nombre_usuario_creacion : '',
        fecha_creacion : '',
        nombre_usuario_edicion : '',
        fecha_edicion:  ''
    })



  const columns = [
    { field: 'id_TipoReparacion', headerName: 'ID', width: 120 },
    { field: 'nombre_TipoReparacion', headerName: 'TIPO DE REPARACION ', width: 300 },
    { field: 'descripcion_estado', headerName: 'ESTADO', width: 150},
    {
        field: "action",
        headerName: "ACCIONES",
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
       dispatch(editar(objEditar))
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
            <div style={{ height: 500, width: '80%' }}>
                <DataGrid
                    rows={tiposReparacion}
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
                        return params.row.id_Estado === '002' ? 'filaEstadoAnulada' : ''
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
