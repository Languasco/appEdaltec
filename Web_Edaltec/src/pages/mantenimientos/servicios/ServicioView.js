import React from 'react'
import { useSelector } from 'react-redux';
import MiModal from '../../../components/shared/controls/MiModal';
 
import  './servicios.css';
import { ServicioFiltros } from './ServicioFiltros';
import { ServicioGrilla } from './ServicioGrilla';
import { ServicioRegistroForm } from './ServicioRegistroForm';

export const ServicioView = () => { 
    //----usando el hook  redux
    const  { showModal } = useSelector(state => state.modal);         
    return (
        <> 
          <ServicioFiltros />             
           <ServicioGrilla />
            {
                showModal &&   
                <MiModal fullWidth = {true} maxWidth = 'xs'> 
                    <ServicioRegistroForm /> 
                </MiModal>
            }  
        </>
    )
}
