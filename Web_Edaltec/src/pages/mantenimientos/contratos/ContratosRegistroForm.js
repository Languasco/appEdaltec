
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Col, Row  } from 'react-bootstrap';
import { makeStyles, Paper, TextField, FormControl, InputLabel, Select, MenuItem, Button} from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';

import { useForm } from '../../../hooks/useForm';
import  './contratos.css';
import { save, update, validaciones  } from '../../../redux/slice/mantenimientos/contratoSlice';
import MiDatepicker from '../../../components/shared/controls/MiDatepicker';

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
    id_Contrato: '0', 
    id_Cliente: '0', 
    numero_Contrato: '', 
    observaciones_Contrato: '', 
    fechaInicio: null, 
    fechaFinal: null, 
    id_Estado: '001', 
    usuario_creacion: '000', 
  }

  export const ContratosRegistroForm = () => {    
 
    const { id : id_usuarioGlobal } = useSelector(state => state.login);  
    const classes = useStyles();  
    //----usando el hook  redux
    const dispatch = useDispatch();     

    //---utilizando datos de reducer----
    const { flag_modoEdicion } = useSelector(state => state.flagEdicion );
    const { objetoEdicion } = useSelector(state => state.objetoEdicion );
    const { clientes } = useSelector(state => state.proceso_registroOT);  


  const [ formParams, handleInputChange, , setFormParams ] = useForm(initialState)
  const { id_Contrato, id_Cliente, numero_Contrato, observaciones_Contrato, fechaInicio, fechaFinal, id_Estado  } = formParams;
 
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

  const handleDatepickerChange = (date, nombre)=>{ 
        setFormParams({
             ...formParams, [nombre]: date
        })            
  } 


    
  return (
   
    <Paper elevation={3}   >
        <div className='title-form' >
            <h6>  Datos Generales </h6>                    
        </div> 
        <form className={classes.formControl} noValidate autoComplete="off">
            <Row className='p-2'  >
                <Col lg={ 12 } >

                        {/* <Row>
                            <Col lg={6} >   
                                <TextField  label="Codigo Interno" disabled name="id_Contrato" value= { id_Contrato}   onChange={ handleInputChange } />
                            </Col>
                        </Row>  
                        <br/> */}
                        <Row  >
                            <Col md={8} lg={8}  >   
                                <FormControl variant="outlined" style= {{width:"100%"}} >
                                    <InputLabel id="demo-simple-select-label"> Cliente </InputLabel>
                                    <Select
                                        name="id_Cliente" 
                                        value= { id_Cliente  }  
                                        onChange={ (e) => {
                                            handleInputChange(e) ;
                                        }}   
                                    >
                                        <MenuItem value={0}> [--SELECCIONE--] </MenuItem>                
                                        {
                                            clientes.map((item)=>(
                                                <MenuItem key={item.id} value={item.id }> {item.descripcion} </MenuItem>
                                            ))
                                        }
                                    </Select>
                                </FormControl>  
                            </Col>
                        </Row> 
 
                        <Row className='mt-3'>
                            <Col md={12} lg={6}  >   
                                <TextField  label="Nro Contrato"  inputProps={{ maxLength: 50 }}  name="numero_Contrato" value= { numero_Contrato}   onChange={ handleInputChange } />
                            </Col>
                        </Row> 
                        <Row>
                            <Col md={6} lg={12}  >   
                                <TextField  label="Descripcion"  inputProps={{ maxLength: 250 }}   name="observaciones_Contrato" value= { observaciones_Contrato}   onChange={ handleInputChange } />
                            </Col>
                        </Row> 
                  
                        <Row className='mt-3'>
                            <Col md={12} lg={6}  >   
                                <MiDatepicker valueDate ={ fechaInicio } name="fechaInicio" setDate = { handleDatepickerChange } labelText = {'Fecha Inicio'}  ></MiDatepicker>
                            </Col>
                        </Row> 
                        <Row>
                            <Col md={6} lg={6}  >   
                                <MiDatepicker valueDate ={ fechaFinal } name="fechaFinal" setDate = { handleDatepickerChange } labelText = {'Fecha Final'}  ></MiDatepicker>
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
