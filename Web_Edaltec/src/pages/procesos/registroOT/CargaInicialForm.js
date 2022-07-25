
import React, { useEffect } from 'react'
import {  Accordion, AccordionDetails, AccordionSummary, makeStyles, Paper, TextField  } from '@material-ui/core'
import { Col, Row  } from 'react-bootstrap';
import { FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';

import SaveIcon from '@material-ui/icons/Save';
import { MiButton } from '../../../components/shared/controls/MiButton';
import { useDispatch, useSelector } from 'react-redux';
import { Actualizar_formParamsTab1, validacionesCargaInicialTab1, saveCargaInicial_Tab1, update_CargaInicial_Tab1 } from '../../../redux/slice/procesos/registroOTSlice';
import { OcurrenciasOT } from './OcurrenciasOT';
import { TipoReparacionMontosOT } from './TipoReparacionMontosOT';
import { TiposReparacionMultiple } from './TiposReparacionMultiple';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import './registroOT.css' 

//------ material date time picker ----- 
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker} from '@material-ui/pickers';
import deLocale from "date-fns/locale/es";
import { Autocomplete } from '@material-ui/lab';
import { useComboBuscador } from '../../../hooks/useComboBuscador';
 
 
//------ fin  material date time picker ----- 


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
      },
    }));

const valorInicialComboBuscadorTipoTrabajo = {id:0 , descripcion:'[ SELEC]'};     
const valorInicialComboBuscadorDistrito = {id:0 , descripcion:'[--SELECCIONE--]'};  

const valorInicialComboBuscadorSupervisor1= {id:0 , descripcion:'[--SELECCIONE--]'};  
const valorInicialComboBuscadorSupervisor2 = {id:0 , descripcion:'[--SELECCIONE--]'};  


