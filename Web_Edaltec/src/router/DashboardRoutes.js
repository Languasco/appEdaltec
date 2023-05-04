
import React from 'react';
import { Navigate, Route, Routes } from 'react-router';
import { HomeScreen } from '../components/home/HomeScreen';
import { NavbarUI } from '../components/shared/navbar/NavbarUI';
import { ClientesView } from '../pages/mantenimientos/clientes/ClientesView';
import { ContratosView } from '../pages/mantenimientos/contratos/ContratosView';
import { MarcaView } from '../pages/mantenimientos/marca/MarcaView';
import { PrecioClienteView } from '../pages/mantenimientos/precioCliente/PrecioClienteView';
import { ServicioView } from '../pages/mantenimientos/servicios/ServicioView'; 
import { TipoObraView } from '../pages/mantenimientos/tipoObra/TipoObraView';
import { TipoRepacionView } from '../pages/mantenimientos/tipoReparacion/TipoRepacionView';
import { VehiculoView } from '../pages/mantenimientos/vehiculo/VehiculoView';

import { ProgramacionOTView } from '../pages/procesos/programacionOT/ProgramacionOTView';
import { RegistroOTView } from '../pages/procesos/registroOT/RegistroOTView';

import { AsistenciaView } from '../pages/reportes/asistencia/AsistenciaView';
 
 
export const DashboardRoutes = () => {

    const URL_DOMINIO = process.env.REACT_APP_DOMAIN;
    return (
        <> 
            <NavbarUI ></NavbarUI>     
 
            <div className="container-fluid mt-2"> 
                <Routes>
           
                        <Route path={URL_DOMINIO + "mantenimiento-cliente"} element={<ClientesView />} />    
                        <Route path={URL_DOMINIO + "mantenimiento-tipo-obra"} element={<TipoObraView />} />                          
                        <Route path={URL_DOMINIO + "mantenimiento-servicios"} element={<ServicioView />} />  
                        <Route path={URL_DOMINIO + "mantenimiento-tipo-reparacion"} element={<TipoRepacionView />} /> 
                        <Route path={URL_DOMINIO + "mantenimiento-precio-cliente"} element={<PrecioClienteView />} />                         
                        <Route path={URL_DOMINIO + "mantenimiento-vehiculo"} element={<VehiculoView />} />    
                        <Route path={URL_DOMINIO + "mantenimiento-contrato"} element={<ContratosView />} />      
                        <Route path={URL_DOMINIO + "mantenimiento-marca"} element={<MarcaView />} />     

                        <Route path={URL_DOMINIO + "proceso-programacion-ot"} element={<ProgramacionOTView />} /> 
                        <Route path={URL_DOMINIO + "proceso-registro-ot"} element={<RegistroOTView />} />       

                        <Route path={URL_DOMINIO + "reporte-asistencia"} element={<AsistenciaView />} />                         

                        <Route path={URL_DOMINIO} element={<HomeScreen />} />
                        <Route path="*" element={<Navigate replace to={URL_DOMINIO} />} />
                </Routes>
            </div>
        </>
    )
}
