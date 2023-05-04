
import Swal from "sweetalert2";
import { Swal_alert } from "../../../helper/alertas";
import { vehiculoServices } from "../../../services/mantenimiento/vehiculoServices";

import { flagEdicion } from "../flagEdicionSlice";
import { modalClose, modalOpen, modalTitle } from "../modalSlice";
import { objectoEdicion } from "../objectoEdicionSlice";
import { refrescarDatoPrincipal } from "../refrescarDataSlice";

const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
    vehiculo : [],
    tiposVehiculos : [],
    marcasVehiculos : [],
    categoriasVehiculos : [],
    carroceriasVehiculos : [],
    dniConductores : [],
 }

const vehiculoSlice = createSlice({ 
    name : 'mant_vehiculo',
    initialState,
    reducers : { 
        listMantVehiculoCab(state, action){  
        return {
            ...state,
            vehiculo : action.payload
            }    
        },
        listTiposVehiculos(state, action){  
            return {
                ...state,
                tiposVehiculos : action.payload
            } 
        },
        listMarcasVehiculos(state, action){  
            return {
                ...state,
                marcasVehiculos : action.payload
            } 
        },
        listCategoriasVehiculos(state, action){  
            return {
                ...state,
                categoriasVehiculos : action.payload
            } 
        },
        listCarroceriasVehiculos(state, action){  
            return {
                ...state,
                carroceriasVehiculos : action.payload
            }
        }, 
        listDniConductores(state, action){  
            return {
                ...state,
                dniConductores : action.payload
            } 
        },
        refrescandoEstadoVehiculo(state, action){  
            return {
                ...state,
                vehiculo :  state.vehiculo.map(vehiculo =>{
                    return {...vehiculo, id_Estado : (vehiculo.id_Vehiculo === action.payload )? '002': vehiculo.id_Estado  }             
                })  
            } 
        }
    }
})




