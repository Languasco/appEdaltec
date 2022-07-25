import React from 'react'
import { useSelector } from 'react-redux';
import MiModal from '../../../components/shared/controls/MiModal';
import { MarcaGrilla } from './MarcaGrilla';
import { MarcaRegistroForm } from './MarcaRegistroForm';
import { MarcaFiltros } from './MarcaFiltros';

export const MarcaView = () => { 
    //----usando el hook  redux
    const  { showModal } = useSelector(state => state.modal);         
    return (
        <> 
          <MarcaFiltros  />            
           <MarcaGrilla  />
            {
                showModal &&   
                <MiModal fullWidth = {true} maxWidth = 'xs'> 
                    <MarcaRegistroForm /> 
                </MiModal>
            }  
        </>
    )
}
