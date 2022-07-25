import React from 'react'
import {  Button } from '@material-ui/core';
import {  Row  } from 'react-bootstrap';
import { DataGrid, esES } from '@material-ui/data-grid'
import { useDispatch, useSelector } from 'react-redux';
import { editarRegistroOrdenTrabajo, inicializarTabs, mostrarPDF_ot, mostrarReporte_ot } from '../../../redux/slice/procesos/registroOTSlice';

import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf';
import EditIcon from '@material-ui/icons/Edit';
import EqualizerIcon from '@material-ui/icons/Equalizer';

import  './registroOT.css';
import CustomColumnMenu from '../../../components/shared/controls/CustomColumnMenu';
 
export const RegistroOTGrilla = () => {
    //----usando el hook  redux 
  const dispatch = useDispatch();
  const { ots_cab } = useSelector(state => state.proceso_registroOT); 

  const columns = [
    { field: 'nroFolio', headerName: 'N° Folio', width:100 ,sortable: false     },
    { field: 'nroOrden', headerName: 'N° Orden', width: 115 },
    { field: 'nroCliente', headerName: 'N° Cliente', width: 118 },
    { field: 'fechaElectrica', headerName: 'Fecha Electrica', width: 110 , sortable: false },
    { field: 'fechaEjecucion', headerName: 'Fecha Ejecucion', width: 115 , sortable: false },
    { field: 'tipoTrabajo', headerName: 'Tipo Trabajo', width: 120 },
    { field: 'fecha', headerName: 'Fecha', width: 100 , sortable: false },
    { field: 'distrito', headerName: 'Distrito', width: 150 ,  },
    { field: 'descripcionEstado', headerName: 'Estado', width: 150 },

    {
        field: "action",
        headerName: "Acciones",
        sortable: false,
        width: 350 ,
        renderCell: (params) => {
            const onClick = (e) => {
                    e.stopPropagation(); // don't select this row after clicking     
                    handleClick_editar(params.row);
            };    
            
            const onClickPDF = (e) => {
                e.stopPropagation(); // don't select this row after clicking     
                handleClick_pdf(params.row);
            };    
        
            const onClickReporte= (e) => {
                e.stopPropagation(); // don't select this row after clicking     
                handleClick_reporte(params.row);
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

                <Button
                    variant="contained"
                    startIcon={<PictureAsPdfIcon />}
                    size="small"
                    style={{ marginLeft: 16 }}
                    onClick={onClickPDF}
                >
                    PDF
                </Button>

                
                <Button
                    variant="contained"
                    startIcon={<EqualizerIcon />}
                    size="small"
                    color="secondary"
                    style={{ marginLeft: 16 }}
                    onClick={onClickReporte}
                >
                    Reporte
                </Button>

            </strong>
            )
        }
    },
  ];    
  
  const handleClick_editar = (objEditar)=>{ 
    dispatch(inicializarTabs());
    setTimeout(()=>{ //  
        dispatch(editarRegistroOrdenTrabajo(objEditar.id_OT));
     },500); 
  }   

  const handleClick_pdf =({id_OT})=>{ 
     dispatch(mostrarPDF_ot(id_OT));
  }  


  const handleClick_reporte = ({id_OT})=>{ 
    dispatch(mostrarReporte_ot(id_OT));
  }  

  return ( 
        <Row className='mt-1'>
            <div style={{ height: 400, width: '100%' }}>
                <DataGrid
                    rows={ots_cab}
                    columns={columns}
                    pageSize={20}
                    rowsPerPageOptions={[10, 20, 50]}
                    // checkboxSelection
                    onSelectionModelChange={(ids) => {      
                        console.log(ids);
                    }}      
                    localeText={esES.props.MuiDataGrid.localeText}   
                    components={{
                        ColumnMenu: CustomColumnMenu
                    }}                                   
                />
            </div>
        </Row> 
 
  )
}
