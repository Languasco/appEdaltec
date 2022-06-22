import React from 'react'
import {  Button,  Paper  } from '@material-ui/core';
import {  Row  } from 'react-bootstrap';
import { DataGrid, esES } from '@material-ui/data-grid'
import {  useDispatch, useSelector } from 'react-redux';
 

import EditIcon from '@material-ui/icons/Edit';
 import { editar } from '../../../redux/slice/procesos/programacionOTSlice';


export const ProgramacionOTGrilla = () => {

    //----usando el hook  redux
  const dispatch = useDispatch();
  const { programacionesOtCab } = useSelector(state => state.proceso_programacionOT);  
//   const { id : id_usuarioGlobal } = useSelector(state => state.login);  

  const columns = [

    { field: 'nombre_Cliente', headerName: 'CLIENTE ', width: 300 },
    { field: 'fechaProgramacion', headerName: 'FECHA PROGRAMACION', width: 300 },
    { field: 'jefeCuadrilla', headerName: 'JEFE DE CUADRILLA', width: 350 },
    { field: 'cantidadOrdenes', headerName: 'CANT. ORDENES', width: 250 ,  align: "right"},
    {
        field: "action",
        headerName: "ACCIONES",
        sortable: false,
        width: 250,
        align: "center",
        renderCell: (params) => {
            const onClick = (e) => {
                e.stopPropagation(); // don't select this row after clicking     
                handleClick_editar(params.row);
            };  
            // const onClickAnular = (e) => {
            //     e.stopPropagation(); // don't select this row after clicking     
            //     handleClick_Anular(params.row)
            // };             

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
                    {/* {
                      params.row.id_Estado !=='002'  &&  <Button  startIcon={<CancelIcon />}  variant="contained" color="secondary"   onClick={onClickAnular}> Anular </Button>  
                    }                      */}
                </strong>                
            )
        }
    },
  ];   
  
  const handleClick_editar = (objEditar)=>{
       dispatch(editar(objEditar))
  }   

//   const handleClick_Anular = ({id_Vehiculo})=>{
//     Swal_Question('Sistemas', 'Esta seguro de anular ?')
//     .then((result)=>{
//       if(result.value){    
//          dispatch(anular(id_Vehiculo, id_usuarioGlobal));
//       }
//     })  
//   }     

  return (
    <Paper>
        <Row>
            <div style={{ height: 500, width: '100%' }}>
                <DataGrid
                    rows={programacionesOtCab}
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
