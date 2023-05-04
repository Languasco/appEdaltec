import React from 'react'
import { AsistenciaFiltros } from './AsistenciaFiltros';
import { AsistenciaGrilla } from './AsistenciaGrilla'; 

export const AsistenciaView = () => { 
    //----usando el hook  redux       
    return (
        <> 
          <AsistenciaFiltros  />            
          <AsistenciaGrilla  />  
        </>
    )
}
