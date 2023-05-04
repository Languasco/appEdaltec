
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Col, Row  } from 'react-bootstrap';
import { makeStyles, Paper, TextField, FormControl, InputLabel, Select, MenuItem, Button} from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';

import { useForm } from '../../../hooks/useForm';
import  './vehiculo.css';
import { carroceriaTipoVehiculo, categoriaTipoVehiculo, save, update, validaciones } from '../../../redux/slice/mantenimientos/vehiculoSlice';
 

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
    id_Vehiculo:'0',
    id_TipoVehiculo:'0',
    nroPlaca_Vehiculo:'',
    id_Marca:'0',
    modelo_vehiculo:'',
    color_Vehiculo:'',
    nroMotor_Vehiculo:'',
    nroChasis_Vehiculo:'',
    id_Categoria:'0',
    id_Carroceria:'0',
    anio_Vehiculo:'',
    cilidraje_Vehiculo:'',
    kmInicial_Vehiculo:'',
    kmMant_Vehiculo:'',
    dni_Conductor:'0',
    id_Estado:'001',
    usuario_creacion  : '0'
}

  export const VehiculoRegistroForm = () => {    
 
    const { id : id_usuarioGlobal } = useSelector(state => state.login);  
    const classes = useStyles();  
    //----usando el hook  redux
    const dispatch = useDispatch();     

    //---utilizando datos de reducer----
  const { flag_modoEdicion} = useSelector(state => state.flagEdicion );
  const { objetoEdicion } = useSelector(state => state.objetoEdicion ); 
  const { tiposVehiculos, marcasVehiculos, carroceriasVehiculos,dniConductores } = useSelector(state => state.mant_vehiculo);  

  const [ formParams, handleInputChange, , setFormParams ] = useForm(initialState);
  const {
    id_TipoVehiculo, nroPlaca_Vehiculo, id_Marca, modelo_vehiculo, color_Vehiculo, nroMotor_Vehiculo, nroChasis_Vehiculo, id_Carroceria, anio_Vehiculo, cilidraje_Vehiculo, kmInicial_Vehiculo, kmMant_Vehiculo, dni_Conductor, id_Estado 
  } = formParams;

    ///---ejecutando una instruccion que va estar pendiente del cambio del estado del activeEvent
    useEffect(() => {
        if (flag_modoEdicion === true) {    
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

  const handle_changeTipoVehiculo = async ({target})=>{ 
    setFormParams({...formParams, id_TipoVehiculo : target.value, id_Categoria: '0', id_Carroceria: '0'})
    await dispatch(categoriaTipoVehiculo(target.value)); 
  } 
  
  const handle_changeCategoriaVehiculo = async ({target})=>{ 
    setFormParams({...formParams, id_Categoria : target.value, id_Carroceria: '0'})
    await dispatch(carroceriaTipoVehiculo(target.value)); 
  } 
     
  return (
   
    <Paper elevation={3}   >
        <div className='title-form' >
            <h6>  Datos Generales </h6>                    
        </div> 
        <form className={classes.formControl} noValidate autoComplete="off">
            <Row className='p-2' >
                <Col lg={ 12 } >
 
                        <Row >
                            <Col md={6} lg={6}  >   
                                <FormControl variant="outlined" style= {{width:"100%"}} >
                                    <InputLabel id="demo-simple-select-label"> Tipo de Vehiculo </InputLabel>
                                    <Select
                                        name="id_TipoVehiculo" 
                                        value= { id_TipoVehiculo  }  
                                        onChange={ (e) => {
                                            handle_changeTipoVehiculo(e) ;
                                        }}   
                                    >
                                        <MenuItem value={0}> SELECCIONE </MenuItem>                
                                        {
                                            tiposVehiculos.map((item)=>(
                                                <MenuItem key={item.id_TipoVehiculo} value={item.id_TipoVehiculo }> {item.nombre_TipoVehiculo} </MenuItem>
                                            ))
                                        }
                                    </Select>
                                </FormControl>           
                            </Col>
                        </Row> 
 
                        <Row>
                            <Col sm={6} md={6}>   
                                <TextField  label="Placa" inputProps={{ maxLength: 30 }}   name="nroPlaca_Vehiculo" value= { nroPlaca_Vehiculo}  onChange={ handleInputChange } />
                            </Col>
                            <Col sm={3} md={3} >   
                                <TextField  label="Año"    name="anio_Vehiculo" value= { anio_Vehiculo}  onChange={ handleInputChange } />
                            </Col>
                        </Row>   
                        <br/>
                        <Row >
                            <Col md={6} lg={6}  className='mt-2'>   
                                <FormControl variant="outlined" style= {{width:"100%"}} >
                                    <InputLabel id="demo-simple-select-label"> Marca </InputLabel>
                                    <Select
                                        name="id_Marca" 
                                        value= { id_Marca  }  
                                        onChange={ (e) => {
                                            handleInputChange(e) ;
                                        }}   
                                    >
                                        <MenuItem value={0}> SELECCIONE </MenuItem>                
                                        {
                                            marcasVehiculos.map((item)=>(
                                                <MenuItem key={item.id_Marca} value={item.id_Marca }> {item.nombre_Marca} </MenuItem>
                                            ))
                                        }
                                    </Select>
                                </FormControl>           
                            </Col>
                            <Col sm={6}  lg={6}   >   
                                <TextField  label="Modelo" name="modelo_vehiculo" value= { modelo_vehiculo}  onChange={ handleInputChange } />
                            </Col>
                        </Row>  
                        <Row>
                            <Col sm={6}  lg={3}>   
                                <TextField  label="Color" inputProps={{ maxLength: 30 }}   name="color_Vehiculo" value= { color_Vehiculo}  onChange={ handleInputChange } />
                            </Col>
                            <Col sm={6}   lg={3}>   
                                <TextField  label="Cilindraje"    name="cilidraje_Vehiculo" value= { cilidraje_Vehiculo}  onChange={ handleInputChange } />
                            </Col>

                            <Col sm={6}  lg={3}>  
                                <TextField  label="Numero de Motor"  inputProps={{ maxLength: 30 }}  name="nroMotor_Vehiculo" value= { nroMotor_Vehiculo}  onChange={ handleInputChange } />
                            </Col>

                            <Col sm={6}   lg={3}>   
                                <TextField  label="Numero de chásis"  inputProps={{ maxLength: 30 }}  name="nroChasis_Vehiculo" value= { nroChasis_Vehiculo}  onChange={ handleInputChange } />
                            </Col>

                        </Row>  
   
                           <Row >
                            {/* <Col md={6} lg={6}  className='mt-3'>   
                                <FormControl variant="outlined" style= {{width:"100%"}} >
                                    <InputLabel id="demo-simple-select-label"> Categoria </InputLabel>
                                    <Select
                                        name="id_Categoria" 
                                        value= { id_Categoria  }  
                                        onChange={ (e) => {
                                            handle_changeCategoriaVehiculo(e) ;
                                        }}   
                                    >
                                        <MenuItem value={0}> SELECCIONE </MenuItem>                
                                        {
                                            categoriasVehiculos.map((item)=>(
                                                <MenuItem key={item.id_Categoria} value={item.id_Categoria }> {item.nombre_Categoria} </MenuItem>
                                            ))
                                        }
                                    </Select>
                                </FormControl>           
                            </Col> */}
                            <Col md={6} lg={6}  className='mt-3'>   
                                <FormControl variant="outlined" style= {{width:"100%"}} >
                                    <InputLabel id="demo-simple-select-label"> Carroceria </InputLabel>
                                    <Select
                                        name="id_Carroceria" 
                                        value= { id_Carroceria  }  
                                        onChange={ (e) => {
                                            handleInputChange(e) ;
                                        }}   
                                    >
                                        <MenuItem value={0}> SELECCIONE </MenuItem>                
                                        {
                                            carroceriasVehiculos.map((item)=>(
                                                <MenuItem key={item.id_Carroceria} value={item.id_Carroceria }> {item.nombre_Carroceria} </MenuItem>
                                            ))
                                        }
                                    </Select>
                                </FormControl>           
                            </Col>
                        </Row> 
 
                        <Row>
                            <Col sm={4}  lg={4}>   
                                <TextField  label="Km Inicial"    name="kmInicial_Vehiculo" value= { kmInicial_Vehiculo}  onChange={ handleInputChange } />
                            </Col>
                            <Col sm={4}  lg={4}>  
                                <TextField  label="Km de Mantenimiento"    name="kmMant_Vehiculo" value= { kmMant_Vehiculo}  onChange={ handleInputChange } />
                            </Col>
                        </Row>   
                                    <br/>
                        <Row >
                            <Col md={8} lg={8}  className='mt-2'>   
                                <FormControl variant="outlined" style= {{width:"100%"}} >
                                    <InputLabel id="demo-simple-select-label"> Dni Conductor </InputLabel>
                                    <Select
                                        name="dni_Conductor" 
                                        value= { dni_Conductor  }  
                                        onChange={ (e) => {
                                            handleInputChange(e) ;
                                        }}   
                                    >
                                        <MenuItem value={0}> SELECCIONE </MenuItem>                
                                        {
                                            dniConductores.map((item)=>(
                                                <MenuItem key={item.Ges_Empl_Identidad} value={item.Ges_Empl_Dni }> {item.Ges_Empl_Apellidos} </MenuItem>
                                            ))
                                        }
                                    </Select>
                                </FormControl>           
                            </Col>
                        </Row> 
                        <br/>
 
                        <Row  >
                        <Col md={6} lg={6}   >    
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
