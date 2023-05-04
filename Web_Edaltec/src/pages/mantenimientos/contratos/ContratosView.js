import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import MiModal from '../../../components/shared/controls/MiModal';
import { getCargarCombos } from '../../../redux/slice/mantenimientos/contratoSlice';
import { ContratosFiltros } from './ContratosFiltros';
import { ContratosGrilla } from './ContratosGrilla';
import { ContratosRegistroForm } from './ContratosRegistroForm';

 


export const ContratosView = () => { 
    //----usando el hook  redux
    const dispatch = useDispatch();   
    const  { showModal } = useSelector(state => state.modal);  
    
    useEffect(() => {
        dispatch(getCargarCombos())
    }, [dispatch])    
    
    return (
        <> 
           <ContratosFiltros />            
           <ContratosGrilla />
            {
                showModal &&   
                <MiModal fullWidth = {true} maxWidth = 'xs'> 
                    <ContratosRegistroForm /> 
                </MiModal>
            }  
        </>
    )
}
