import axios from 'axios';
const { createSlice } = require("@reduxjs/toolkit");
const URL = process.env.REACT_APP_API_URL;

const initialState = {
    user_logueado : false,
    checking : true,
    id : '',
    name : '',
    menu : []
}

const loginSlice = createSlice({ 
    name : 'login',
    initialState,
    reducers : {
        logOut(state, action){
            return {
                ...initialState,
                checking : false,
            }  
        },
        login(state, action){
            return {
                ...state,
                user_logueado : true,
                checking : false,
                id : action.payload.id_usuario ,
                name : action.payload.nombre_usuario ,
                menu : action.payload.menuPermisos
            }  
        },
    }
})

export const { logOut, login } = loginSlice.actions;


export const set_login = ({ usuario, password })=>{
    return  async(dispatch)=>{
      try {
        const parametros = {
          'opcion' : 1,
          'filtro' : usuario + '|' + password
         }
         const {data : res} = await axios.get(URL + 'login', {params: parametros} );

         console.log(res)


         if (res.ok) {
           localStorage.setItem('dataEdaltec', JSON.stringify(res.data));
           dispatch(login(res.data))
           return true;
         }else{
           alert(JSON.stringify(res.data));
           return false;
         }   

      } catch (error) {
        console.log(error)
        alert(JSON.stringify(error));
        return false;
      } 
    }
}

export const verifyLogin = ()=>{
  return (dispatch)=>{ 
    const data =  JSON.parse(localStorage.getItem("dataEdaltec"));    
    if (data) {
      dispatch(login(data));
    }else{
      dispatch(logOut());
    }
  }
}

export const set_logOut = ()=>{
  return (dispatch)=>{
      localStorage.removeItem('dataEdaltec');
      dispatch(logOut())
  }
}



export default loginSlice.reducer;