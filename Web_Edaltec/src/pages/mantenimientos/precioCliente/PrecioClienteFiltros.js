import React, { useEffect } from 'react';
import {  Button, FormControl, InputLabel, Select, MenuItem, makeStyles, TextField } from '@material-ui/core' 
import { Col, Row  } from 'react-bootstrap';
 
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from '../../../hooks/useForm';

import {Card, CardContent} from '@material-ui/core';
import { Swal_alert } from '../../../helper/alertas';
import { contratoPorCliente, mostrarInformacion, nuevo } from '../../../redux/slice/mantenimientos/precioClienteSlice';


const useStyles = makeStyles((theme) => ({
    root: {
         width: '100%', 
    },
    formControl: {
        margin: theme.spacing(1.5),
        width: '95%',
        minWidth: 180,
    },
  }));

export const PrecioClienteFiltros = () => {
   
    const classes = useStyles();        
    //----usando el hook  redux
    const dispatch = useDispatch();       
 
    const { flag_refrescarData } = useSelector(state => state.refrescarDatos);     
    const { clientes,tiposReparacion } = useSelector(state => state.proceso_registroOT);  
    const { contratosCliente } = useSelector(state => state.mant_precioCliente);  
    
    const [ formParams_filtro, handleInputChange_filtro, , setFormParams ] = useForm({ cliente : '0' ,  contrato: '0', tipoReparacion : '0' ,nroOT : '',  estado : '001' })
    const { cliente, contrato, tipoReparacion,nroOT, estado  } = formParams_filtro;

    const handleClickMostrar = ()=>{
        if (cliente === 0 || cliente === '0') {
            Swal_alert('error','Por favor seleccione el Cliente');
            return false;
        } 
        if (contrato === 0 || contrato === '0') {
          Swal_alert('error','Por favor seleccione el Contrato');
          return false;
        } 
    
        if (tipoReparacion === 0 || tipoReparacion === '0') {
          Swal_alert('error','Por favor seleccione el Tipo de Reparacion');
          return false;
        }         
       dispatch(mostrarInformacion(  cliente, contrato, tipoReparacion, nroOT , estado , false )) 
    }   
    const handleClick_nuevo= ()=>{          
        dispatch(nuevo())
    }

    const handle_changeCliente = async ({target})=>{ 
        setFormParams({...formParams_filtro, cliente : target.value, contrato: '0'})
        await dispatch(contratoPorCliente(target.value)); 
    } 

    useEffect(() => {
        if (flag_refrescarData === true) {

            if (cliente === 0 || cliente === '0') {
                return false;
            } 
            if (contrato === 0 || contrato === '0') {
              return false;
            }         
            if (tipoReparacion === 0 || tipoReparacion === '0') {
              return false;
            }              
            dispatch(mostrarInformacion( cliente, contrato, tipoReparacion, nroOT , estado , true  )) 
        }
  },  [flag_refrescarData, cliente, contrato, tipoReparacion, nroOT ,estado, dispatch]) 
   
  return (    
    <Card> 
        <CardContent>
            <div className='title-form' >
                <h4> Registro de Precio de Reparacion por Cliente </h4>
            </div>
            <hr/>
            <Row  className='mt-4'> 
                <Col sm={6}  md={4} >
                        <FormControl variant="outlined" className={classes.formControl} >
                                <InputLabel id="demo-simple-select-label"> Cliente </InputLabel>
                                <Select
                                    name="cliente" 
                                    value= { cliente  }  
                                    onChange={ (e) => {
                                        handle_changeCliente(e) ;
                                    }}   
                                >
                                    <MenuItem value={0}> SELECCIONE </MenuItem>                
                                    {
                                        clientes.map((item)=>(
                                            <MenuItem key={item.id} value={item.id }> {item.descripcion} </MenuItem>
                                        ))
                                    }
                                </Select>
                            </FormControl>
                </Col>
                <Col sm={6}  md={4} >
                        <FormControl variant="outlined" className={classes.formControl} >
                                    <InputLabel  > Contrato </InputLabel>
                                    <Select
                                        name="contrato" 
                                        value= { contrato  }  
                                        onChange={ handleInputChange_filtro }   
                                    >
                                        <MenuItem value={0}> SELECCIONE </MenuItem>                
                                        {
                                            contratosCliente.map((item)=>(
                                                <MenuItem key={item.id_Contrato} value={item.id_Contrato }> {item.observaciones_Contrato} </MenuItem>
                                            ))
                                        }
                                    </Select>
                        </FormControl> 
                </Col>
                <Col sm={12}    md={4} >
                        <FormControl variant="outlined" className={classes.formControl} >
                                    <InputLabel > Tipo Reparacion </InputLabel>
                                    <Select
                                        name="tipoReparacion" 
                                        value= { tipoReparacion  }  
                                        onChange={ handleInputChange_filtro }   
                                    >
                                    <MenuItem value={0}> SELECCIONE </MenuItem>                
                                    {
                                        tiposReparacion.map((item)=>(
                                            <MenuItem key={item.id} value={item.id }> {item.descripcion} </MenuItem>
                                        ))
                                    }
                                    </Select>
                        </FormControl> 
                </Col>                
            </Row>

            <Row  > 
                <Col sm={6}  md={4}  >
                    <TextField  label="Nro OT"  name="nroOT" value= { nroOT}   onChange={ handleInputChange_filtro } />
                </Col>                
                <Col sm={6}   md={4}  >
                        <FormControl variant="outlined" className={classes.formControl} >
                                            <InputLabel id="estado"> Estado </InputLabel>
                                            <Select
                                                labelId="estado"
                                                name="estado" 
                                                value= { estado  }  
                                                onChange={ handleInputChange_filtro }   
                                            >
                                                <MenuItem value={'000'}> TODOS </MenuItem>
                                                <MenuItem value={'001'}> ACTIVO </MenuItem>
                                                <MenuItem value={'002'}> INACTIVO </MenuItem>
                                            </Select>
                         </FormControl> 
                </Col>
                <Col sm={12}  md={4}  className="text-center"   >
                    <Button variant="contained" onClick= { handleClickMostrar } >Mostrar</Button>
                    <Button  variant="contained" color="primary"   onClick={ handleClick_nuevo }> Nuevo </Button>  
                </Col>
            </Row>       
        </CardContent> 
    </Card>


  )
}
