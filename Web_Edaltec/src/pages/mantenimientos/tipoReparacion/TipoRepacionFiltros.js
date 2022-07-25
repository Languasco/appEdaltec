import React, { useEffect } from 'react';
import {  Button, FormControl, InputLabel, Select, MenuItem, makeStyles } from '@material-ui/core' 
import { Col, Row  } from 'react-bootstrap';
 
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from '../../../hooks/useForm';
import RefreshIcon from '@material-ui/icons/Refresh';
import AddIcon from '@material-ui/icons/Add';

import {Card, CardContent} from '@material-ui/core';
import { nuevo, mostrarInformacion } from '../../../redux/slice/mantenimientos/tipoReparacionSlice';
  
const useStyles = makeStyles((theme) => ({
    root: {
         width: '100%', 
    },
     formControl: {
      margin: theme.spacing(1),
      width: '95%',
      minWidth: 200,
    },
  }));

export const TipoRepacionFiltros = () => {
   
    const classes = useStyles();        
    //----usando el hook  redux
    const dispatch = useDispatch();       
 
    const { flag_refrescarData } = useSelector(state => state.refrescarDatos); 

    const [ formParams_filtro, handleInputChange_filtro ] = useForm({ Pub_Esta_Codigo : '001' })
    const { Pub_Esta_Codigo } = formParams_filtro;

    const handleClickMostrar = ()=>{
       dispatch(mostrarInformacion(Pub_Esta_Codigo )) 
    }   

    const handleClick_nuevo= ()=>{          
        dispatch(nuevo())
    }

    useEffect(() => {
        dispatch(mostrarInformacion('001')) 
   },  [dispatch]) 

    useEffect(() => {
        if (flag_refrescarData === true) {
            dispatch(mostrarInformacion( Pub_Esta_Codigo )) 
        }
    },  [flag_refrescarData, Pub_Esta_Codigo, dispatch]) 
   
  return (    
    <Card> 
        <CardContent>
        <div>
                <p className='titleFormAlternative'>  MANTENIMIENTO DE TIPO DE REPARACION </p>
            </div>
 
            <Row  className='mt-1 mb-0'>
                <Col sm={6}  md={6}  >
                        <FormControl variant="outlined" className={classes.formControl} >
                            <InputLabel id="Pub_Esta_Codigo"> Estado </InputLabel>
                            <Select
                                labelId="Pub_Esta_Codigo"
                                name="Pub_Esta_Codigo" 
                                value= { Pub_Esta_Codigo  }  
                                onChange={ handleInputChange_filtro }   
                            >
                                <MenuItem value={'000'}> TODOS </MenuItem>
                                <MenuItem value={'001'}> ACTIVO </MenuItem>
                                <MenuItem value={'002'}> INACTIVO </MenuItem>
                            </Select>
                        </FormControl>
                </Col>
                <Col sm={6}  md={6}  className="text-center"   >
                <Button  startIcon={<RefreshIcon/>}   variant="contained" onClick= { handleClickMostrar } >Mostrar</Button>
                    <Button  startIcon={<AddIcon/>}  variant="contained" color="primary"   onClick={ handleClick_nuevo }> Nuevo </Button>     
                </Col>
            </Row>       
        </CardContent> 
    </Card>
  )
}
