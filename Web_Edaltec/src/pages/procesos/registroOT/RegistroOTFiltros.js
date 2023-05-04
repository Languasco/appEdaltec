import React, { useEffect } from 'react';
import {  Button, FormControl, InputLabel, Select, MenuItem, makeStyles, TextField, Card, CardContent  } from '@material-ui/core' 
import { Col, Row  } from 'react-bootstrap';

import { useDispatch, useSelector } from 'react-redux';
import { useForm } from '../../../hooks/useForm';
import { descargarRegistrosOT, mostrarInformacion, nuevoRegistroOrdenTrabajo } from '../../../redux/slice/procesos/registroOTSlice';
import { mesesGeneral } from '../../../helper/funcionesglobales';

import RefreshIcon from '@material-ui/icons/Refresh';
import AddIcon from '@material-ui/icons/Add';

import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import { useComboBuscador } from '../../../hooks/useComboBuscador';
import { Autocomplete } from '@material-ui/lab';


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

const meses = mesesGeneral();

const formParamsInitial = { 
    cliente : '0', 
    nroOt : '' ,
    tipoTrabajo : '0',
    inspeccionado:'0',

    fechaElect:'1',
    fechaEjecuc:'1',
}

const valorInicialComboBuscadorTipoTrabajo = {id:0 , descripcion:'[-- TODOS --]'};  
const valorInicialComboBuscadorInspeccionado = {id:'0' , descripcion:'[-- TODOS --]'};  

export const RegistroOTFiltros = () => {    
 
    const classes = useStyles();        
    //----usando el hook  redux
    const dispatch = useDispatch();    

    const { clientes, tipoTrabajos, inspeccionados } = useSelector(state => state.proceso_registroOT);   
    const { flag_refrescarData } = useSelector(state => state.refrescarDatos); 

    const [ tipoTrabajoComboBuscador,setTipoTrabajoComboBuscador  ] = useComboBuscador(valorInicialComboBuscadorTipoTrabajo); 
    const [ inspeccionadoComboBuscador,setInspeccionadoComboBuscador  ] = useComboBuscador(valorInicialComboBuscadorInspeccionado); 
 
    const [ formParams_filtro, handleInputChange_filtro, , setFormParams_filtro ] = useForm(formParamsInitial)
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
    
    const handle_changeTipoTrabajo = async (value)=>{ 
        if (value === null) return;
        const {id, descripcion} = value;
    
        setFormParams_filtro({...formParams_filtro, tipoTrabajo : id})
        setTipoTrabajoComboBuscador({id, descripcion});   
     }
   
     const handle_changeInspeccionados = async (value)=>{ 
        if (value === null) return;
        const {id, descripcion} = value;
        setFormParams_filtro({...formParams_filtro, inspeccionado : id})
        setInspeccionadoComboBuscador( {id: id , descripcion: descripcion});   
     }



  return ( 

    <>       
    <Card> 
            <CardContent>
            <div>
                    <p className='titleFormAlternative'> REGISTRO DE ORDENES DE TRABAJO </p>
                </div>
    
                <Row  className='mt-4'>
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
                             <Autocomplete                     
                                options={tipoTrabajos}
                                getOptionLabel={(option) => option.descripcion || ""}
                                value={tipoTrabajoComboBuscador || null}
                                getOptionSelected={(option, value) => option.id === value.id}
                                onChange={(event, newValue) => {
                                    (handle_changeTipoTrabajo(newValue))
                                }}
                                renderInput={params => (
                                    <TextField {...params} label="Tipo Trabajo" placeholder='Busque el Tipo Trabajo' fullWidth />
                                )}
                            />  

                    </Col>

                    <Col  sm={6}  md={6}  lg={3} >
                            <Autocomplete                     
                                options={inspeccionados}
                                getOptionLabel={(option) => option.descripcion || ""}
                                value={inspeccionadoComboBuscador || null}
                                getOptionSelected={(option, value) => option.id === value.id}
                                onChange={(event, newValue) => {
                                    (handle_changeInspeccionados(newValue))
                                }}
                                renderInput={params => (
                                    <TextField {...params} label=" Inspeccionados" placeholder='Busque el Inspeccionado' fullWidth />
                                )}
                            />  
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
                        <Button  startIcon={<RefreshIcon/>}   variant="contained" onClick= { handleClickMostrar } >Mostrar</Button>
                        <Button  startIcon={<AddIcon/>}  variant="contained" color="primary"   onClick={ handleClick_nuevo }> Nuevo </Button> 
                        <Button   startIcon={<CloudDownloadIcon />}  variant="contained" color="secondary"    onClick={ handleClick_descargar }> Descargar </Button> 
                    </Col>
                </Row>        
            </CardContent> 
    </Card>  
    </>
 
  )
}

