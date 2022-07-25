import React  from 'react';
import {  Button, makeStyles,  Paper, Snackbar, TextField } from '@material-ui/core' 
import { Col, Row, Table  } from 'react-bootstrap';
import Tooltip from '@material-ui/core/Tooltip';

import SaveIcon from '@material-ui/icons/Save';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import BlockIcon from '@material-ui/icons/Block';
import EditIcon from '@material-ui/icons/Edit';

import { useDispatch, useSelector } from 'react-redux';
import { agregarMetrados, anularMetrados, set_formParamsMetrados, validacionesMetrados } from '../../../redux/slice/procesos/registroOTSlice';
import { Swal_Question } from '../../../helper/alertas';
import { verificar_soloNumeros } from '../../../helper/funcionesglobales';
import { TipoReparacionMontosOT } from './TipoReparacionMontosOT';
import { Alert, AlertTitle, Autocomplete } from '@material-ui/lab';
import { useComboBuscador } from '../../../hooks/useComboBuscador';
import { useNotificacion } from '../../../hooks/useNotificacion';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
  
const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%', 
    },
    formControl: {
      margin: theme.spacing(1),
      width: '99%',
    },
    rootTab: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.paper,
    },
    marginComboBuscador : {
        margin: '1px 0px 5px 10px'
    }
  }));

  const valorInicialComboBuscadorTipoReparacion = {id:0 , descripcion:'[--SELECCIONE--]'};   


