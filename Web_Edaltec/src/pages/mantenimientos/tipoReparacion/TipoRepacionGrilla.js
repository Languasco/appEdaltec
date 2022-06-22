import React from 'react'
import {  Button,  Paper  } from '@material-ui/core';
import {  Row  } from 'react-bootstrap';
import { DataGrid, esES } from '@material-ui/data-grid'
import {  useDispatch, useSelector } from 'react-redux';
import { editar } from '../../../redux/slice/mantenimientos/tipoReparacionSlice';
 
 

export const TipoRepacionGrilla = () => {

    //----usando el hook  redux
  const dispatch = useDispatch();
  const { tiposReparacion } = useSelector(state => state.mant_tipoReparacion);

  const columns = [
    { field: 'id_TipoReparacion', headerName: 'ID', width: 120 },
    { field: 'nombre_TipoReparacion', headerName: 'TIPO DE REPARACION ', width: 300 },
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
    </Paper>
  )
}
