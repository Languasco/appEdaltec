
import Swal from "sweetalert2";
import { Swal_alert } from "../../../helper/alertas";

import { formatoFecha } from "../../../helper/funcionesglobales";
import { asistenciaServices } from "../../../services/reportes/asistenciaServices";

const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
    reporteAsistenciaCab : [],
    tipoReporte : 1
 }

const asistenciaSlice = createSlice({ 
    name : 'reporte_asistencia',
    initialState,
    reducers : {
      listReporte_AsistenciaCab(state, action){
            return {
                ...state,
                reporteAsistenciaCab : action.payload
            } 
        },
        tipoReporteSeleccionado(state, action){
          return {
              ...state,
              tipoReporte : action.payload
          } 
      },
    }
})

export const mostrarInformacion =( fechaInicial, fechaFinal, tipoReporte )=>{
    return  async(dispatch)=>{ 
      try {
          Swal.fire({
            icon: 'info', allowOutsideClick: false, allowEscapeKey: false, text: 'Espere por favor'
          })
          Swal.showLoading();

          const fechaIni =  formatoFecha(fechaInicial);
          const fechaFin =  formatoFecha(fechaFinal);

          const {data : res}  = await asistenciaServices().getMostrarReporteCab( fechaIni, fechaFin, tipoReporte );
          Swal.close();
            if (res.ok) {   
              const listReporte = res.data.map((row, index)=>{
                return { ...row, id : index }
              })
              dispatch(listReporte_AsistenciaCab( listReporte ));
              dispatch(tipoReporteSeleccionado( tipoReporte ));
            }else{
              alert(JSON.stringify(res.data));
            } 
      } catch (error) {
        Swal.close();
        console.log(JSON.stringify(error))
        alert(JSON.stringify(error));
      } 
    }
 } 

 export const descargarReporteAsistenciaExcel=(fechaInicial, fechaFinal, tipoReporte)=>{
  return  async(dispatch)=>{ 
    try {
        Swal.fire({
          icon: 'info', allowOutsideClick: false, allowEscapeKey: false, text: 'Generando reporte, Espere por favor'
        })
        Swal.showLoading();
        
        const fechaIni =  formatoFecha(fechaInicial);
        const fechaFin =  formatoFecha(fechaFinal);

        const res = await asistenciaServices().get_descargarReporteAsistenciaExcel( fechaIni, fechaFin, tipoReporte);
        Swal.close();
        if (res.ok) { 
          window.open(res.data) 
        }else{
          alert(JSON.stringify(res.data)); 
        } 
    } catch (error) {
      Swal_alert('error', JSON.stringify(error));
    } 
  }
}  
 


export const { listReporte_AsistenciaCab, tipoReporteSeleccionado } = asistenciaSlice.actions;

export default asistenciaSlice.reducer;