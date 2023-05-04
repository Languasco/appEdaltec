import React, { memo } from 'react';
import {  Button, Fab, TextField } from '@material-ui/core' 
import { Col, Row, Table  } from 'react-bootstrap';
import { MiButton } from '../../../components/shared/controls/MiButton';
import Tooltip from '@material-ui/core/Tooltip';

import SaveIcon from '@material-ui/icons/Save';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import EditIcon from '@material-ui/icons/Edit';
import AddCircleIcon from '@material-ui/icons/AddCircle';

import { useDispatch, useSelector } from 'react-redux';
import { agregar_ocurrencia, descargarOcurrencias } from '../../../redux/slice/procesos/registroOTSlice';
import { Swal_alert } from '../../../helper/alertas'; 
import {Card, CardContent} from '@material-ui/core';
import { useForm } from '../../../hooks/useForm';

export const OcurrenciasOT = memo(() => {

   //----usando el hook  redux
    const dispatch = useDispatch();  

    const { id : id_usuarioGlobal } = useSelector(state => state.login);    

    const { ocurrencias, id_OrdenTrabajo_Global } = useSelector(state => state.proceso_registroOT);    
    //const { idOcurrencia, ocurrencia } = formParamsOcurrencia;

    const [ formParams, setFormParamsInput ,  , assign] = useForm({ idOcurrencia : '0' , ocurrencia : ''})
    const { idOcurrencia, ocurrencia  } = formParams;
 
    // const handleInputChange = ({ target }) => {
    //     dispatch(set_formParamsOcurrenciaInicial ({
    //             ...formParamsOcurrencia, ocurrencia : target.value
    //         }                 
    //     ))
    // }   

    const handleClickAgregar = ()=>{
        if (ocurrencia === '') {
            Swal_alert('error','Por favor ingrese una Ocurrencia primero..');
            return;
        }
         dispatch(agregar_ocurrencia(id_OrdenTrabajo_Global, idOcurrencia , ocurrencia, id_usuarioGlobal)) 
    }   

    const handleClickEditar = ({ id_OrdenTrabajo_Ocurrencia, descripcion_Ocurrencia })=>{ 
        // dispatch(set_formParamsOcurrenciaInicial ({
        //          idOcurrencia : id_OrdenTrabajo_Ocurrencia , ocurrencia : descripcion_Ocurrencia
        //     }                 
        // ))
        assign({ idOcurrencia : id_OrdenTrabajo_Ocurrencia , ocurrencia : descripcion_Ocurrencia });
    }   

    const handleClick_nuevo= ()=>{          
           ///---limpiando -----
        //    dispatch(set_formParamsOcurrenciaInicial({ idOcurrencia : '0' , ocurrencia : ''}));
        assign({ idOcurrencia : '0' , ocurrencia : '' });
    }

    const handleClick_descargar= ()=>{          
       dispatch(descargarOcurrencias(id_OrdenTrabajo_Global));
    } 

    console.log('me renderice nuevmaente')
  return (    
    <Card> 
        <CardContent>
        <Row>       
             <Col md={12}  lg={12} >
              {/* <TextField   multiline  rows={6} label="Ingrese Ocurrencia" name="ocurrencia"   value= { ocurrencia  }   onChange={ handleInputChange } /> */}
              <TextField   multiline  rows={6} label="Ingrese Ocurrencia" name="ocurrencia"   value= { ocurrencia  }   onChange={ setFormParamsInput } />
          </Col> 
        </Row>
    <div className='centerBotonOcurrencia' >
        <MiButton startIcon={<CloudDownloadIcon />}  variant="contained" color="default" text= '' onClick={ handleClick_descargar }></MiButton> 
        <Tooltip title="Limpiar" placement="top-start">
            <Fab color="secondary" aria-label="add"  size="small" onClick={ handleClick_nuevo } >
                <AddCircleIcon />
            </Fab>
        </Tooltip>
        <MiButton   startIcon={<SaveIcon />}  variant="contained" color="primary"  text= '' onClick={ handleClickAgregar }></MiButton> 
    </div>   

       <div className ="tableFixHead">             
                <Table responsive>
                <thead className="theadTableModal" >
                        <tr>
                            <th className='text-center'> OCURRENCIAS </th> 
                        </tr>
                    </thead>
                    <tbody>
                        {
                            ocurrencias.map((item, index)=>{
                                return <tr key={item.id_OrdenTrabajo_Ocurrencia}>  
                                        <td>  
                                            <div className='centerOcurrencia' >
                                                <TextField   multiline  rows={4}   name="ocurrencia"   value= { item.descripcion_Ocurrencia_formato }    />           
                                                <Tooltip title="Editar Ocurrencia" placement="top-start">
                                                    <Button   startIcon={<EditIcon />}  variant="contained" color="primary"  text= 'Editar' onClick={ ()=> handleClickEditar(item) }> </Button>                                                                            
                                                </Tooltip>  
                                            </div>   
                                        </td>
                                </tr>
                            })
                        } 
                    </tbody>
                </Table>
            </div>
        </CardContent> 
    </Card>
  )
})

