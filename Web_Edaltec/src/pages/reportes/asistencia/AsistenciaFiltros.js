import React  from 'react';
import {  Button, FormControl, makeStyles, FormLabel, Radio, RadioGroup, FormControlLabel } from '@material-ui/core' 
import { Col, Row  } from 'react-bootstrap';
 
import { useDispatch } from 'react-redux';
import { useForm } from '../../../hooks/useForm';
import RefreshIcon from '@material-ui/icons/Refresh';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';

import {Card, CardContent} from '@material-ui/core';
import { descargarReporteAsistenciaExcel, mostrarInformacion } from '../../../redux/slice/reportes/asistenciaSlice';
import MiDatepicker from '../../../components/shared/controls/MiDatepicker';
  
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

export const AsistenciaFiltros = () => {
   
    const classes = useStyles();        
    //----usando el hook  redux
    const dispatch = useDispatch();       

    const [ formParams_filtro,handleInputChange , , setFormParams_filtro ] = useForm({  fechaInicial : new Date(), fechaFinal : new Date(), tipoReporte:'1'})
    const { fechaInicial, fechaFinal, tipoReporte } = formParams_filtro;

    const handleClickMostrar = ()=>{
       dispatch(mostrarInformacion(fechaInicial, fechaFinal, tipoReporte )) 
    }   
    const handleDatepickerChange = (date, nombre)=>{ 
        setFormParams_filtro({
                 ...formParams_filtro, [nombre]: date
        }) 
    }  
    const handleClick_descargar= ()=>{          
        dispatch(descargarReporteAsistenciaExcel( fechaInicial, fechaFinal, tipoReporte));
    } 
    
   
  return (    
    <Card> 
        <CardContent>
            <div>
                <p className='titleFormAlternative'>  REPORTE DE ASISTENCIA  </p>
            </div>
 
            <Row  className='mt-1 mb-0'>
                <Col sm={6}  md={4}  lg={2} >
                     <MiDatepicker  valueDate ={ fechaInicial } name="fechaInicial" setDate = { handleDatepickerChange } labelText = {'Fecha Inicial'}  ></MiDatepicker>
                </Col>
                <Col sm={6}  md={4} lg={2} >
                    <MiDatepicker  valueDate ={ fechaFinal } name="fechaFinal" setDate = { handleDatepickerChange } labelText = {'Fecha Final'}  ></MiDatepicker>
                </Col>  
                <Col sm={6}  md={4} lg={4} className="text-center" >
                    <FormControl component="fieldset">
                            <FormLabel component="legend"> Tipo de Reporte </FormLabel>
                            <hr className='mt-2'/>
                            <RadioGroup row aria-label="tipoReporte" name="tipoReporte" defaultValue="top"  value={tipoReporte} onChange={handleInputChange} >
                                <FormControlLabel value="1" control={<Radio />} label="Lista Detallada" />
                                <FormControlLabel value="2" control={<Radio />} label="Lista Resumen" />
                            </RadioGroup>
                    </FormControl>                   
                </Col>  
                <Col sm={6}  md={12} lg={4}  className="text-center"   >
                    <Button  startIcon={<RefreshIcon/>}   variant="contained" onClick= { handleClickMostrar } >Mostrar</Button>
                    <Button   startIcon={<CloudDownloadIcon />}  variant="contained" color="secondary"    onClick={ handleClick_descargar }> Descargar </Button> 
                </Col>
            </Row>       
        </CardContent> 
    </Card>
  )
}
