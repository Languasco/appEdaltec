import React from 'react'
import {  Button,  Paper  } from '@material-ui/core';
import {  Row  } from 'react-bootstrap';
import { DataGrid, esES } from '@material-ui/data-grid'
import {  useDispatch, useSelector } from 'react-redux';
import { anular, editar } from '../../../redux/slice/mantenimientos/vehiculoSlice';

import EditIcon from '@material-ui/icons/Edit';
import CancelIcon from '@material-ui/icons/Cancel';
import { Swal_Question } from '../../../helper/alertas';


export const VehiculoGrilla = () => {

    //----usando el hook  redux
  const dispatch = useDispatch();
  const { vehiculo } = useSelector(state => state.mant_vehiculo);  
  const { id : id_usuarioGlobal } = useSelector(state => state.login);  

  const columns = [
    { field: 'id_Vehiculo', headerName: 'ID', width: 120 },
    { field: 'nroPlaca_Vehiculo', headerName: 'PLACA ', width: 155 },
    { field: 'anio_Vehiculo', headerName: 'ANIO', width: 155 },
    { field: 'modelo_vehiculo', headerName: 'MODELO', width: 300 },

    { field: 'nombre_TipoVehiculo', headerName: 'TIPO', width: 250 },
    { field: 'nombre_Categoria', headerName: 'CATEGORIA', width: 300 },
    { field: 'nombre_Carroceria', headerName: 'CARROCERIA', width: 300 },
    { field: 'descripcion_estado', headerName: 'ESTADO', width: 150},
    {
        field: "action",
        headerName: "ACCIONES",
        sortable: false,
        width: 250,
        renderCell: (params) => {
            const onClick = (e) => {
                e.stopPropagation(); // don't select this row after clicking     
                handleClick_editar(params.row);
            };  
            const onClickAnular = (e) => {
                e.stopPropagation(); // don't select this row after clicking     
                handleClick_Anular(params.row)
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

  return (
    <Paper>
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
    </Paper>
  )
}
