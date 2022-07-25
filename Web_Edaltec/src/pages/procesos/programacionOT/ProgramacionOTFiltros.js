import React, { useEffect } from 'react';
import {  Button, FormControl, InputLabel, Select, MenuItem, makeStyles, RadioGroup, FormControlLabel, Radio } from '@material-ui/core' 
import { Col, Row  } from 'react-bootstrap';
 
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from '../../../hooks/useForm';
import RefreshIcon from '@material-ui/icons/Refresh';
import {Card, CardContent} from '@material-ui/core';
import { mostrarInformacion } from '../../../redux/slice/procesos/programacionOTSlice';
import MiDatepicker from '../../../components/shared/controls/MiDatepicker';
import { Swal_alert } from '../../../helper/alertas';

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
    cliente : '0', 
    fechaInicial : new Date(), 
    fechaFinal : new Date(), 
    TipoProceso:'1'
}

export const ProgramacionOTFiltros = () => {
   
    const classes = useStyles();        
    //----usando el hook  redux
    const dispatch = useDispatch();       
 
    const { flag_refrescarData } = useSelector(state => state.refrescarDatos);     
    const { clientes} = useSelector(state => state.proceso_registroOT);  
   
    const [ formParams_filtro, handleInputChange_filtro, , setFormParams ] = useForm(initialState)
    const { cliente,fechaInicial, fechaFinal, TipoProceso } = formParams_filtro;

    const handleClickMostrar = ()=>{ 
        if (cliente === 0 || cliente === '0') {
            Swal_alert('error','Por favor seleccione el Cliente');
            return false;
        } 
        dispatch(mostrarInformacion(  cliente,fechaInicial, fechaFinal, TipoProceso, false )) 
    }   
 
    const handleDatepickerChange = (date, nombre)=>{ 
        setFormParams({
                 ...formParams_filtro, [nombre]: date
        }) 
    } 

    useEffect(() => {
        if (flag_refrescarData === true) {  
            if (cliente === 0 || cliente === '0') {
                return false;
            }         
            dispatch(mostrarInformacion(  cliente,fechaInicial, fechaFinal,TipoProceso, true )) 
        }
  },  [flag_refrescarData,  cliente,fechaInicial, fechaFinal,TipoProceso, dispatch]) 
   
  return (    
    <Card> 
        <CardContent>
            <div>
                <p className='titleFormAlternative'>  PROGRAMACION DE TRABAJOS </p>
            </div>
            <br ></br>
            <Row  className='  mb-0'>
                <Col sm={6}  md={6}  lg={2}   >
                        <FormControl variant="outlined"  style= {{width:"100%"}} >
                                <InputLabel id="demo-simple-select-label"> Cliente </InputLabel>
                                <Select
                                    name="cliente" 
                                    value= { cliente  }  
                                    onChange={ (e) => {
                                        handleInputChange_filtro(e) ;
                                    }}   
                                >
                                    <MenuItem value={0}> [ SELECCIONE ] </MenuItem>                
                                    {
                                        clientes.map((item)=>(
                                            <MenuItem key={item.id} value={item.id }> {item.descripcion} </MenuItem>
                                        ))
                                    }
                                </Select>
                        </FormControl>
                </Col>   
                <Col sm={6}  md={6} lg={4} className="text-center" >
                        <FormControl component="fieldset"> 
                                <RadioGroup row aria-label="TipoProceso" name="TipoProceso" defaultValue="top"  value={TipoProceso} onChange={handleInputChange_filtro} >
                                    <FormControlLabel value="1" control={<Radio />} label="Ver Programacion" />
                                    <FormControlLabel value="2" control={<Radio />} label="Ver Resumen" />
                                </RadioGroup>
                        </FormControl>    
                </Col>   
                <Col sm={4}  md={4} lg={2}   >
                     <MiDatepicker  valueDate ={ fechaInicial } name="fechaInicial" setDate = { handleDatepickerChange } labelText = {'Fecha Inicial'}  ></MiDatepicker>
                </Col>
                <Col sm={4}  md={4} lg={2}   >
                    <MiDatepicker  valueDate ={ fechaFinal } name="fechaFinal" setDate = { handleDatepickerChange } labelText = {'Fecha Final'}  ></MiDatepicker>
                </Col>  
                <Col sm={4}  md={4} lg={2}  className="text-center"   >
                    <Button  startIcon={<RefreshIcon/>}   variant="contained" onClick= { handleClickMostrar } >Mostrar</Button>
                </Col>
            </Row>     
        </CardContent> 
    </Card>


  )
}
