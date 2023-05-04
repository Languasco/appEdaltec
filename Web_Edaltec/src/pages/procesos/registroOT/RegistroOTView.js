 
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MiModal from '../../../components/shared/controls/MiModal';

import { RegistroOTFiltros } from './RegistroOTFiltros'
import { RegistroOTGrilla } from './RegistroOTGrilla'
import { RegistroOTFormulario } from './RegistroOTFormulario';

import './registroOT.css' 
import { getCargarCombos } from '../../../redux/slice/procesos/registroOTSlice';
 
export const RegistroOTView = () => {     
      //----usando el hook  redux
      const dispatch = useDispatch();   
      useEffect(() => {
          dispatch(getCargarCombos());
    }, [dispatch])  
  
      const  { showModal } = useSelector(state => state.modal);   
  return (
    <>
        <RegistroOTFiltros > </RegistroOTFiltros> 
        <RegistroOTGrilla ></RegistroOTGrilla>
        {
            showModal &&   
            <MiModal fullWidth = {true} maxWidth = 'xl'> 
                <RegistroOTFormulario /> 
            </MiModal >
        }
    </>
  )
}
