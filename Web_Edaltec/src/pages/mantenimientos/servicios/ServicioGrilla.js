import React from 'react'
import {  Button,  Paper  } from '@material-ui/core';
import {  Row  } from 'react-bootstrap';
import { DataGrid, esES } from '@material-ui/data-grid'
import {  useDispatch, useSelector } from 'react-redux';
import { editar } from '../../../redux/slice/mantenimientos/serviciosSlice';

export const ServicioGrilla = () => {

    //----usando el hook  redux
  const dispatch = useDispatch();
  const { servicios } = useSelector(state => state.mant_servicio);


  const columns = [
    { field: 'id_Servicio', headerName: 'ID', width: 120 },
    { field: 'nombre_Servicio', headerName: 'SERVICIO ', width: 300 },
    { field: 'abreviatura_Servicio', headerName: 'ABREVIATURA', width: 200 },
    { field: 'descripcion_estado', headerName: 'ESTADO', width: 150},
    {
        field: "action",
        headerName: "ACCIONES",
        sortable: false,
        width: 150,
        renderCell: (params) => {
            const onClick = (e) => {
            e.stopPropagation(); // don't select this row after clicking     
                handleClick_editar(params.row);
            };        
            return (
            <strong>
                <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    style={{ marginLeft: 16 }}
                    onClick={onClick}
                >
                    Editar
                </Button>
            </strong>
            )
        }
    },
  ];   

  
  const handleClick_editar = (objEditar)=>{
       dispatch(editar(objEditar))
  }   

  return (
    <Paper>
        <Row>
            <div style={{ height: 500, width: '100%' }}>
                <DataGrid
                    rows={servicios}
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