export const getCargarCombos = ()=>{
    return  async(dispatch)=>{ 
      try { 
          Swal.fire({
            icon: 'info', allowOutsideClick: false, allowEscapeKey: false, text: 'Espere por favor'
          })
          Swal.showLoading();      
          Promise.all([vehiculoServices().tipoVehiculo(), vehiculoServices().marcaVehiculo(), vehiculoServices().dniConductores(), vehiculoServices().carroceriaVehiculo(0) ])
            .then(([ _tipoVehiculo, _marcaVehiculo, _conductores, _carroceria ])  => {
            Swal.close();    
            if (_tipoVehiculo.ok) {
              dispatch( listTiposVehiculos(_tipoVehiculo.data))
            }else{
              alert(JSON.stringify(_tipoVehiculo.data));
            } 
            if (_marcaVehiculo.ok) {
              dispatch( listMarcasVehiculos(_marcaVehiculo.data))
            }else{
              alert(JSON.stringify(_marcaVehiculo.data));
            } 

            if (_conductores.ok) {
              dispatch( listDniConductores(_conductores.data))
            }else{
              alert(JSON.stringify(_conductores.data));
            } 
            if (_carroceria.ok) {
              dispatch( listCarroceriasVehiculos(_carroceria.data))
            }else{
              alert(JSON.stringify(_carroceria.data));
            }

          }).catch(reason => {
            Swal.close();
            alert(JSON.stringify(reason));
          });  

      } catch (error) {
        Swal.close();
        Swal_alert('error', JSON.stringify(error));
      } 
    }
  } 

  export const mostrarInformacion =( estado , estaSegundoPlano )=>{
    return  async(dispatch)=>{ 
      try {

          if(estaSegundoPlano === false){
              Swal.fire({
                icon: 'info', allowOutsideClick: false, allowEscapeKey: false, text: 'Espere por favor'
              })
              Swal.showLoading();
          }
          const res = await vehiculoServices().getMostrarInformacion( estado );
          if(estaSegundoPlano === false) Swal.close(); 

          if (res.ok) {   
            const listMant = res.data.map((row)=>{
              return { ...row, id : row.id_Vehiculo  }
            })
            dispatch(listMantVehiculoCab(listMant));
            dispatch(refrescarDatoPrincipal(false));
          }else{
            alert(JSON.stringify(res.data));
          } 
      } catch (error) {
        if(estaSegundoPlano === false) Swal.close(); 
        console.log(JSON.stringify(error))
        alert(JSON.stringify(error));
      } 
    }
  }

  export const nuevo =()=>{
    return  async(dispatch)=>{ 
      try { 
          dispatch(modalOpen());
          dispatch(modalTitle('NUEVO VEHICULO'));
          dispatch(flagEdicion(false));
          dispatch(objectoEdicion(null));
          ///---combo dependientes
          // dispatch(listCategoriasVehiculos([])); 
          // dispatch(listCarroceriasVehiculos([])); 
      } catch (error) {
        Swal.close();
        Swal_alert('error', JSON.stringify(error));
      } 
    }
  } 

  export const validaciones = async ({ id_TipoVehiculo, nroPlaca_Vehiculo, id_Marca, modelo_vehiculo, id_Categoria, id_Carroceria, anio_Vehiculo, dni_Conductor  }, esEdicion)=>{    

    if (id_TipoVehiculo === 0 || id_TipoVehiculo === '0') {
        Swal_alert('error','Por favor seleccione el Tipo de Vehiculo');
        return false;
    } 
    if (nroPlaca_Vehiculo === '' || nroPlaca_Vehiculo === null) {
      Swal_alert('error','Por favor ingrese el nro de placa');
      return false;
    } 
    if (anio_Vehiculo === '' || anio_Vehiculo === null) {
      Swal_alert('error','Por favor ingrese el año del vehiculo');
      return false;
    } 
    if (id_Marca === 0 || id_Marca === '0') {
      Swal_alert('error','Por favor la marca');
      return false;
    } 
    if (modelo_vehiculo === '' || modelo_vehiculo === null) {
      Swal_alert('error','Por favor ingrese el modelo del vehiculo');
      return false;
    }

    // if (id_Categoria === 0 || id_Categoria === '0') {
    //   Swal_alert('error','Por favor seleccione la Categoria');
    //   return false;
    // } 
    if (id_Carroceria === 0 || id_Carroceria === '0') {
      Swal_alert('error','Por favor seleccione la Carroceria');
      return false;
    } 

    if ( esEdicion === false ) {
      const {data : res}  = await vehiculoServices().validarVehiculo( nroPlaca_Vehiculo );
      if (res.ok) {
        if (res.data) {
          Swal_alert('error','Ya se agrego un vehiculo con este Nro de Placa verifique...');
          return false;
        }
      }else{
        alert(JSON.stringify(res.data)); 
        return false;
      }
    }
    return true;
  }

  export const save =(objMantenimiento)=>{
    return  async(dispatch)=>{ 
      try {
          Swal.fire({
            icon: 'info', allowOutsideClick: false, allowEscapeKey: false, text: 'Espere por favor'
          })
          Swal.showLoading();
          const {data : res}  = await vehiculoServices().save(objMantenimiento);
          Swal.close();
          if (res.ok) {
            Swal_alert('success','Se registro correctamente..');
            dispatch(refrescarDatoPrincipal(true));
            dispatch(modalClose());
          }else{
            Swal_alert('error', JSON.stringify(res.data));
          } 
      } catch (error) {
        Swal.close();
        Swal_alert('error', JSON.stringify(error));
      } 
    }
  }
 
  export const editar =(objEdicion)=>{
    return  async(dispatch)=>{ 
      try {
        
          dispatch(objectoEdicion(null));
          dispatch(flagEdicion(true)); 
          dispatch(modalTitle('EDITAR VEHICULO'));                    
          dispatch(objectoEdicion(objEdicion)); 
          dispatch(modalOpen());

          // ///---combo dependientes
          // dispatch(listCategoriasVehiculos([])); 
          // dispatch(listCarroceriasVehiculos([]));         

          // Swal.fire({
          //   icon: 'info', allowOutsideClick: false, allowEscapeKey: false, text: 'Espere por favor'
          // })
          // Swal.showLoading();      
          // Promise.all([vehiculoServices().categoriaVehiculo(objEdicion.id_TipoVehiculo), vehiculoServices().carroceriaVehiculo(objEdicion.id_Categoria)  ])
          //   .then(([ res, resCarroceria ])  => {
          //   Swal.close();    
          //   if (res.ok) {    
          //     // ---cargando Combos contrato---        
          //     dispatch(listCategoriasVehiculos(res.data));         
          //     dispatch(listCarroceriasVehiculos(resCarroceria.data));   

          //     dispatch(flagEdicion(true)); 
          //     dispatch(modalTitle('EDITAR VEHICULO'));                    
          //     dispatch(objectoEdicion(objEdicion)); 
          //     dispatch(modalOpen());
          //   }else{
          //     alert(JSON.stringify(res.data));
          //   }          
          // }).catch(reason => {
          //   Swal.close();
          //   alert(JSON.stringify(reason));
          // });            
  
      } catch (error) {
        Swal.close();
        Swal_alert('error', JSON.stringify(error));
      } 
    }
  }   
  
  export const update =(objMantenimiento)=>{
    return  async(dispatch)=>{ 
      try {

          Swal.fire({
            icon: 'info', allowOutsideClick: false, allowEscapeKey: false, text: 'Espere por favor'
          })
          Swal.showLoading();
          const {data : res}  = await vehiculoServices().update( objMantenimiento.id_Vehiculo, objMantenimiento);
          Swal.close();
          if (res.ok) {     

            Swal_alert('success','Se Actualizo correctamente..');
            dispatch(refrescarDatoPrincipal(true));
            dispatch(modalClose());

          }else{
            Swal_alert('error', JSON.stringify(res.data));
          } 
      } catch (error) {
        Swal.close();
        Swal_alert('error', JSON.stringify(error));
      } 
    }
  }

  export const anular =( id_Vehiculo, id_usuario )=>{
    return  async(dispatch)=>{ 
      try {
          Swal.fire({
            icon: 'info', allowOutsideClick: false, allowEscapeKey: false, text: 'Anulando, Espere por favor'
          })
          Swal.showLoading();
          const res = await vehiculoServices().anular(id_Vehiculo, id_usuario);
          Swal.close();
          if (res.ok) { 

            Swal_alert('success','Se anulo correctamente.'); 
            dispatch(refrescandoEstadoVehiculo(id_Vehiculo));  
 
          }else{
            alert(JSON.stringify(res.data)); 
          } 
      } catch (error) {
        Swal.close();
        Swal_alert('error', JSON.stringify(error));
      } 
    }
  }

  export const categoriaTipoVehiculo =(idTipoVehiculos)=>{
    return  async(dispatch)=>{ 
      try {

         if (String(idTipoVehiculos) === '0') {
            // dispatch(listCategoriasVehiculos([])); 
            // dispatch(listCarroceriasVehiculos([])); 
         }else{
            Swal.fire({
              icon: 'info', allowOutsideClick: false, allowEscapeKey: false, text: 'Obteniendo las Categorias de los Vehiculos, Espere por favor'
            })
            Swal.showLoading();
            const res = await vehiculoServices().categoriaVehiculo(idTipoVehiculos);
            Swal.close();
            if (res.ok) {   
              dispatch(listCategoriasVehiculos(res.data)); 
              return true;
            }else{
              alert(JSON.stringify(res.data));
              return false;
            } 
         }
      } catch (error) {
        Swal.close();
        alert(JSON.stringify(error));
        return false;
      } 
    }
  }
  
  export const carroceriaTipoVehiculo =(idCategoria)=>{
    return  async(dispatch)=>{ 
      try {

         if (String(idCategoria) === '0') {
            dispatch(listCarroceriasVehiculos([])); 
         }else{
            Swal.fire({
              icon: 'info', allowOutsideClick: false, allowEscapeKey: false, text: 'Obteniendo las Carrocerias de los Vehiculos, Espere por favor'
            })
            Swal.showLoading();
            const res = await vehiculoServices().carroceriaVehiculo(idCategoria);
            Swal.close();
            if (res.ok) {   
              dispatch(listCarroceriasVehiculos(res.data)); 
              return true;
            }else{
              alert(JSON.stringify(res.data));
              return false;
            } 
         }
      } catch (error) {
        Swal.close();
        alert(JSON.stringify(error));
        return false;
      } 
    }
  }




export const { listMantVehiculoCab, listTiposVehiculos, listMarcasVehiculos,listCategoriasVehiculos, listCarroceriasVehiculos, listDniConductores , refrescandoEstadoVehiculo} = vehiculoSlice.actions;

export default vehiculoSlice.reducer;