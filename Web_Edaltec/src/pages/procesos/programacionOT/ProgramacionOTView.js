import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';

 
import MiModal from '../../../components/shared/controls/MiModal';
import { getCargarCombos } from '../../../redux/slice/procesos/programacionOTSlice';
import { ProgramacionOTFiltros } from './ProgramacionOTFiltros';
import { ProgramacionOTGrilla } from './ProgramacionOTGrilla';
import { ProgramacionOTRegistroForm } from './ProgramacionOTRegistroForm';
 
 
export const ProgramacionOTView = () => { 
    //----usando el hook  redux
    const dispatch = useDispatch();   
    const  { showModal } = useSelector(state => state.modal);  
    
    useEffect(() => {
        dispatch(getCargarCombos())
    }, [dispatch])    
    
    return (
        <> 
          <ProgramacionOTFiltros/>            
           <br/> 
           <ProgramacionOTGrilla/>
            {
                showModal &&   
                <MiModal fullWidth = {true} maxWidth = 'lg'> 
                    <ProgramacionOTRegistroForm /> 
                </MiModal>
            }  
        </>
    )
}