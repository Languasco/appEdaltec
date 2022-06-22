
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Col, Row, Table  } from 'react-bootstrap';
import { makeStyles, TextField, FormControl, InputLabel, Select, MenuItem, Button} from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';

import { useForm } from '../../../hooks/useForm';
import  './programacionOT.css';
 
import MiDatepicker from '../../../components/shared/controls/MiDatepicker';
import { buscarVehiculo_placa, save, update, validaciones } from '../../../redux/slice/procesos/programacionOTSlice';
 
import AddCircleIcon from '@material-ui/icons/AddCircle';
import EditIcon from '@material-ui/icons/Edit';
import { Swal_Question } from '../../../helper/alertas';
import { flagEdicion } from '../../../redux/slice/flagEdicionSlice';
import { modalTitle } from '../../../redux/slice/modalSlice';
import { objectoEdicion } from '../../../redux/slice/objectoEdicionSlice';
 
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

  export const ProgramacionOTRegistroForm = () => {    
 
    const { id : id_usuarioGlobal } = useSelector(state => state.login);  
    const classes = useStyles();  
    //----usando el hook  redux
    const dispatch = useDispatch();     

    //---utilizando datos de reducer----
    const { flag_modoEdicion} = useSelector(state => state.flagEdicion );
    const { objetoEdicion } = useSelector(state => state.objetoEdicion );
 
    const { dniConductores } = useSelector(state => state.mant_vehiculo);  
    const { clientes, tipoTrabajos, distritos } = useSelector(state => state.proceso_registroOT);  
    const { programacionesOt_cliente } = useSelector(state => state.proceso_programacionOT); 


    const initialState = {
        id_OrdenProgramacion:'0',
        id_Cliente:'0',
        fechaProgramacion: new Date(),
        ges_Empl_DNI_JefeCuadrilla:'0',
        id_Vehiculo:'0',
        placaVehiculo:'',
        descripcionVehiculo:'',
        id_TipoTrabajo:'0',
        numero_Orden_Programa:'',
        id_Distrito_Programa:'0',
        direccion_Programa:'',
        id_Estado:'001',
        usuario_creacion  : id_usuarioGlobal
    }

  const [ formParams, handleInputChange, , setFormParams ] = useForm(initialState);
  const {id_Cliente, fechaProgramacion, ges_Empl_DNI_JefeCuadrilla, placaVehiculo, descripcionVehiculo , id_TipoTrabajo, numero_Orden_Programa, id_Distrito_Programa, direccion_Programa, id_Estado   } = formParams;

//     ///---ejecutando una instruccion que va estar pendiente del cambio del estado del activeEvent
    useEffect(() => {
        if (flag_modoEdicion === true) {    
            if (!objetoEdicion) return;
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
 
  const handleKeyDown_placa = (event) => { 
    if (event.key === 'Enter') {
        buscarVehiculo()
    }
  }

  const buscarVehiculo = async()=>{
    const res = await buscarVehiculo_placa(placaVehiculo);
    if (res.ok) {
        setFormParams({
            ...formParams, id_Vehiculo: res.data.length > 0 ? res.data[0].id_Vehiculo : 0 ,  descripcionVehiculo  : res.data.length > 0 ? res.data[0].descripcionVehiculo : 'No hay informacion con la placa, verique'
        })  
    }else{
        alert(JSON.stringify(res.data)); 
    }
  }

  const handleClick_Anular = ({ id_OrdenProgramacion})=>{ 
    Swal_Question('Sistemas', 'Esta seguro de anular ?')
    .then((result)=>{
            if(result.value){    
                // dispatch(anularMetrados(id_OrdenProgramacion, id_usuarioGlobal));
            }
        })        
   }

    const handleClickEditar = (objetoEdicion)=>{ 
       setFormParams({...objetoEdicion, fechaProgramacion : new Date(objetoEdicion.fechaProgramacion)});   
       dispatch(flagEdicion(true));
       dispatch(modalTitle('EDITAR PROGRAMACION DE TRABAJO'));   
    }  

    const handleClickLimpiar= ()=>{          
        dispatch(modalTitle('NUEVO PROGRAMACION DE TRABAJOS'));
        dispatch(flagEdicion(true));                    
        dispatch(objectoEdicion({...formParams, id_Distrito_Programa : '0', direccion_Programa : ''}));          
        setTimeout(() => {
            dispatch(flagEdicion(false));  
          }, 1000);
     }
 
    
  return (  
    <form className={classes.formControl} noValidate autoComplete="off">
        <Row className='p-2' >
            <Col lg={ 12 } >
                    <Row >
                            <Col md={6} lg={6}  >   
                                <FormControl variant="outlined" style= {{width:"100%"}} >
                                    <InputLabel  > Cliente </InputLabel>
                                    <Select
                                        name="id_Cliente" 
                                        value= { id_Cliente  }  
                                        onChange={ (e) => {
                                            handleInputChange(e) ;
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


                    <Row  className='mb-1' >
                        <Col sm={4} md={4}>   
                            <MiDatepicker  valueDate ={ fechaProgramacion } name="fechaProgramacion" setDate = { handleDatepickerChange } labelText = {'Fecha Programacion'} /> 
                        </Col> 
                        <Col md={8} lg={8}  className='mt-3'>   
                            <FormControl variant="outlined" style= {{width:"100%"}} >
                                <InputLabel  > Coordinador </InputLabel>
                                <Select
                                    name="ges_Empl_DNI_JefeCuadrilla" 
                                    value= { ges_Empl_DNI_JefeCuadrilla  }  
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

                    <Row  className='mb-4'>
                        <Col sm={3} md={3}>   
                            <TextField  label="Nro  Placa"  onKeyDown={(e)=> handleKeyDown_placa(e)}  inputProps={{ maxLength: 20 }} name="placaVehiculo" value= { placaVehiculo}   onChange={ handleInputChange } />
                        </Col> 
                        <Col sm={9} md={9}>   
                            <TextField  label="..."  disabled name="descripcionVehiculo" value= { descripcionVehiculo}   onChange={ handleInputChange } />
                        </Col> 
                    </Row>   
                
                    <Row  className='mb-3' >
                        <Col md={3} lg={3}  className='mt-3'>  
                            <FormControl variant="outlined" style= {{width:"100%"}} >
                                <InputLabel > Tipo Trabajo </InputLabel>
                                <Select
                                    name="id_TipoTrabajo" 
                                    value= { id_TipoTrabajo  }  
                                    onChange={ handleInputChange }   
                                >
                                    <MenuItem value={0}> SELECCIONE </MenuItem>                
                                    {
                                        tipoTrabajos.map((item)=>(
                                            <MenuItem key={item.id} value={item.id }> {item.descripcion} </MenuItem>
                                        ))
                                    }
                                </Select>
                             </FormControl>
                        </Col>
                        <Col sm={3} md={3} className='mt-1'>   
                            <TextField  label="Nro Orden"   inputProps={{ maxLength: 30 }} name="numero_Orden_Programa" value= { numero_Orden_Programa}   onChange={ handleInputChange } />
                        </Col> 
                    </Row>
                            
                    <Row  className='mb-3' >
                        <Col md={5} lg={5}  className='mt-3'>   
                           <FormControl variant="outlined" style= {{width:"100%"}} >
                                    <InputLabel> Distrito</InputLabel>
                                    <Select
                                        id='id_Distrito_Programa'
                                        name="id_Distrito_Programa" 
                                        value= { id_Distrito_Programa  }  
                                        onChange={ (e)=>{
                                            handleInputChange(e) ;
                                        }}   
                                    >
                                        <MenuItem value={0}>  [--Seleccione--] </MenuItem>                
                                        {
                                            distritos.map((item)=>(
                                                <MenuItem key={item.id} value={item.id }> {item.descripcion} </MenuItem>
                                            ))
                                        }
                                    </Select>
                            </FormControl>  
                        </Col>
                        <Col md={7} lg={7} className='mt-1' >  
                            <TextField  label="Direccion"   inputProps={{ maxLength: 250 }} name="direccion_Programa" value= { direccion_Programa}   onChange={ handleInputChange } />
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
                        <Col md={6} lg={6}   >  
                            <div className="text-center">
                                <Button  variant="contained" color="primary"    startIcon={<SaveIcon />}  onClick={ handleSave }> Guardar</Button> 
                                <Button startIcon={<AddCircleIcon />}   size="small" variant="contained"   onClick={ handleClickLimpiar }> Nuevo </Button> 
                            </div>
                        </Col>
                    </Row>    
 
 

                    <Row>
                        <Col sm={12} md={12} lg={12} > 
                           <div className ="tableFixHead p-2"  >
                                    <Table hover bordered >
                                        <thead className="theadTableModal" >
                                            <tr>    
                                                <th className='text-center'> CLIENTE   </th>
                                                <th className='text-center'> FEC PROGRAMACION </th>
                                                <th className='text-center'> COORDINADOR </th>
                                                <th className='text-center'> NRO ORDEN </th>
                                                
                                                <th className='text-center'> DIRECCION </th>
                                                <th className='text-center'> DISTRITO   </th>
                                                <th className='text-center'> PLACA   </th>
                                                <th className='text-center'> ESTADO   </th>

                                                <th className='text-center'> ACCIONES </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                                {
                                                    programacionesOt_cliente.map((item, index)=>{
                                                        return <tr key={item.id_OrdenProgramacion} className = {(item.id_Estado==='002') ? 'canceledFile' : ''} >  
                                                            <td>                                          
                                                                <div style={{width:'300px'}}>
                                                                    {item.nombre_Cliente}    
                                                                </div>
                                                            </td>
                                                            <td>  
                                                                {item.fechaProgramacionFormateado}              
                                                            </td>
                                                            <td>  
                                                                <div style={{width:'300px'}}>
                                                                    {item.coordinador}    
                                                                </div>          
                                                            </td>
                                                            <td>  
                                                                {item.numero_Orden_Programa}              
                                                            </td>
                                                            <td>  
                                                                <div style={{width:'250px'}}>
                                                                    {item.direccion_Programa}    
                                                                </div>            
                                                            </td>
                                                            <td>   
                                                                <div style={{width:'350px'}}>
                                                                    {item.distrito}    
                                                                </div>          
                                                            </td>
                                                            <td>  
                                                                <div style={{width:'100px'}}>
                                                                    {item.placaVehiculo}    
                                                                </div>             
                                                            </td>
                                                            <td>  
                                                                {item.descripcion_estado}              
                                                            </td>

                                                            <td className='text-center'>
                                                                <div className='text-center' style={{width : '200px' , marginBottom: '-7px', marginTop: '-7px' }}>
                                                                    <Button   startIcon={<EditIcon />}  variant="contained" color="primary"  onClick={ ()=> handleClickEditar(item) }> Editar </Button>  
                                                                        {/* {
                                                                            item.id_Estado !=='002'  &&  <Button  startIcon={<BlockIcon />}  variant="contained" color="secondary"  onClick={ ()=> handleClick_Anular(item) }>Anular</Button>  
                                                                        }                                                           */}
                                                                </div>    
                                                            </td>
                                                        </tr>
                                                    })
                                                } 
                                        </tbody>
                                    </Table>  
                            </div>   
                        </Col>
                    </Row> 



            </Col>  
        </Row>    
    </form>

  )
}
