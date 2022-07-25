
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Col, Row  } from 'react-bootstrap';
import { makeStyles, Paper, TextField, FormControl, InputLabel, Select, MenuItem, Button} from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';

import { useForm } from '../../../hooks/useForm';
import  './precioCliente.css';
import { verificar_soloNumeros } from '../../../helper/funcionesglobales'; 
import { contratoPorCliente, save, update, validaciones } from '../../../redux/slice/mantenimientos/precioClienteSlice';
import { useComboBuscador } from '../../../hooks/useComboBuscador';
import { Autocomplete } from '@material-ui/lab';

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

  const initialState = {
    id_ClienteTipoReparacion:'0', 
    id_Cliente:'0', 
    id_Contrato:'0', 
    id_TipoReparacion:'0', 
    precio_Cliente:'', 
    id_Estado:'001',
    usuario_creacion  : '0'
}

const valorInicialComboBuscadorTipoReparacion = {id:0 , descripcion:'[--SELECCIONE--]'};   

  export const PrecioClienteRegistroForm = () => {    
 
    const { id : id_usuarioGlobal } = useSelector(state => state.login);  
    const classes = useStyles();  
    //----usando el hook  redux
    const dispatch = useDispatch();     

    //---utilizando datos de reducer----
    const { flag_modoEdicion} = useSelector(state => state.flagEdicion );
    const { objetoEdicion } = useSelector(state => state.objetoEdicion );

    const { clientes,tiposReparacion } = useSelector(state => state.proceso_registroOT);  
    const { contratosCliente } = useSelector(state => state.mant_precioCliente);  

    const [ tipoReparacionComboBuscador, setTipoReparacionComboBuscador  ] = useComboBuscador(valorInicialComboBuscadorTipoReparacion);

    const [ formParams, handleInputChange, , setFormParams ] = useForm(initialState)
    const { id_ClienteTipoReparacion, id_Contrato, id_Cliente, precio_Cliente, id_Estado  } = formParams;
 
    ///---ejecutando una instruccion que va estar pendiente del cambio del estado del activeEvent
    useEffect(() => {
        if (flag_modoEdicion === true) {    
            setTipoReparacionComboBuscador({ id : objetoEdicion.id_TipoReparacion, descripcion : objetoEdicion.nombre_TipoReparacion});
            setFormParams({...objetoEdicion});
        }   
   }, [flag_modoEdicion, objetoEdicion])
   
  const handleSave =async ()=>{
    if (flag_modoEdicion === true) {     ///-- edicion
        
        const valor = await validaciones(formParams, true);
        if (valor === false) return;
         dispatch(update({...formParams , usuario_creacion : id_usuarioGlobal }));

    }else{  /// nuevo

        const valor = await validaciones(formParams, false);
        if (valor === false) return;
        dispatch(save({ ...formParams , usuario_creacion : id_usuarioGlobal} )); 
    }   
  }
  
  const handle_changeCliente = async ({target})=>{ 
    setFormParams({...formParams, id_Cliente : target.value, id_Contrato: '0'})
    await dispatch(contratoPorCliente(target.value)); 
  } 

  const keyPress=(event) =>{
    verificar_soloNumeros(event);
  }

  const handle_changetipoReparacion = async (value)=>{ 

    if (value === null) return
    const {id,descripcion} = value;

    setFormParams({...formParams, id_TipoReparacion : id})
    setTipoReparacionComboBuscador({id,descripcion});
 } 
    
  return (
   
    <Paper elevation={3}   >
        <div className='title-form' >
            <h6>  Datos Generales </h6>                    
        </div> 
        <form className={classes.formControl} noValidate autoComplete="off">
            <Row className='p-2'  >
                <Col lg={ 12 } >

                        <Row>
                            <Col lg={6} >   
                                <TextField  label="Codigo Interno" disabled name="id_ClienteTipoReparacion" value= { id_ClienteTipoReparacion}   onChange={ handleInputChange } />
                            </Col>
                        </Row>  
                        <br/>
                        <Row  >
                            <Col md={12} lg={12}  >   
                                <FormControl variant="outlined" style= {{width:"100%"}} >
                                    <InputLabel id="demo-simple-select-label"> Cliente </InputLabel>
                                    <Select
                                        name="id_Cliente" 
                                        value= { id_Cliente  }  
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
                        </Row> 
                       <br/>
                        <Row  >
                        <Col md={12} lg={12}  >   
                                <FormControl variant="outlined" style= {{width:"100%"}}>
                                            <InputLabel > Contrato </InputLabel>
                                            <Select
                                                name="id_Contrato" 
                                                value= { id_Contrato  }  
                                                onChange={ handleInputChange }   
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
                        </Row> 
                         <br/>
                        <Row  >
                            <Col md={12} lg={12}  >   
                                    {/* <FormControl variant="outlined" style= {{width:"100%"}}>
                                            <InputLabel > Tipo Reparacion </InputLabel>
                                            <Select
                                                name="id_TipoReparacion" 
                                                value= { id_TipoReparacion  }  
                                                onChange={ handleInputChange }   
                                            >
                                            <MenuItem value={0}> SELECCIONE </MenuItem>                
                                            {
                                                tiposReparacion.map((item)=>(
                                                    <MenuItem key={item.id} value={item.id }> {item.descripcion} </MenuItem>
                                                ))
                                            }
                                            </Select>
                                    </FormControl>  */}

                                <Autocomplete                     
                                    options={tiposReparacion}
                                    getOptionLabel={(option) => option.descripcion || ""}
                                    value={tipoReparacionComboBuscador || null}
                                    getOptionSelected={(option, value) => option.id === value.id}
                                    onChange={(event, newValue) => {
                                        (handle_changetipoReparacion(newValue))
                                    }}
                                    renderInput={params => (
                                        <TextField {...params} label="Tipo Reparacion" placeholder='Busque el Tipo Reparacion' fullWidth />
                                    )}
                                /> 

                            </Col>
                        </Row> 
 
                        <Row>
                            <Col sm={6}  lg={6} className='mt-2'   >   
                                <TextField  label="Precio"  inputProps={{ style: {textAlign: 'right'} }}   name="precio_Cliente" value= { precio_Cliente}   onKeyPress= {(e) => keyPress(e)} onChange={ handleInputChange } />
                            </Col>
                        </Row>   

                        <br></br>
                        <Row  >
                        <Col md={8} lg={8}  >    
                                <FormControl variant="outlined"  style= {{width:"100%"}} >
                                    <InputLabel> Estado </InputLabel>
                                    <Select
                                        labelId="id_Estado"
                                        name="id_Estado" 
                                        value= { id_Estado  }  
                                        onChange={ handleInputChange }   
                                    >
                                        <MenuItem value={'001'}> ACTIVO </MenuItem>
                                        <MenuItem value={'002'}> INACTIVO </MenuItem>
                                    </Select>
                                </FormControl>
                            </Col>
                        </Row>    
                        <hr/>
                        <Row>
                            <Col lg={12} >   
                                <div className="text-center">
                                    <Button  variant="contained" color="primary"    startIcon={<SaveIcon />}  onClick={ handleSave }> Guardar</Button> 
                            </div>
                            </Col>
                        </Row>  
                </Col>  
            </Row>    
        </form>
    </Paper> 




  )
}
