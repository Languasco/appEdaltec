import React, { useState } from 'react'
import {  Button,  Paper, Tooltip  } from '@material-ui/core';
import {  Row  } from 'react-bootstrap';
import { DataGrid, esES } from '@material-ui/data-grid'
import {  useDispatch, useSelector } from 'react-redux'; 

import EditIcon from '@material-ui/icons/Edit';
 import { editar, nuevo } from '../../../redux/slice/procesos/programacionOTSlice';
 import AddCircleIcon from '@material-ui/icons/AddCircle';
import { Swal_alert } from '../../../helper/alertas';

import MiModal from '../../../components/shared/controls/MiModal';
import { ProgramacionOTRegistroForm } from './ProgramacionOTRegistroForm';

export const ProgramacionOTGrilla = () => {

    //----usando el hook  redux
  const dispatch = useDispatch();
  const { programacionesOtCab, tipoProceso } = useSelector(state => state.proceso_programacionOT);  
  const { showModal } = useSelector(state => state.modal);  

  const [idProgramacionMasivo, set_IdProgramacionMasivo] = useState([]); 
 
  const estructuraTablaInformacion = ()=>{
    if (Number(tipoProceso) === 1){
        return  [
            // { field: 'id', headerName: '#', width: 120 },
            { field: 'area', headerName: 'AREA ', width: 300 },
            { field: 'numeroOrden', headerName: 'NRO ORDEN ', width: 150},
            { field: 'cliente', headerName: 'CLIENTE', width: 200},
            { field: 'sed', headerName: 'SED', width: 100},
            { field: 'distrito', headerName: 'DISTRITO', width: 200},
            { field: 'direccion', headerName: 'DIRECCION', width: 200},
            { field: 'jefeCuadrilla', headerName: 'JEFE CUADRILLA ', width: 200},
            { field: 'fechaProgramacion', headerName: 'FECHA ASIGNACION', width: 150},
            {
            field: "action",
            headerName: "ACCIONES",
            sortable: false,
            width: 200,
            align: "center",
            renderCell: (params) => {
                const onClick = (e) => {
                    e.stopPropagation(); // don't select this row after clicking     
                    handleClick_editar(params.row);
                };  
                 return (
                    <>
                        <Button
                            startIcon={<EditIcon />}
                            variant="contained"
                            color="primary"
                            size="small"
                            style={{ marginLeft: 16 }}
                            onClick={onClick}
                        >
                            Re-asignar
                        </Button>
                    </>                
                )
            }
            } 
          ];
    }else{
       return [
        { field: 'id', headerName: '#', width: 120 },
        { field: 'cliente', headerName: 'CLIENTE ', width: 300 },
        { field: 'fechaProgramacion', headerName: 'FECHA PROGRAMACION', width: 300},
        { field: 'jefeCuadrilla', headerName: 'COORDINADOR', width: 300},
        { field: 'nroOrden', headerName: ' NRO ORDEN', width: 130 , align: "right",},
      ]
    }

  }

 const columns = estructuraTablaInformacion();
  
  const handleClick_editar = (objEditar)=>{
     dispatch(editar(objEditar))
  }   

  const handleClick_asignarOrden = ()=>{
    
    if (idProgramacionMasivo.length === 0) {
        Swal_alert('error','Por favor marque al menos un item...');
        return
    }
    dispatch(nuevo(idProgramacionMasivo))
  }   

  return (
    <Paper className='mt-1'>
        <Row>
                {tipoProceso === 1 
                 ?
                   <>
                    <div className='p-2'>
                        <Tooltip title="Asignar Orden Trabajo " placement="top-start">
                            <Button  startIcon={<AddCircleIcon/>}  variant="contained" color="secondary"   onClick={ handleClick_asignarOrden }> Asignar </Button> 
                        </Tooltip>
                    </div>
                    <div style={{ height: 500, width: '100%' }}>
                        <DataGrid
                            rows={programacionesOtCab}
                            columns={columns}
                            pageSize={10}
                            rowsPerPageOptions={[10, 20, 50]}
                            checkboxSelection
                            // onSelectionModelChange={(ids) => {      
                            //     console.log(ids);
                            // }}    
                            onSelectionModelChange={(ids) => {                          
                                const selectedIDs = new Set(ids);
                                const selectedRows = programacionesOtCab.filter((row) =>
                                                        selectedIDs.has(row.id),
                                                    ).map(p=> p.id_OrdenTrabajo );
                                                    
                                set_IdProgramacionMasivo(selectedRows);
                            }}

                            localeText={esES.props.MuiDataGrid.localeText}                                        
                            getCellClassName={(params) => {
                                if ( params.value == null)  return '';
                                return params.row.id_Estado === '002' ? 'filaEstadoAnulada' : ''
                            }}    
                        />
                    </div>
                   </>

                 :
                    <div style={{ height: 500, width: '100%' }}>
                        <DataGrid
                            rows={programacionesOtCab}
                            columns={columns}
                            pageSize={10}
                            rowsPerPageOptions={[10, 20, 50]}   
                            localeText={esES.props.MuiDataGrid.localeText}                                        
                            getCellClassName={(params) => {
                                if ( params.value == null)  return '';
                                return params.row.id_Estado === '002' ? 'filaEstadoAnulada' : ''
                            }}    
                        />
                    </div>
                }      
        </Row> 
            {
                showModal &&   
                <MiModal fullWidth = {true} maxWidth = 'sm'> 
                    <ProgramacionOTRegistroForm /> 
                </MiModal>
            }  
    </Paper>
  )
}
