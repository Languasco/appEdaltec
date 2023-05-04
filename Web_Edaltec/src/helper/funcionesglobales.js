
 export const formatoFecha = (fecha) => {

    var date = new Date(fecha); 
    var d = date.getDate();
    var m = date.getMonth() + 1; //Month from 0 to 11
    var y = date.getFullYear();
    
    const fechaFormat =  (d <= 9 ? '0' + d : d) + '/' + (m<=9 ? '0' + m : m) + '/' + y;

    return fechaFormat;
  }
  
  export const formatoFechaI = (fecha) => {

    var date = new Date(fecha); 
    var d = date.getDate();
    var m = date.getMonth() + 1; //Month from 0 to 11
    var y = date.getFullYear();

    const fechaFormat =  y + '/' +  (m<=9 ? '0' + m : m) + '/' + (d <= 9 ? '0' + d : d) ;

    return fechaFormat;
  }


  export const formatoFechaIngles = (campo) => {
    var info = campo.split('/').reverse().join('-');
    return info;
  }

  export const formatoSoloHoras = (fecha) => {
    var time = new Date(fecha); 
    return time.toLocaleString('en-GB', { hour: 'numeric', minute: 'numeric' });
   }
  

   export const BorrarTodoArray = ( arreglo)=> {
    if( arreglo.length > 0){
      arreglo.splice(0,arreglo.length + 1);
    }
  }

  export const  obtenerTodos_IdPrincipal = (listDatos, campoID)=> {
    var listIDs = [];    
    for (let obj of listDatos) {
      listIDs.push(obj[""+campoID+""]);
    }
    return listIDs;
  }

  export const obtenerCheck_IdPrincipal = (listDatos , campoID)=> {
    var listIDs = [];    
    for (let obj of listDatos) {
      if (obj.checkeado) {
       listIDs.push(obj[""+campoID+""]);
      }
    }
    return listIDs;
  }

  export const  obtenerCheck_IdPrincipal_new = (listDatos, campoID)=> {
    var listIDs = [];    
    for (let obj of listDatos) {
      if (obj.marcado) {
       listIDs.push(obj[""+campoID+""]);
      }
    }
    return listIDs;
  }

  export const verificarCheck_marcado = (listDatos)=> {
   let flag_marco =false;
    for (let obj of listDatos) {
      if (obj.checkeado) {
        flag_marco = true;
        break;
      }
    }
    return flag_marco;
  }
  
  export const verificar_soloNumeros =  (event)=> {
    const pattern = /[0-9\+\-\. ]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode !== 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }
  
  export const  verificar_soloNumeros_sinPunto = (e)=> {
    const key = window.event ? e.which : e.keyCode;
    if (key < 48 || key > 57) {
      e.preventDefault();
    }
  }

  
  export const anioActualSistema =  (today)=> {
    const year = today.getFullYear();
    return year;
  }
  export const  mesActualSistema = (today)=> {
     const month = today.getMonth();
    return month;
  }

  export const restarMesesFechaActual = (nroMeses)=> {
    var newdate = new Date();
    newdate.setMonth(newdate.getMonth() - nroMeses);
    return new Date(newdate);
  }  
  


  export const verificar_tamanioArchivo = (fileSize, maximoBytes )=> {
    if (fileSize > maximoBytes) {
      return true; 
    }else{
      return false; 
    } 
  }

  export const formatoFechaSistema = () => {

    var date = new Date(); 
    var d = date.getDate();
    var m = date.getMonth() + 1; //Month from 0 to 11
    var y = date.getFullYear();

    const fechaFormat =  y + '/' +  (m<=9 ? '0' + m : m) + '/' + (d <= 9 ? '0' + d : d) ;

    return fechaFormat;
  }

  export const mesesGeneral = () =>{
    return  [{mes : 1 , valor: 'Enero'}  , {mes : 2 , valor: 'Febrero'} , {mes : 3 , valor: 'Marzo'} , {mes : 4 , valor: 'Abril'} , {mes : 5 , valor: 'Mayo'} , {mes : 6 , valor: 'Junio'}, 
        {mes : 7 , valor: 'Julio'}  , {mes : 8 , valor: 'Agosto'} , {mes : 9 , valor: 'Setiembre'} , {mes : 10 , valor: 'Octubre'} , {mes : 11 , valor: 'Nombre'} , {mes : 12 , valor: 'Diciembre'}, 
    ]
  }


  export const  obtenerValorComboSelect2Multiples = (listComboMultiple,listCombo,nombreID )=>{ 
    let listaRetorno=[]; 
        if(listComboMultiple.length == 1) {
            if(listComboMultiple[0]=='0'){
              for (const iterator of listCombo) {     
                listaRetorno.push(iterator[nombreID]);        
              }
            }else{
              listaRetorno= [...listComboMultiple];
            }
        }else{
          listaRetorno= listComboMultiple.filter(item => item != 0);       
        }
        return listaRetorno
   }