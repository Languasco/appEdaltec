import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { getCargarCombos } from '../../../redux/slice/procesos/programacionOTSlice';
import { ProgramacionOTFiltros } from './ProgramacionOTFiltros';
import { ProgramacionOTGrilla } from './ProgramacionOTGrilla'; 
 
export const ProgramacionOTView = () => { 
    //----usando el hook  redux
    const dispatch = useDispatch();   
    
    useEffect(() => {
        dispatch(getCargarCombos())
    }, [dispatch])    
    
    return (
        <> 
           <ProgramacionOTFiltros/>            
           <ProgramacionOTGrilla/>
        </>
    )
}