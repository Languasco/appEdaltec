import React, { useEffect } from 'react';
import {  Button, FormControl, InputLabel, Select, MenuItem, makeStyles, TextField  } from '@material-ui/core' 
import { Col, Row  } from 'react-bootstrap';
import { MiButton } from '../../../components/shared/controls/MiButton';

import { useDispatch, useSelector } from 'react-redux';
import { useForm } from '../../../hooks/useForm';

import { descargarRegistrosOT, mostrarInformacion, nuevoRegistroOrdenTrabajo } from '../../../redux/slice/procesos/registroOTSlice';
import { mesesGeneral } from '../../../helper/funcionesglobales';

import {Card, CardContent} from '@material-ui/core';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';


const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%', 
    },
    formControl: {
      margin : '3px 0px 10px 0px',
      width: '95%',
      minWidth: 200,
    },
    botonPersonalizado : {
        backgroundColor : 'orange'
    }
  }));

const meses = mesesGeneral()

export const RegistroOTFiltros = () => {    
 
    const classes = useStyles();        
    //----usando el hook  redux
    const dispatch = useDispatch();    

    const { clientes, tipoTrabajos, inspeccionados } = useSelector(state => state.proceso_registroOT);   
    const { flag_refrescarData } = useSelector(state => state.refrescarDatos); 

    const formParamsInitial = { 
        cliente : '0', 
        nroOt : '' ,
        tipoTrabajo : '0',
        inspeccionado:'0',

        fechaElect:'1',
        fechaEjecuc:'1',
    }

    const [ formParams_filtro, handleInputChange_filtro ] = useForm(formParamsInitial)
    const { cliente, nroOt , tipoTrabajo, inspeccionado, fechaElect, fechaEjecuc } = formParams_filtro;

    const handleClickMostrar = ()=>{
      dispatch(mostrarInformacion(  cliente, nroOt , tipoTrabajo, inspeccionado, fechaElect, fechaEjecuc )) 
    }   

    const handleClick_nuevo= ()=>{    
        dispatch(nuevoRegistroOrdenTrabajo());
    }

    useEffect(() => {
        if (flag_refrescarData === true) {
            dispatch(mostrarInformacion(  cliente, nroOt , tipoTrabajo, inspeccionado, fechaElect, fechaEjecuc )) 
        }
  },  [flag_refrescarData,dispatch, cliente, nroOt , tipoTrabajo, inspeccionado, fechaElect, fechaEjecuc ])

  
    const handleClick_descargar= ()=>{          
        dispatch(descargarRegistrosOT( cliente, nroOt , tipoTrabajo, inspeccionado, fechaElect, fechaEjecuc));
    } 

   
  return ( 

    <>          <div className='titleFormAlternative'>
                    <p> REGISTRO DE ORDENES DE TRABAJO </p>
                </div>

   
                <Row  >
                <Col  sm={6}  md={4}  lg={3} >
                    <FormControl variant="outlined" className={classes.formControl} >
                        <InputLabel id="demo-simple-select-label"> Cliente </InputLabel>
                        <Select
                            name="cliente" 
                            value= { cliente  }  
                            onChange={ handleInputChange_filtro }   
                        >
                            <MenuItem value={0}> Todos </MenuItem>                
                            {
                                clientes.map((item)=>(
                                    <MenuItem key={item.id} value={item.id }> {item.descripcion} </MenuItem>
                                ))
                            }
                        </Select>
                    </FormControl>
                </Col>
                
                <Col  sm={6}  md={4}  lg={3} className='mb-3' >
                    <TextField label="Nro OT" name="nroOt"   value= { nroOt  }   onChange={ handleInputChange_filtro } />
                </Col>

                <Col  sm={6}  md={4}  lg={3} >
                    <FormControl variant="outlined" className={classes.formControl} >
                        <InputLabel > Tipo Trabajo </InputLabel>
                        <Select
                            name="tipoTrabajo" 
                            value= { tipoTrabajo  }  
                            onChange={ handleInputChange_filtro }   
                        >
                            <MenuItem value={0}> Todos </MenuItem>                
                            {
                                tipoTrabajos.map((item)=>(
                                    <MenuItem key={item.id} value={item.id }> {item.descripcion} </MenuItem>
                                ))
                            }
                        </Select>
                    </FormControl>
                </Col>

                <Col  sm={6}  md={6}  lg={3} >
                    <FormControl variant="outlined" className={classes.formControl} >
                        <InputLabel > Inspeccionado </InputLabel>
                        <Select
                            name="inspeccionado" 
                            value= { inspeccionado  }  
                            onChange={ handleInputChange_filtro }   
                        >
                            <MenuItem value={0}> Todos </MenuItem>                
                            {
                                inspeccionados.map((item)=>(
                                    <MenuItem key={item.id_estado} value={item.id_estado }> {item.descripcion_estado} </MenuItem>
                                ))
                            }
                        </Select>
                    </FormControl>
                </Col>
            </Row>

            <Row className='mb-0'>
                <Col xs={6} md={3}  lg={3} >
                        <FormControl variant="outlined" className={classes.formControl} >
                            <InputLabel > Fecha Electrica </InputLabel>
                            <Select
                                name="fechaElect" 
                                value= { fechaElect  }  
                                onChange={ handleInputChange_filtro }   
                            >
                                {
                                    meses.map((item)=>(
                                        <MenuItem key={item.mes} value={item.mes }> {item.valor} </MenuItem>
                                    ))
                                }
                            </Select>
                        </FormControl>
                </Col>
                <Col  xs={6} md={3}  lg={3} >
                        <FormControl variant="outlined" className={classes.formControl} >
                            <InputLabel id="fechaEjecuc"> Fecha Ejecucion </InputLabel>
                            <Select
                                labelId="idEstado"
                                name="fechaEjecuc" 
                                value= { fechaEjecuc  }  
                                onChange={ handleInputChange_filtro }   
                            >
                            {
                                meses.map((item)=>(
                                    <MenuItem key={item.mes} value={item.mes }> {item.valor} </MenuItem>
                                ))
                            }
                            </Select>
                        </FormControl>
                </Col>

                <Col xs={12} md={6} lg={4} className="text-center"   >
                    <Button variant="contained" color="primary" onClick= { handleClickMostrar } >Mostrar</Button>
                    <Button  variant="contained" color="secondary"    onClick={ handleClick_nuevo }> Nuevo </Button> 
                    <MiButton   startIcon={<CloudDownloadIcon />}  variant="contained" color="default" text="Descargar"  onClick={ handleClick_descargar }> </MiButton> 
                </Col>
            </Row>  
  
    </>

    // <Card> 
    //     <div className='title-form' >
    //         <h4>  Registro Ordenes de Trabajo </h4>
    //     </div>
    //     <CardContent  > 
    //         <Row  >
    //             <Col  sm={6}  md={3}  lg={3} >
    //                 <FormControl variant="outlined" className={classes.formControl} >
    //                     <InputLabel id="demo-simple-select-label"> Cliente </InputLabel>
    //                     <Select
    //                         name="cliente" 
    //                         value= { cliente  }  
    //                         onChange={ handleInputChange_filtro }   
    //                     >
    //                         <MenuItem value={0}> Todos </MenuItem>                
    //                         {
    //                             clientes.map((item)=>(
    //                                 <MenuItem key={item.id} value={item.id }> {item.descripcion} </MenuItem>
    //                             ))
    //                         }
    //                     </Select>
    //                 </FormControl>
    //             </Col>
                
    //             <Col  sm={6}  md={3}  lg={3} >
    //                 <TextField label="Nro OT" name="nroOt"   value= { nroOt  }   onChange={ handleInputChange_filtro } />
    //             </Col>

    //             <Col  sm={6}  md={3}  lg={3} >
    //                 <FormControl variant="outlined" className={classes.formControl} >
    //                     <InputLabel > Tipo Trabajo </InputLabel>
    //                     <Select
    //                         name="tipoTrabajo" 
    //                         value= { tipoTrabajo  }  
    //                         onChange={ handleInputChange_filtro }   
    //                     >
    //                         <MenuItem value={0}> Todos </MenuItem>                
    //                         {
    //                             tipoTrabajos.map((item)=>(
    //                                 <MenuItem key={item.id} value={item.id }> {item.descripcion} </MenuItem>
    //                             ))
    //                         }
    //                     </Select>
    //                 </FormControl>
    //             </Col>

    //             <Col  sm={6}  md={3}  lg={3} >
    //                 <FormControl variant="outlined" className={classes.formControl} >
    //                     <InputLabel > Inspeccionado </InputLabel>
    //                     <Select
    //                         name="inspeccionado" 
    //                         value= { inspeccionado  }  
    //                         onChange={ handleInputChange_filtro }   
    //                     >
    //                         <MenuItem value={0}> Todos </MenuItem>                
    //                         {
    //                             inspeccionados.map((item)=>(
    //                                 <MenuItem key={item.id_estado} value={item.id_estado }> {item.descripcion_estado} </MenuItem>
    //                             ))
    //                         }
    //                     </Select>
    //                 </FormControl>
    //             </Col>
    //         </Row>

    //         <Row className='mb-0'>
    //             <Col md={3}  lg={3} >
    //                     <FormControl variant="outlined" className={classes.formControl} >
    //                         <InputLabel > Fecha Electrica </InputLabel>
    //                         <Select
    //                             name="fechaElect" 
    //                             value= { fechaElect  }  
    //                             onChange={ handleInputChange_filtro }   
    //                         >
    //                             {
    //                                 meses.map((item)=>(
    //                                     <MenuItem key={item.mes} value={item.mes }> {item.valor} </MenuItem>
    //                                 ))
    //                             }
    //                         </Select>
    //                     </FormControl>
    //             </Col>
    //             <Col md={3}  lg={3} >
    //                     <FormControl variant="outlined" className={classes.formControl} >
    //                         <InputLabel id="fechaEjecuc"> Fecha Ejecucion </InputLabel>
    //                         <Select
    //                             labelId="idEstado"
    //                             name="fechaEjecuc" 
    //                             value= { fechaEjecuc  }  
    //                             onChange={ handleInputChange_filtro }   
    //                         >
    //                         {
    //                             meses.map((item)=>(
    //                                 <MenuItem key={item.mes} value={item.mes }> {item.valor} </MenuItem>
    //                             ))
    //                         }
    //                         </Select>
    //                     </FormControl>
    //             </Col>

    //             <Col xs={12} md={6} lg={4} className="text-center"   >
    //                 <Button variant="contained" color="primary" onClick= { handleClickMostrar } >Mostrar</Button>
    //                 <Button  variant="contained" color="secondary"    onClick={ handleClick_nuevo }> Nuevo </Button> 
    //                 <MiButton startIcon={<CloudDownloadIcon />}  variant="contained" color="default" text="Descargar"  onClick={ handleClick_descargar }> </MiButton> 
    //             </Col>
    //         </Row>        
    //     </CardContent> 
    // </Card>
  )
}

