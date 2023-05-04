import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
 
import MiModal from '../../../components/shared/controls/MiModal';
import { getCargarCombos } from '../../../redux/slice/mantenimientos/vehiculoSlice';
import { VehiculoFiltros } from './VehiculoFiltros';
import { VehiculoGrilla } from './VehiculoGrilla';
import { VehiculoRegistroForm } from './VehiculoRegistroForm';
 
export const VehiculoView = () => { 
    //----usando el hook  redux
    const dispatch = useDispatch();   
    const  { showModal } = useSelector(state => state.modal);  
    
    useEffect(() => {
        dispatch(getCargarCombos())
    }, [dispatch])    
    
    return (
        <> 
          <VehiculoFiltros/>            
           <VehiculoGrilla />
            {
                showModal &&   
                <MiModal fullWidth = {true} maxWidth = 'md'> 
                    <VehiculoRegistroForm /> 
                </MiModal>
            }  
        </>
    )
}