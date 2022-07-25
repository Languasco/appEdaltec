import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'; 
 
import MiModal from '../../../components/shared/controls/MiModal';
import { getCargarCombos } from '../../../redux/slice/mantenimientos/precioClienteSlice';
import { PrecioClienteFiltros } from './PrecioClienteFiltros';
import { PrecioClienteGrilla } from './PrecioClienteGrilla';
import { PrecioClienteRegistroForm } from './PrecioClienteRegistroForm';

export const PrecioClienteView = () => { 
    //----usando el hook  redux
    const dispatch = useDispatch();   
    const  { showModal } = useSelector(state => state.modal);  
    
    useEffect(() => {
        dispatch(getCargarCombos())
    }, [dispatch])    
    
    return (
        <> 
          <PrecioClienteFiltros/>            
           <PrecioClienteGrilla />
            {
                showModal &&   
                <MiModal fullWidth = {true} maxWidth = 'md'> 
                    <PrecioClienteRegistroForm /> 
                </MiModal>
            }  
        </>
    )
}
