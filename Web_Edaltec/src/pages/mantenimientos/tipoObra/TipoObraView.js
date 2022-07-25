import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import MiModal from '../../../components/shared/controls/MiModal';
import { proyectos } from '../../../redux/slice/mantenimientos/tipoObraSlice';

import { TipoObraFiltros } from './TipoObraFiltros';
import { TipoObraGrilla } from './TipoObraGrilla';
import { TipoObraRegistroForm } from './TipoObraRegistroForm';


export const TipoObraView = () => { 
    //----usando el hook  redux
    const dispatch = useDispatch();   
    const  { showModal } = useSelector(state => state.modal);  
    
    useEffect(() => {
        dispatch(proyectos())
    }, [dispatch])
    
    
    return (
        <> 
          <TipoObraFiltros />            
           <TipoObraGrilla />
            {
                showModal &&   
                <MiModal fullWidth = {true} maxWidth = 'xs'> 
                    <TipoObraRegistroForm /> 
                </MiModal>
            }  
        </>
    )
}
