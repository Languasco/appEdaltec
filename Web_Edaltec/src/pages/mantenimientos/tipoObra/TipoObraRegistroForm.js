
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Col, Row  } from 'react-bootstrap';
import { makeStyles, Paper, TextField, FormControl, InputLabel, Select, MenuItem, Button} from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';

import { useForm } from '../../../hooks/useForm';
import  './tipoObra.css';
import { save, update, validaciones  } from '../../../redux/slice/mantenimientos/tipoObraSlice';

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

  export const TipoObraRegistroForm = () => {    
 
    const { id : id_usuarioGlobal } = useSelector(state => state.login);  
    const classes = useStyles();  
    //----usando el hook  redux
    const dispatch = useDispatch();     

    //---utilizando datos de reducer----
    const { flag_modoEdicion } = useSelector(state => state.flagEdicion );
    const { objetoEdicion } = useSelector(state => state.objetoEdicion );
    const { proyectos } = useSelector(state => state.mant_tipoObra);

    const initialState = {
        id_TipoTrabajo : '0', 
        descripcion_TipoTrabajo : '', 
        abreviatura_TipoTrabajo : '', 
        Ges_Proy_Codigo : '001', 
        id_Estado : '001', 
        usuario_creacion  : id_usuarioGlobal
    }

  const [ formParams, handleInputChange, , setFormParams ] = useForm(initialState)
  const { id_TipoTrabajo, descripcion_TipoTrabajo, abreviatura_TipoTrabajo, Ges_Proy_Codigo, id_Estado  } = formParams;
 
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
                                <TextField  label="Codigo Interno" disabled name="id_TipoTrabajo" value= { id_TipoTrabajo}   onChange={ handleInputChange } />
                            </Col>
                        </Row>  
                        <Row>
                            <Col md={12} lg={12}  >   
                                <TextField  label="Descripcion"  inputProps={{ maxLength: 100 }}  name="descripcion_TipoTrabajo" value= { descripcion_TipoTrabajo}   onChange={ handleInputChange } />
                            </Col>
                        </Row> 
                        <Row>
                            <Col md={6} lg={6}  >   
                                <TextField  label="Abreviatura"  inputProps={{ maxLength: 20 }}   name="abreviatura_TipoTrabajo" value= { abreviatura_TipoTrabajo}   onChange={ handleInputChange } />
                            </Col>
                        </Row> 
                         <br/>
                        <Row  >
                            <Col md={8} lg={8}  >   
                                <FormControl variant="outlined"  style= {{width:"100%"}} >
                                    <InputLabel > Proyecto </InputLabel>
                                    <Select
                                        labelId="Ges_Proy_Codigo"
                                        name="Ges_Proy_Codigo" 
                                        value= { Ges_Proy_Codigo  }  
                                        onChange={ handleInputChange }   
                                    >
                                        {
                                            proyectos.map((row)=>{
                                                return <MenuItem key={row.id} value={row.codigo}> { row.descripcion} </MenuItem>
                                            })
                                        }
                                    </Select>
                                </FormControl>
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
