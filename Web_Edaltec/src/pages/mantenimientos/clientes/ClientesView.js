import React from 'react'
import {useSelector } from 'react-redux';
import MiModal from '../../../components/shared/controls/MiModal';
 
import { ClientesFiltros } from './ClientesFiltros';
import { ClientesGrilla } from './ClientesGrilla';
import { ClientesRegistroForm } from './ClientesRegistroForm';

export const ClientesView = () => { 
    //----usando el hook  redux
     const  { showModal } = useSelector(state => state.modal); 
    
    return (
        <> 
          <ClientesFiltros />            
           <ClientesGrilla />
            {
                showModal &&   
                <MiModal fullWidth = {true} maxWidth = 'md'> 
                    <ClientesRegistroForm /> 
                </MiModal>
            }  
        </>
    )
}
