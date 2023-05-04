import React from 'react'
import { useSelector } from 'react-redux';
import MiModal from '../../../components/shared/controls/MiModal';

import { TipoRepacionFiltros } from './TipoRepacionFiltros';
import { TipoRepacionGrilla } from './TipoRepacionGrilla';
import { TipoRepacionRegistroForm } from './TipoRepacionRegistroForm';
 

export const TipoRepacionView = () => { 
    //----usando el hook  redux
    const  { showModal } = useSelector(state => state.modal);         
    return (
        <> 
          <TipoRepacionFiltros  />            
           <TipoRepacionGrilla  />
            {
                showModal &&   
                <MiModal fullWidth = {true} maxWidth = 'xs'> 
                    <TipoRepacionRegistroForm /> 
                </MiModal>
            }  
        </>
    )
}
