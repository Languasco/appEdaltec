import React from 'react'
import {  Button,  Paper, Snackbar  } from '@material-ui/core';
import {  Row  } from 'react-bootstrap';
import { DataGrid, esES } from '@material-ui/data-grid'
import {  useDispatch, useSelector } from 'react-redux';
import { anular, editar } from '../../../redux/slice/mantenimientos/vehiculoSlice';

import EditIcon from '@material-ui/icons/Edit';
import CancelIcon from '@material-ui/icons/Cancel';
import { Swal_Question } from '../../../helper/alertas';
import { Alert, AlertTitle } from '@material-ui/lab';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import { useNotificacion } from '../../../hooks/useNotificacion';


export const VehiculoGrilla = () => {

    //----usando el hook  redux
  const dispatch = useDispatch();
  const { vehiculo } = useSelector(state => state.mant_vehiculo);  
  const { id : id_usuarioGlobal } = useSelector(state => state.login);  

    //  //----- notificaciones-----
    const {  notification, openNotification, closeNotification, objNotification, assignNotification } = useNotificacion({
        nombre_usuario_creacion : '',
        fecha_creacion : '',
        nombre_usuario_edicion : '',
        fecha_edicion:  ''
    })  

  const columns = [
    { field: 'id_Vehiculo', headerName: 'ID', width: 80 , sortable: false },
    { field: 'nroPlaca_Vehiculo', headerName: 'PLACA ', width: 116 },
    { field: 'anio_Vehiculo', headerName: 'ANIO', width: 108 },
    { field: 'modelo_vehiculo', headerName: 'MODELO', width: 250 },
    { field: 'nombre_TipoVehiculo', headerName: 'TIPO', width: 160 },
    // { field: 'nombre_Categoria', headerName: 'CATEGORIA', width: 160 },
    { field: 'nombre_Carroceria', headerName: 'CARROCERIA', width: 180 },
    { field: 'descripcion_estado', headerName: 'ESTADO', width: 130},
    {
        field: "action",
        headerName: "ACCIONES",
        sortable: false,
        width: 450,
        renderCell: (params) => {
            const onClick = (e) => {
                e.stopPropagation(); // don't select this row after clicking     
                handleClick_editar(params.row);
            };  
            const onClickAnular = (e) => {
                e.stopPropagation(); // don't select this row after clicking     
                handleClick_Anular(params.row)
            };             
            const onClickAuditoria = (e) => {
                e.stopPropagation(); // don't select this row after clicking     
                handleClick_Auditoria(params.row);
            }; 
            return (
                <strong>
                    <Button
                        startIcon={<EditIcon />}
                        variant="contained"
                        color="primary"
                        size="small"
                        style={{ marginLeft: 16 }}
                        onClick={onClick}
                    >
                        Editar
                    </Button>
                    {
                      params.row.id_Estado !=='002'  &&  <Button  startIcon={<CancelIcon />}  variant="contained" color="secondary"   onClick={onClickAnular}> Anular </Button>  
                    }   
                <Button  startIcon={<LibraryBooksIcon />} style={{color:'white', backgroundColor: '#13b013'}}  variant="contained"   onClick={onClickAuditoria} > Auditoria </Button>   

                </strong>                
            )
        }
    },
  ];   
  
  const handleClick_editar = (objEditar)=>{
       dispatch(editar(objEditar))
  }   

  const handleClick_Anular = ({id_Vehiculo})=>{
    Swal_Question('Sistemas', 'Esta seguro de anular ?')
    .then((result)=>{
      if(result.value){    
         dispatch(anular(id_Vehiculo, id_usuarioGlobal));
      }
    })  
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
                    rows={vehiculo}
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
