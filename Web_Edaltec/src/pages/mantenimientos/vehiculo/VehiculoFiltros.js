import React, { useEffect } from 'react';
import {  Button, FormControl, InputLabel, Select, MenuItem, makeStyles } from '@material-ui/core' 
import { Col, Row  } from 'react-bootstrap';
 
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from '../../../hooks/useForm';

import RefreshIcon from '@material-ui/icons/Refresh';
import AddIcon from '@material-ui/icons/Add';

import {Card, CardContent} from '@material-ui/core';
import {mostrarInformacion, nuevo } from '../../../redux/slice/mantenimientos/vehiculoSlice';



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

export const VehiculoFiltros = () => {
   
    const classes = useStyles();        
    //----usando el hook  redux
    const dispatch = useDispatch();       
 
    const { flag_refrescarData } = useSelector(state => state.refrescarDatos);     
   
    const [ formParams_filtro, handleInputChange_filtro, ] = useForm({ estado : '001' })
    const { estado  } = formParams_filtro;

    const handleClickMostrar = ()=>{ 
        dispatch(mostrarInformacion( estado, false )) 
    }   
    const handleClick_nuevo= ()=>{          
        dispatch(nuevo())
    }

    useEffect(() => {
        dispatch(mostrarInformacion('001', false)) 
   },  [dispatch])     

    useEffect(() => {
        if (flag_refrescarData === true) {          
            dispatch(mostrarInformacion( estado, true )) 
        }
  },  [flag_refrescarData, estado, dispatch]) 
   
  return (    
    <Card> 
        <CardContent>
        <div>
                <p className='titleFormAlternative'>  MANTENIMIENTO DE VEHICULO </p>
            </div>
 
            <Row  className='mt-1 mb-0'>      
                <Col sm={6} md={4}  >
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
                <Col sm={6}  md={4}  className="text-center"   >
                   <Button  startIcon={<RefreshIcon/>}   variant="contained" onClick= { handleClickMostrar } >Mostrar</Button>
                    <Button  startIcon={<AddIcon/>}  variant="contained" color="primary"   onClick={ handleClick_nuevo }> Nuevo </Button>   
                </Col>
            </Row>       
        </CardContent> 
    </Card>


  )
}