export const MetradosForm = () => {

    const classes = useStyles(); 
    
    //----usando el hook  redux 
    const dispatch = useDispatch();  

    const { id : id_usuarioGlobal } = useSelector(state => state.login);  
    const { tiposReparacion, metrados , formParamsMetrados, id_OrdenTrabajo_Global } = useSelector(state => state.proceso_registroOT);   
    const { largo, ancho, espesor } = formParamsMetrados;

    const [ tipoReparacionComboBuscador, setTipoReparacionComboBuscador  ] = useComboBuscador(valorInicialComboBuscadorTipoReparacion);

        //  //----- notificaciones-----
        const {  notification, openNotification, closeNotification, objNotification, assignNotification } = useNotificacion({
        nombre_usuario_creacion : '',
        fecha_creacion : '',
        nombre_usuario_edicion : '',
        fecha_edicion:  ''
    })


    const handleInputChange = ({ target }) => {
        dispatch(set_formParamsMetrados({
                ...formParamsMetrados, [target.name] : target.value
            }                 
        ))
    }   

     const handleClickAgregar = ()=>{
        if( validacionesMetrados(formParamsMetrados) === false ){
           return ;
        }
        dispatch(agregarMetrados(id_OrdenTrabajo_Global, formParamsMetrados, id_usuarioGlobal)) 
    }  

    const handleClickLimpiar= ()=>{          
        dispatch(set_formParamsMetrados({
            id_OrdenTrabajo_Metrado: '0',
            idTipoReparacion: '0',
            largo : '', 
            ancho : '', 
            espesor : '', 
        }))
     }

     const handleClick_Anular = ({ id_OrdenTrabajo_Metrado})=>{ 
        Swal_Question('Sistemas', 'Esta seguro de anular ?')
        .then((result)=>{
          if(result.value){    
            dispatch(anularMetrados(id_OrdenTrabajo_Metrado, id_usuarioGlobal));
          }
        })        
    }
    
    const handleClickEditar = ({ id_OrdenTrabajo_Metrado, id_TipoRepracion, nombre_TipoReparacion, largo_Metrado, ancho_Metrado, espesor_Metrado  })=>{ 

        dispatch(set_formParamsMetrados({
            id_OrdenTrabajo_Metrado: id_OrdenTrabajo_Metrado,
            idTipoReparacion: id_TipoRepracion,
            largo : largo_Metrado, 
            ancho : ancho_Metrado, 
            espesor : espesor_Metrado, 
        }));

        setTipoReparacionComboBuscador({id : id_TipoRepracion ,descripcion : nombre_TipoReparacion});
    }   

    const keyPress=(event) =>{
        verificar_soloNumeros(event);
    }

    const handleKeyDown = (event, NextControl) => { 
        if (event.key === 'Enter') {
            setTimeout(() => {
                document.getElementById(NextControl).focus();
            }, 100);          
       }
    }

    const handle_changetipoReparacion = async (value)=>{ 
        if (value === null) return
        const {id,descripcion} = value;   

        dispatch(set_formParamsMetrados({
                ...formParamsMetrados, idTipoReparacion : id
            }                 
        ))

        setTipoReparacionComboBuscador({id,descripcion});
        setTimeout(() => {
            document.getElementById('largo').focus();
        }, 0);         
     } 
     
     const handleClick_Auditoria = ({nombre_usuario_creacion, fecha_creacion, nombre_usuario_edicion, fecha_edicion })=>{  
        openNotification(true);
        assignNotification({
                nombre_usuario_creacion,
                fecha_creacion,
                nombre_usuario_edicion ,
                fecha_edicion,
        })
    }  




  return (

    <form className={classes.formControl} noValidate autoComplete="off">
        <Row>
            <Col  lg={ 12 } >
                <Paper elevation={3}   >
                    <div className='title-form' >
                        <h6>  Metrados de Campo </h6>                    
                   </div> 
                   <Row>
                        <Col sm={6} md={3} lg={3} >
                            <Autocomplete   
                                className={classes.marginComboBuscador}                  
                                options={tiposReparacion}
                                getOptionLabel={(option) => option.descripcion || ""}
                                value={tipoReparacionComboBuscador || null}
                                getOptionSelected={(option, value) => option.id === value.id}
                                onChange={(event, newValue) => {
                                    (handle_changetipoReparacion(newValue))
                                }}
                                renderInput={params => (
                                    <TextField {...params} label=" Tipo Reparacion" placeholder='Busque el Tipo Reparacion' fullWidth />
                                )}
                            /> 
                        </Col>
                        <Col sm={3} md={2} lg={2} >
                            <TextField id='largo'  className={classes.formControl}  label="largo" name="largo" value= { largo  } onKeyDown={(e)=>handleKeyDown(e,'ancho')}   onChange={ handleInputChange }  onKeyPress= {(e) => keyPress(e)}   />
                     
                        </Col>
                        <Col sm={3} md={2} lg={2} >
                            <TextField  id='ancho'  className={classes.formControl}  label="ancho" name="ancho" value= { ancho  } onKeyDown={(e)=>handleKeyDown(e,'espesor')}    onChange={ handleInputChange }  onKeyPress= {(e) => keyPress(e)} />
                        </Col>

                        <Col sm={3} md={2} lg={2} >
                             <TextField  id='espesor' className={classes.formControl}  label="espesor" name="espesor" value= { espesor  }  onKeyDown={(e)=>handleKeyDown(e,'btnAgregar')}  onChange={ handleInputChange } onKeyPress= {(e) => keyPress(e)}  />
                        </Col>

                        <Col sm={6} md={3} lg={3} className="text-center">
                            <Tooltip title="Agregar" placement="top-start">
                                <Button id='btnAgregar'  startIcon={<SaveIcon />}  onKeyDown={(e)=>handleKeyDown(e,'largo')}  variant="contained" color="primary"  text= '' onClick={ handleClickAgregar }></Button> 
                            </Tooltip>      
                            <Tooltip title="Limpiar" placement="top-start">
                                <Button startIcon={<AddCircleIcon />}   size="small" variant="contained"   text= '' onClick={ handleClickLimpiar }></Button> 
                            </Tooltip>                 
                        </Col>
                    </Row>      

 

                    <Row>
                        <Col sm={12} md={12} lg={8} > 
                           <div className ="tableFixHead p-2"  >
                                    <Table hover bordered >
                                        <thead className="theadTableModal" >
                                            <tr>    
                                                <th className='text-center'> TIPO REPARACION </th>
                                                <th className='text-center'> LARGO </th>
                                                <th className='text-center'> ANCHO </th>
                                                <th className='text-center'> ESPESOR </th>
                                                <th className='text-center'> TOTAL </th>
                                                <th className='text-center'> ACCIONES </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                                {
                                                    metrados.map((item, index)=>{
                                                        return <tr key={item.id_OrdenTrabajo_Metrado} className = {(item.id_Estado===0) ? 'canceledFile' : ''} >  
                                                            <td>  
                                                                {item.nombre_TipoReparacion}              
                                                            </td>
                                                            <td className='text-right'>  
                                                                {item.largo_Metrado}              
                                                            </td>
                                                            <td className='text-right'>  
                                                                {item.ancho_Metrado}              
                                                            </td>
                                                            <td className='text-right'>  
                                                                {item.espesor_Metrado}              
                                                            </td>
                                                            <td className='text-right'>  
                                                                {item.total_Metrado}              
                                                            </td>
                                                            <td className='text-center'>
                                                                <div className='text-center' style={{width : '300px' , marginBottom: '-7px', marginTop: '-7px' }}>
                                                                        <Button   startIcon={<EditIcon />}  variant="contained" color="primary"  onClick={ ()=> handleClickEditar(item) }>  </Button>  
                                                                        {
                                                                            item.id_Estado !==0  &&  <Button  startIcon={<BlockIcon />}  variant="contained" color="secondary" onClick={ ()=> handleClick_Anular(item) }></Button>  
                                                                        }   
                                                                        <Button  startIcon={<LibraryBooksIcon />} style={{color:'white', backgroundColor: '#13b013'}}  variant="contained"   onClick={ ()=> handleClick_Auditoria(item) } > </Button>                                                        
                                                                </div>    
                                                            </td>
                                                        </tr>
                                                    })
                                                } 
                                        </tbody>
                                    </Table>  
                            </div>   
                        </Col>
                        <Col sm={12} md={6} lg={4} >        
                             <TipoReparacionMontosOT/>                       
                        </Col>
                    </Row> 


                </Paper> 
            </Col> 
        </Row>    

        
        <Snackbar open={notification}        
                anchorOrigin={{vertical: 'top', horizontal: 'right'} }   
                autoHideDuration={3000} onClose={closeNotification}>
            <Alert onClose={closeNotification} severity="success">
            <AlertTitle>   Auditoria </AlertTitle>                        
            Usuario Creacion : { objNotification.nombre_usuario_creacion } — <strong> {objNotification.fecha_creacion} </strong> 
                <br></br>       
                <hr/>   
            Usuario Edicion : { objNotification.nombre_usuario_edicion } — <strong> {objNotification.fecha_edicion} </strong> 
            </Alert>                    
        </Snackbar>

    </form>

  )
}


