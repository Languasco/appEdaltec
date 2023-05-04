
import React from 'react';
import { Paper, TextField  } from '@material-ui/core' 
import { Autocomplete } from '@material-ui/lab' 
import { useDispatch, useSelector } from 'react-redux';
import { set_tiposReparacionesMultiple } from '../../../redux/slice/procesos/registroOTSlice';
 
export const TiposReparacionMultiple = () => {      
    //----usando el hook  redux
    const dispatch = useDispatch();  
    const { tiposReparacion, tiposReparacionesMultiple } = useSelector(state => state.proceso_registroOT);    
   return ( 
    <Paper className="m-1 "  >
        <div className='title-form' >
            <h6>  Tipos de Reparacion </h6>
        </div>
        <div className="p-2 "  >        
                <Autocomplete
                    multiple
                    options={tiposReparacion}
                    getOptionLabel={(option) => option.descripcion} 
                    value={tiposReparacionesMultiple}
                    getOptionSelected={(option, value) => option.id === value.id}
                    onChange={(event, newValue) => {
                        dispatch(set_tiposReparacionesMultiple(newValue))
                    }}
                    renderInput={params => (
                        <TextField {...params} label="seleccione el Tipo de  Reparacion" placeholder='Busque el Tipo de Reparacion' fullWidth />
                    )}
                /> 
        </div>
    </Paper> 

  )
}