export const CargaInicialForm = () => {    
    const classes = useStyles();  
    //----usando el hook  redux
    const dispatch = useDispatch();     
    //---utilizando datos de reducer----

    const { id : id_usuarioGlobal } = useSelector(state => state.login); 
    const { flag_modoEdicion } = useSelector(state => state.flagEdicion );
    const { formParamsTab1, id_OrdenTrabajo_Global, clientes, tipoTrabajosModal : tipoTrabajos, areas, distritos, supervisores,estados, tiposReparacionesMultiple} = useSelector(state => state.proceso_registroOT);

    const { Concatenado ,     
        id_Servicio, fechaCorreo_OrdenTrabajo, extension, fechaElectrica_OrdenTrabajo, fechaAsignada_OrdenTrabajo, id_TipoTrabajo, numero_OrdenTrabajo, 
        nroCliente_OrdenTrabajo, id_Distrito, direccion_OrdenTrabajo, nroSED, cliente_OrdenTrabajo, cxr_OrdenTrabajo, fechaProgramada_OrdenTrabajo, id_Supervisor, id_Supervisor2, 
        fechaAsigndaCampo_OrdenTrabajo, supervisorContratista, cantDesm, fechaElimDes_OrdenTrabajo, fechaEjecutado_OrdenTrabajo, personal_OrdenTrabajo, cemento_OrdenTrabajo, 
        logistica_OrdenTrabajo, tiempoGrabEfect_OrdenTrabajo, tiempoGrabDesest_OrdenTrabajo, unidad_OrdenTrabajo, gastoGenerales_OrdenTrabajo, salida_OrdenTrabajo, 
        llegada_OrdenTrabajo, km_OrdenTrabajo, id_Estado 
    } = formParamsTab1; 

    const [ tipoTrabajoComboBuscador, setTipoTrabajoComboBuscador  ] = useComboBuscador(valorInicialComboBuscadorTipoTrabajo); 
    const [ distritoComboBuscador, setDistritoComboBuscador  ] = useComboBuscador(valorInicialComboBuscadorDistrito);  

    const [ supervisor1ComboBuscador, setSupervisor1ComboBuscador  ] = useComboBuscador(valorInicialComboBuscadorSupervisor1);  
    const [ supervisor2ComboBuscador, setSupervisor2ComboBuscador  ] = useComboBuscador(valorInicialComboBuscadorSupervisor2);  


    // const [formParams, setValues] = useState({largo:100, ancho : 200, espesor : 300 });
    // const handleInputChange2 = ({ target }) => {
    //     setValues({
    //         ...formParams,
    //         [ target.name ]: target.value
    //     });
    // }
    // const {largo } = formParams;


    useEffect(() => {
        if (flag_modoEdicion === true) {   

             const objtipoTrabajo = tipoTrabajos.find((t)=> t.id === id_TipoTrabajo); 
             const objDistrito = distritos.find((t)=> t.id === id_Distrito); 
             const objSupervisor = supervisores.find((s)=> s.id === id_Supervisor); 
             const objSupervisor2 = supervisores.find((s)=> s.id === id_Supervisor2); 

             setTipoTrabajoComboBuscador(objtipoTrabajo);   
             setDistritoComboBuscador(objDistrito);   
             setSupervisor1ComboBuscador(objSupervisor);        
             setSupervisor2ComboBuscador(objSupervisor2);
       }
  },  [flag_modoEdicion]) 


//   useEffect(() => {
//     console.log('tab 1 montado');
//     return()=>{
//         setValues(function(dato) {
//             console.log(dato)
//          });
//         console.log('tab1 des-montado');
//     }
// },[])



    const handleInputChange = ({ target }) => {
            dispatch(Actualizar_formParamsTab1({
                    ...formParamsTab1, [ target.name ]: target.value
                }                 
            ))
    }   

    const handleDatepickerChange = (date, nombre)=>{ 
        dispatch(Actualizar_formParamsTab1({
                 ...formParamsTab1, [nombre]: date
            }                
        ))
    } 
   
    const handleSave = ()=>{    
        if (flag_modoEdicion === true) {   ///editar 
                if(validacionesCargaInicialTab1(formParamsTab1, tiposReparacionesMultiple)){
                    dispatch(update_CargaInicial_Tab1(id_OrdenTrabajo_Global, {...formParamsTab1, usuario_creacion : id_usuarioGlobal}, tiposReparacionesMultiple));
                } 
        }else{
            if(validacionesCargaInicialTab1(formParamsTab1, tiposReparacionesMultiple)){
                dispatch(saveCargaInicial_Tab1({...formParamsTab1, usuario_creacion : id_usuarioGlobal},tiposReparacionesMultiple));
            } 
        }
    }
 
    const handleKeyDown = (event, NextControl) => { 
        if (event.key === 'Enter') {
           document.getElementById(NextControl).focus();
       }
    }
    const handleKeyDown_Combo = (NextControl) => { 
        setTimeout(()=>{ //  
            document.getElementById(NextControl).focus();
        },100); 
    }

    const handle_changeTipoTrabajo = async (value)=>{ 
        if (value === null) return;
        const {id, descripcion} = value; 

        dispatch(Actualizar_formParamsTab1({
             ...formParamsTab1, id_TipoTrabajo : id
            }                 
        ))
        setTipoTrabajoComboBuscador({id, descripcion});  
        enfocarControl('numero_OrdenTrabajo'); 
     }

     const enfocarControl = (NextControl)=>{  
        setTimeout(() => {
            document.getElementById(NextControl).focus();
        }, 0);
     }

 
     const handle_changeDistrito = async (value)=>{ 
        if (value === null) return;
        const {id, descripcion} = value;
   
        dispatch(Actualizar_formParamsTab1({
            ...formParamsTab1, id_Distrito : id
           }                 
        ))

        setDistritoComboBuscador({id, descripcion});  
        enfocarControl('direccion_OrdenTrabajo');
     }

     const handle_changeSupervisor = async (value, opcion)=>{ 
 
        if (value === null) return;
        const {id, descripcion} = value;

        if (opcion == 1){
            dispatch(Actualizar_formParamsTab1({
                ...formParamsTab1, id_Supervisor : id
               }                 
            ))
            setSupervisor1ComboBuscador({id, descripcion}); 
            enfocarControl('id_Supervisor2');
        }else{
            dispatch(Actualizar_formParamsTab1({
                ...formParamsTab1, id_Supervisor2 : id
               }                 
            ))
            setSupervisor2ComboBuscador({id, descripcion}); 
            enfocarControl('fechaAsigndaCampo_OrdenTrabajo');
        }

     }

     const generarConcatenado = (id_TipoTrabajo, numero_OrdenTrabajo)=>{
        
        if(id_TipoTrabajo == 0) return ( '-' );
        const objtipoTrabajo = tipoTrabajos.find((t)=> t.id === id_TipoTrabajo); 
        return (objtipoTrabajo.descripcion + '-' + numero_OrdenTrabajo) 
     }

     const handleKeyDown_EnterPicker = (e,NextControl) => { 
        let keycode = (e.keyCode ? e.keyCode : e.which);
        if (keycode == '13') {
            setTimeout(()=>{ //  
                document.getElementById(NextControl).focus();
            },100); 
        }
    }
    
  return (

     <> 
        <form className={classes.formControl} noValidate autoComplete="off"> 
        <Row>
            <Col md={ 12 }  lg={ 9 } >
                <Paper elevation={3}   >
                     <br></br>
                      {/* <MiDatepicker valueDate ={ fechaProgramada_OrdenTrabajo } name="fechaProgramada_OrdenTrabajo" setDate = { handleDatepickerChange } labelText = {'Fecha Programada'}  ></MiDatepicker> */}

                    <Row>
                        <Col md={4} lg={2} >
                                <FormControl variant="outlined" className={classes.formControl} >
                                            <InputLabel> Area de Servicio </InputLabel>
                                            <Select
                                                id='id_Servicio'
                                                name="id_Servicio" 
                                                value= { id_Servicio  }  
                                                onChange={ (e)=>{
                                                    handleInputChange(e) ; handleKeyDown_Combo('fechaCorreo_OrdenTrabajo')
                                                }}   
                                            >
                                                <MenuItem value={0}>  [--Seleccione--] </MenuItem>                
                                                {
                                                    areas.map((item)=>(
                                                        <MenuItem key={item.id} value={item.id }> {item.descripcion} </MenuItem>
                                                    ))
                                                }
                                            </Select>
                                </FormControl> 
                        </Col>
                        <Col md={4} lg={2} >
                                <MuiPickersUtilsProvider locale={deLocale}  utils={DateFnsUtils}  >
                                    <KeyboardDatePicker
                                        disableToolbar
                                        autoOk
                                        className={classes.marginComboBuscador}   
                                        id='fechaCorreo_OrdenTrabajo'
                                        variant="inline"
                                        format="dd/MM/yyyy"
                                        margin="normal"
                                        label='Fecha Correo'
                                        value={ fechaCorreo_OrdenTrabajo }                         
                                        onClose ={() =>{
                                            handleKeyDown_Combo('extension')
                                        }}
                                        onKeyDown ={(e) =>{
                                            handleKeyDown_EnterPicker(e,'extension')
                                        }}
                                        onChange={(e)=>{
                                            handleDatepickerChange(e,'fechaCorreo_OrdenTrabajo')
                                        }}
                                        KeyboardButtonProps={{
                                            'aria-label': 'change date',
                                        }}
                                    />
                                </MuiPickersUtilsProvider>
                        </Col>
                        <Col md={4} lg={2} >
                          <TextField id='extension' onKeyDown={(e)=>handleKeyDown(e,'fechaElectrica_OrdenTrabajo')}  className={classes.formControl}  label="Extension" name="extension" value= { extension  }   onChange={ handleInputChange }  />
                        </Col>
                        <Col md={3} lg={2} >
                             <MuiPickersUtilsProvider locale={deLocale}  utils={DateFnsUtils}>
                                    <KeyboardDatePicker
                                        disableToolbar
                                        autoOk
                                        className={classes.marginComboBuscador}   
                                        id='fechaElectrica_OrdenTrabajo'
                                        variant="inline"
                                        format="dd/MM/yyyy"
                                        margin="normal"
                                        label='Fecha Electrica'
                                        value={ fechaElectrica_OrdenTrabajo } 
                                        onClose ={() =>{
                                            handleKeyDown_Combo('fechaAsignada_OrdenTrabajo')
                                        }}
                                        onKeyDown ={(e) =>{
                                            handleKeyDown_EnterPicker(e,'fechaAsignada_OrdenTrabajo')
                                        }}
                                        onChange={(e)=>{
                                            handleDatepickerChange(e,'fechaElectrica_OrdenTrabajo');  
                                        }}
                                        KeyboardButtonProps={{
                                            'aria-label': 'change date',
                                        }}
                                    />
                                </MuiPickersUtilsProvider>
                        </Col>
                        <Col md={3} lg={2} >
                            <MuiPickersUtilsProvider  locale={deLocale}  utils={DateFnsUtils}>
                                            <KeyboardDatePicker
                                                disableToolbar
                                                autoOk
                                                className={classes.marginComboBuscador}   
                                                id='fechaAsignada_OrdenTrabajo'
                                                variant="inline"
                                                format="dd/MM/yyyy"
                                                margin="normal"
                                                label='Fecha Asignada '
                                                value={ fechaAsignada_OrdenTrabajo } 
                                                onClose ={() =>{
                                                    handleKeyDown_Combo('id_TipoTrabajo')
                                                }}
                                                onKeyDown ={(e) =>{
                                                    handleKeyDown_EnterPicker(e,'id_TipoTrabajo')
                                                }}
                                                onChange={(e)=>{
                                                    handleDatepickerChange(e,'fechaAsignada_OrdenTrabajo');  
                                                }}
                                                KeyboardButtonProps={{
                                                    'aria-label': 'change date',
                                                }}
                                            />
                            </MuiPickersUtilsProvider>
                        </Col>
                        <Col md={6} lg={2} >
                            <TextField  className={classes.formControl}  label="Concatenado" name="Concatenado" value= {  generarConcatenado(id_TipoTrabajo, numero_OrdenTrabajo) }   onChange={ handleInputChange }  />
                        </Col>
                    </Row>

                    <Row>
                        <Col md={4} lg={2} >
                            <Autocomplete      
                                        id='id_TipoTrabajo'               
                                        options={tipoTrabajos}
                                        className={classes.marginComboBuscador}   
                                        getOptionLabel={(option) => option.descripcion || ""}
                                        value={tipoTrabajoComboBuscador || null}
                                        getOptionSelected={(option, value) => option.id === value.id}
                                        onChange={(event, newValue) => {
                                            (handle_changeTipoTrabajo(newValue))
                                        }}
                                        renderInput={params => (
                                            <TextField {...params} label="Tipo Trabajo" placeholder='Busque el Tipo Trabajo' fullWidth />
                                        )}
                             />  
                        </Col>
                        <Col md={4} lg={2} >
                            <TextField  id='numero_OrdenTrabajo'  onKeyDown={(e)=>handleKeyDown(e,'nroCliente_OrdenTrabajo')} className={classes.formControl}  label="Orden" name="numero_OrdenTrabajo" value= { numero_OrdenTrabajo  }   onChange={ handleInputChange }  />

                        </Col>

                        <Col md={4} lg={2} >
                            <TextField id="nroCliente_OrdenTrabajo" onKeyDown={(e)=>handleKeyDown(e,'id_Distrito')}  className={classes.formControl}  label="Nro Cliente" name="nroCliente_OrdenTrabajo" value= { nroCliente_OrdenTrabajo  }   onChange={ handleInputChange }  />

                        </Col>
                        <Col md={6} lg={3} > 
                             <Autocomplete      
                                         id='id_Distrito'       
                                         className={classes.marginComboBuscador}              
                                        options={distritos}
                                        getOptionLabel={(option) => option.descripcion || ""}
                                        value={distritoComboBuscador || null}
                                        getOptionSelected={(option, value) => option.id === value.id}
                                        onChange={(event, newValue) => {
                                            (handle_changeDistrito(newValue))
                                        }}
                                        renderInput={params => (
                                            <TextField {...params} label="Distrito" placeholder='Busque el Distrito' fullWidth />
                                        )}
                               />  
                        </Col>
                        <Col md={6} lg={3} >
                              <TextField id="direccion_OrdenTrabajo" onKeyDown={(e)=>handleKeyDown(e,'nroSED')}   className={classes.formControl}  label="Direccion" name="direccion_OrdenTrabajo" value= { direccion_OrdenTrabajo  }   onChange={ handleInputChange }  />
                        </Col> 
                    </Row>
                    
                        <Row>
                            <Col md={4} lg={2} >
                            <TextField id="nroSED"  onKeyDown={(e)=>handleKeyDown(e,'cliente_OrdenTrabajo')}  className={classes.formControl}  label="Sed" name="nroSED" value= { nroSED  }   onChange={ handleInputChange }  /> 

                            </Col>      
                            <Col md={4} lg={2} >
                                    <FormControl variant="outlined" className={classes.formControl} >
                                            <InputLabel> Cliente </InputLabel>
                                            <Select
                                                id='cliente_OrdenTrabajo'
                                                name="cliente_OrdenTrabajo" 
                                                value= { cliente_OrdenTrabajo  }  
                                                onChange={ (e)=>{
                                                    handleInputChange(e) ; handleKeyDown_Combo('cxr_OrdenTrabajo')
                                                }}   
                                            >
                                                <MenuItem value={0}>  [--Seleccione--] </MenuItem>                
                                                {
                                                    clientes.map((item)=>(
                                                        <MenuItem key={item.id} value={item.id }> {item.descripcion} </MenuItem>
                                                    ))
                                                }
                                            </Select>
                                    </FormControl>  
                            </Col>   
                            <Col md={4} lg={2} >
                            <TextField    id='cxr_OrdenTrabajo' onKeyDown={(e)=>handleKeyDown(e,'fechaProgramada_OrdenTrabajo')}   className={classes.formControl}  label="C x R" name="cxr_OrdenTrabajo" value= { cxr_OrdenTrabajo  }   onChange={ handleInputChange }  />

                            </Col>   
                            <Col md={4} lg={2} >
                
                                     <MuiPickersUtilsProvider locale={deLocale}  utils={DateFnsUtils}>
                                        <KeyboardDatePicker
                                            autoOk
                                            disableToolbar
                                            className={classes.marginComboBuscador}   
                                            id='fechaProgramada_OrdenTrabajo'
                                            variant="inline"
                                            format="dd/MM/yyyy"
                                            margin="normal"
                                            label='Fecha Programada'
                                            value={ fechaProgramada_OrdenTrabajo } 
                                            onClose ={() =>{
                                                handleKeyDown_Combo('id_Supervisor')
                                            }}
                                            onKeyDown ={(e) =>{
                                                handleKeyDown_EnterPicker(e,'id_Supervisor')
                                            }}
                                            onChange={(e)=>{
                                                handleDatepickerChange(e,'fechaProgramada_OrdenTrabajo');  
                                            }}
                                            KeyboardButtonProps={{
                                                'aria-label': 'change date',
                                            }}
                                        />
                                    </MuiPickersUtilsProvider>
                            </Col>   
                            <Col md={4} lg={4} >
                                    <Autocomplete             
                                        id='id_Supervisor'
                                        options={supervisores}
                                        getOptionLabel={(option) => option.descripcion || ""}
                                        value={supervisor1ComboBuscador || null}
                                        getOptionSelected={(option, value) => option.id === value.id}
                                        onChange={(event, newValue) => {
                                            (handle_changeSupervisor(newValue,1))
                                        }}
                                        renderInput={params => (
                                            <TextField {...params} label="Supervisor" placeholder='Busque el Supervisor' fullWidth />
                                        )}
                                    /> 
                            </Col>                                                          
                        </Row>
 
                        <Row>
                            <Col md={4} lg={4} >
                                    <Autocomplete   
                                        id='id_Supervisor2'   
                                        className={classes.marginComboBuscador}                  
                                        options={supervisores}
                                        getOptionLabel={(option) => option.descripcion || ""}
                                        value={supervisor2ComboBuscador || null}
                                        getOptionSelected={(option, value) => option.id === value.id}
                                        onChange={(event, newValue) => {
                                            (handle_changeSupervisor(newValue,2))
                                        }}
                                        renderInput={params => (
                                            <TextField {...params} label="Supervisor 2" placeholder='Busque el Supervisor 2' fullWidth />
                                        )}
                                    />
                            </Col>   

                            <Col md={4} lg={2} >
                                  <MuiPickersUtilsProvider locale={deLocale}  utils={DateFnsUtils}>
                                        <KeyboardDatePicker
                                            disableToolbar
                                            autoOk
                                            id='fechaAsigndaCampo_OrdenTrabajo'
                                            variant="inline"
                                            format="dd/MM/yyyy"
                                            margin="normal"
                                            label='Fec Asig Campo'
                                            value={ fechaAsigndaCampo_OrdenTrabajo } 
                                            onClose ={() =>{
                                                handleKeyDown_Combo('supervisorContratista')
                                            }}
                                            onKeyDown ={(e) =>{
                                                handleKeyDown_EnterPicker(e,'supervisorContratista')
                                            }}
                                            onChange={(e)=>{
                                                handleDatepickerChange(e,'fechaAsigndaCampo_OrdenTrabajo');  
                                            }}
                                            KeyboardButtonProps={{
                                                'aria-label': 'change date',
                                            }}
                                        />
                                    </MuiPickersUtilsProvider>
                            </Col>
                            <Col md={4} lg={2} >
                                 <TextField id="supervisorContratista" onKeyDown={(e)=>handleKeyDown(e,'cantDesm')}  className={classes.formControl}  label="Supervisor Cont" name="supervisorContratista" value= { supervisorContratista  }   onChange={ handleInputChange }  /> 

                            </Col>
                            <Col md={4} lg={2} >
                                 <TextField   id="cantDesm" onKeyDown={(e)=>handleKeyDown(e,'fechaElimDes_OrdenTrabajo')} className={classes.formControl}  label="Cant. Desm" name="cantDesm" value= { cantDesm  }   onChange={ handleInputChange }  />  

                            </Col> 
                            <Col md={4} lg={2} >
                                     <MuiPickersUtilsProvider locale={deLocale}  utils={DateFnsUtils}>
                                        <KeyboardDatePicker
                                            disableToolbar
                                            autoOk
                                            id='fechaElimDes_OrdenTrabajo'
                                            variant="inline"
                                            format="dd/MM/yyyy"
                                            margin="normal"
                                            label='Fecha Elim Des'
                                            value={ fechaElimDes_OrdenTrabajo } 
                                            onClose ={() =>{
                                                handleKeyDown_Combo('fechaEjecutado_OrdenTrabajo')
                                            }}
                                            onKeyDown ={(e) =>{
                                                handleKeyDown_EnterPicker(e,'fechaEjecutado_OrdenTrabajo')
                                            }}
                                            onChange={(e)=>{
                                                handleDatepickerChange(e,'fechaElimDes_OrdenTrabajo');  
                                            }}
                                            KeyboardButtonProps={{
                                                'aria-label': 'change date',
                                            }}
                                        />
                                    </MuiPickersUtilsProvider>
                            </Col>                                                            
                        </Row>
  
                        <Row>
                            <Col md={12} lg={12} > 
                                <TiposReparacionMultiple />
                            </Col>                                                                    
                        </Row>  

                        <Row>
                                <Col md={4} lg={4} > 
                     
                                    <div className='p-1'>                                 
                                        <MuiPickersUtilsProvider locale={deLocale}  utils={DateFnsUtils}>
                                            <KeyboardDatePicker
                                                disableToolbar
                                                autoOk
                                                className={classes.marginComboBuscador}     
                                                id='fechaEjecutado_OrdenTrabajo'
                                                variant="inline"
                                                format="dd/MM/yyyy"
                                                margin="normal"
                                                label='Fecha Ejecutado  '
                                                value={ fechaEjecutado_OrdenTrabajo } 
                                                onClose ={() =>{
                                                    handleKeyDown_Combo('id_Estado')
                                                }}                                                
                                                onKeyDown ={(e) =>{
                                                    handleKeyDown_EnterPicker(e,'id_Estado')
                                                }}
                                                onChange={(e)=>{
                                                    handleDatepickerChange(e,'fechaEjecutado_OrdenTrabajo');  
                                                }}
                                                KeyboardButtonProps={{
                                                    'aria-label': 'change date',
                                                }}
                                            />
                                        </MuiPickersUtilsProvider>
                                    </div>

                                </Col>
                                <Col md={4} lg={4} > 
                                <FormControl variant="outlined" className='mt-3'  style= {{width:"100%"}} >
                                            <InputLabel> Estado </InputLabel>
                                            <Select
                                                id="id_Estado" 
                                                name="id_Estado" 
                                                value= { id_Estado  }  
                                                onChange={ (e)=>{
                                                    handleInputChange(e) ; handleKeyDown_Combo('personal_OrdenTrabajo')
                                                }}  
                                            >
                                                <MenuItem value={0}>  [--Seleccione--] </MenuItem>                
                                                {
                                                    estados.map((item)=>(
                                                        <MenuItem key={item.id} value={item.id }> {item.descripcion} </MenuItem>
                                                    ))
                                                }
                                            </Select>
                                    </FormControl> 
                                </Col>                                              
                        </Row>                         
                </Paper> 

                <Paper>
                    <br/>
                    <Row>
                            <Col md={2} lg={2} > 
                                <TextField id="personal_OrdenTrabajo" onKeyDown={(e)=>handleKeyDown(e,'cemento_OrdenTrabajo')} className={classes.formControl}  label="Personal" name="personal_OrdenTrabajo" value= { personal_OrdenTrabajo  }   onChange={ handleInputChange }  />
                            </Col>
                            <Col md={2} lg={2} > 
                                <TextField  id="cemento_OrdenTrabajo" onKeyDown={(e)=>handleKeyDown(e,'logistica_OrdenTrabajo')}className={classes.formControl}  label="Cemento" name="cemento_OrdenTrabajo" value= { cemento_OrdenTrabajo  }   onChange={ handleInputChange }  />
                            </Col>
                            <Col md={2} lg={2} > 
                                <TextField  id="logistica_OrdenTrabajo" onKeyDown={(e)=>handleKeyDown(e,'tiempoGrabEfect_OrdenTrabajo')} className={classes.formControl}  label="Logistica" name="logistica_OrdenTrabajo" value= { logistica_OrdenTrabajo  }   onChange={ handleInputChange }  />
                            </Col>
                            <Col md={2} lg={2} > 
                                <TextField  id="tiempoGrabEfect_OrdenTrabajo" onKeyDown={(e)=>handleKeyDown(e,'tiempoGrabDesest_OrdenTrabajo')} className={classes.formControl}  label="Time Grap Efect" name="tiempoGrabEfect_OrdenTrabajo" value= { tiempoGrabEfect_OrdenTrabajo  }   onChange={ handleInputChange }  />
                            </Col>
                            <Col md={2} lg={2} > 
                                <TextField  id="tiempoGrabDesest_OrdenTrabajo" onKeyDown={(e)=>handleKeyDown(e,'unidad_OrdenTrabajo')} className={classes.formControl}  label="Time Grap Deset" name="tiempoGrabDesest_OrdenTrabajo" value= { tiempoGrabDesest_OrdenTrabajo  }   onChange={ handleInputChange }  />
                            </Col>                                            
                    </Row>   

                    <Row>
                            <Col md={2} lg={2} > 
                                <TextField  id="unidad_OrdenTrabajo" onKeyDown={(e)=>handleKeyDown(e,'gastoGenerales_OrdenTrabajo')}   className={classes.formControl}  label="Unidad" name="unidad_OrdenTrabajo" value= { unidad_OrdenTrabajo  }   onChange={ handleInputChange }  />
                            </Col>
                            <Col md={2} lg={2} > 
                                <TextField   id="gastoGenerales_OrdenTrabajo" onKeyDown={(e)=>handleKeyDown(e,'salida_OrdenTrabajo')}  className={classes.formControl}  label="Gasto Gener" name="gastoGenerales_OrdenTrabajo" value= { gastoGenerales_OrdenTrabajo  }   onChange={ handleInputChange }  />
                            </Col>
                            <Col md={2} lg={2} > 
                                <TextField  id="salida_OrdenTrabajo" onKeyDown={(e)=>handleKeyDown(e,'llegada_OrdenTrabajo')}  className={classes.formControl}  label="Salida" name="salida_OrdenTrabajo" value= { salida_OrdenTrabajo  }   onChange={ handleInputChange }  />
                            </Col>
                            <Col md={2} lg={2} > 
                                <TextField  id="llegada_OrdenTrabajo" onKeyDown={(e)=>handleKeyDown(e,'km_OrdenTrabajo')}  className={classes.formControl}  label="LLegada" name="llegada_OrdenTrabajo" value= { llegada_OrdenTrabajo  }   onChange={ handleInputChange }  />
                            </Col>
                            <Col md={2} lg={2} > 
                                <TextField   id="km_OrdenTrabajo" onKeyDown={(e)=>handleKeyDown(e,'Extension')}  className={classes.formControl}  label="Km" name="km_OrdenTrabajo" value= { km_OrdenTrabajo  }   onChange={ handleInputChange }  />
                            </Col>                                            
                    </Row>                   

                </Paper>
            </Col>
            <Col md={ 12 }  lg={ 3 } > 
                <div  className = {(id_OrdenTrabajo_Global===0) ? 'disabledForm' : ''} >
                    <OcurrenciasOT  />   
                </div>                       
            </Col>
        </Row>          
        <Row>
            <Col lg={12} >   
                <div className="text-center">
                    <MiButton  variant="contained" color="primary"  text= 'Guardar'  startIcon={<SaveIcon />}  onClick={ handleSave }></MiButton> 
            </div>
            </Col>
        </Row>  

        <Accordion>
            <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
            >
            <div className='title-form' >
                <h6>  Tipos Reparaciones Montos </h6>
            </div>
            </AccordionSummary>
            <AccordionDetails>
                <Row>
                    <Col lg={12} >    
                        <TipoReparacionMontosOT/>                        
                    </Col>
                </Row>                     
            </AccordionDetails>
         </Accordion>
        
        </form>
    </>
  )
}



