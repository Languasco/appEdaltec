import React from 'react'
import {  Button,  Paper  } from '@material-ui/core';
import {  Row  } from 'react-bootstrap';
import { DataGrid, esES } from '@material-ui/data-grid'
import {  useDispatch, useSelector } from 'react-redux';
import { editarCliente } from '../../../redux/slice/mantenimientos/clientesSlice';
 

export const ClientesGrilla = () => {

    //----usando el hook  redux
  const dispatch = useDispatch();
  const { clientes } = useSelector(state => state.mant_cliente);

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
       dispatch(editarCliente(objEditar))
  }   

  return (
    <Paper>
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
    </Paper>
  )
}
