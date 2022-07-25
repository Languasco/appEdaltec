
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Col, Row  } from 'react-bootstrap';
import { makeStyles, TextField, FormControl, InputLabel, Select, MenuItem, Button} from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';

import { useForm } from '../../../hooks/useForm'; 
import MiDatepicker from '../../../components/shared/controls/MiDatepicker';
import { buscarVehiculo_placa, save, validaciones } from '../../../redux/slice/procesos/programacionOTSlice'; 
import { Autocomplete } from '@material-ui/lab';
import { useComboBuscador } from '../../../hooks/useComboBuscador';

import  './programacionOT.css';
 
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
    id_OrdenProgramacion:'0',
    id_Cliente:'0',
    fechaProgramacion: new Date(),
    ges_Empl_DNI_JefeCuadrilla:'0',
    id_Vehiculo:'0',
    placaVehiculo:'',
    descripcionVehiculo:'',
    usuario_creacion  : '000'
}

const valorInicialComboBuscadorCoordinador = {Ges_Empl_Identidad:0 , Ges_Empl_Dni : '000000' , Ges_Empl_Apellidos:'[--SELECCIONE--]'};   

  export const ProgramacionOTRegistroForm = () => {    
 
    const { id : id_usuarioGlobal } = useSelector(state => state.login);  
    const classes = useStyles();  
    //----usando el hook  redux
    const dispatch = useDispatch();  

    //---utilizando datos de reducer----
    const { flag_modoEdicion} = useSelector(state => state.flagEdicion );
    const { objetoEdicion } = useSelector(state => state.objetoEdicion );
 
    const { dniConductores } = useSelector(state => state.mant_vehiculo);  
    const { clientes, } = useSelector(state => state.proceso_registroOT);  
 
    const { idProgramacionMasivo } = useSelector(state => state.proceso_programacionOT); 
 
    const [ formParams, handleInputChange, , setFormParams ] = useForm(initialState);
    const { id_Cliente, fechaProgramacion, placaVehiculo, descripcionVehiculo } = formParams;
    const [ cordinadorComboBuscador,setCoordinadorComboBuscador ] = useComboBuscador(valorInicialComboBuscadorCoordinador); 
     
 
    useEffect(() => {
        if (flag_modoEdicion === true) {       
            if (!objetoEdicion) return;
            setFormParams({...objetoEdicion,  fechaProgramacion : ( !objetoEdicion.fechaProgramacion ) ? null :  new Date(objetoEdicion.fechaProgramacion)  }  );    
            setCoordinadorComboBuscador({Ges_Empl_Identidad : objetoEdicion.Ges_Empl_Identidad ,Ges_Empl_Dni : objetoEdicion.ges_Empl_DNI_JefeCuadrilla , Ges_Empl_Apellidos : objetoEdicion.coordinador}); 
         }   
   }, [flag_modoEdicion, objetoEdicion])

  const handleSave =async ()=>{

    if (flag_modoEdicion === true) {     ///-- edicion        
        const valor = await validaciones(formParams, true);
        if (valor === false) return;
        dispatch(save({ ...formParams , usuario_creacion : id_usuarioGlobal}, idProgramacionMasivo )); 
    }else{  /// nuevo

        const valor = await validaciones(formParams, false);
        if (valor === false) return;
        dispatch(save({ ...formParams , usuario_creacion : id_usuarioGlobal}, idProgramacionMasivo )); 
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
 
     const enfocarControl = (nombreControl)=>{
        let control = document.getElementById(nombreControl);   
        setTimeout(() => {
            control.focus();
        }, 0);
     }

     const handle_changeCoordinador = async (value)=>{ 
        if (value === null) return;
        const {Ges_Empl_Identidad, Ges_Empl_Dni, Ges_Empl_Apellidos} = value;

        setFormParams({...formParams, ges_Empl_DNI_JefeCuadrilla : Ges_Empl_Dni})
        setCoordinadorComboBuscador({Ges_Empl_Identidad,Ges_Empl_Dni, Ges_Empl_Apellidos});
        enfocarControl('txtNroPlaca');    
     } 
 
    
  return (  
    <form className={classes.formControl} noValidate autoComplete="off">
        <Row className='mt-4' >
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
        </Row>   

        <Row  className='mb-1' >
            <Col lg={12} className='mt-1'>   
                <Autocomplete                     
                    options={dniConductores}
                    getOptionLabel={(option) => option.Ges_Empl_Apellidos || ""}
                    value={cordinadorComboBuscador || null}
                    getOptionSelected={(option, value) => option.Ges_Empl_Dni === value.Ges_Empl_Dni}
                    onChange={(event, newValue) => {
                        (handle_changeCoordinador(newValue))
                    }}
                    renderInput={params => (
                        <TextField {...params} label="Coordinador" placeholder='Busque el Coordinador' fullWidth />
                    )}
                /> 
            </Col>
        </Row> 

        <Row  className='mt-3 mb-4'>
            <Col sm={3} md={3}>   
                <TextField id='txtNroPlaca'  label="Nro  Placa"  onKeyDown={(e)=> handleKeyDown_placa(e)}  inputProps={{ maxLength: 20 }} name="placaVehiculo" value= { placaVehiculo}   onChange={ handleInputChange } />
            </Col> 
            <Col sm={9} md={9}>   
                <TextField  label="..."  disabled name="descripcionVehiculo" value= { descripcionVehiculo}   onChange={ handleInputChange } />
            </Col> 
        </Row>   

        <Row> 
            <Col  lg={12} >  
                <div className="text-center">
                    <Button  variant="contained" color="primary"    startIcon={<SaveIcon />}  onClick={ handleSave }> Guardar</Button> 
                </div>
            </Col>
        </Row>      
    </form>

  )
}
