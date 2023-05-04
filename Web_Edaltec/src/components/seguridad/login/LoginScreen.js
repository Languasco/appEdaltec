import React from 'react'
import { useDispatch } from 'react-redux';
// import { set_login } from '../../../action/seguridad/login';
import { Swal_alert } from '../../../helper/alertas';
import { useForm } from '../../../hooks/useForm';
import { useSpinner } from '../../../hooks/useSpinner';
import { Spinner } from '../../shared/Spinner';
import  './login.css';
import  logo from '../../../assets/images/logoEdaltec.png';
import { set_login } from '../../../redux/slice/seguridad/loginSlice';
 
export const LoginScreen = () => {

     //----usando el hook  redux
     const dispatch = useDispatch();     

    //  const [ formParams, handleInputChange ] = useForm({ usuario : 'D', password : '123' })
    const [ formParams, handleInputChange ] = useForm({ usuario : '', password : '' })
     const { usuario, password } = formParams;

     ///---- cargando el spinner -------
     const [ spinner , spinnerShow, spinnerHide  ]  = useSpinner(false);
    ///---- fin  cargando el spinner -------

     const handleLogin = async(e) => {
        e.preventDefault();

        if ( String(usuario).length === 0 ) {
            Swal_alert('error', 'Por favor ingrese el usuario');
            return
        }
        if ( String(password).length === 0 ) {
            Swal_alert('error', 'Por favor ingrese el password');
            return
        }
        spinnerShow();
        const resp = await dispatch(set_login(formParams));  
        if (resp === false) {
            spinnerHide();
        } 
     }

    return (
        <>
            {
               ( spinner )  &&  <Spinner loading = { spinner }  /> 
            } 
           <div className="wrapper fadeInDown">
                <div id="formContent">
                    <br/>
                    <h2 className="active"> GESTION DE ORDENES DE TRABAJO  </h2>
 
                    <div className="fadeIn first">
                        <br/> 
                        <img src={logo}  alt="Icono del Proyecto"  /> 
                    </div>
                    <br/>
                    <form onSubmit={ handleLogin } >
                        <input type="text" id="login" className="fadeIn second inputLogin" name="usuario" value= { usuario  }  onChange={ handleInputChange }  placeholder="usuario"  autoComplete="off"   />
                         <input  id="password" type= "password" className="fadeIn third inputLogin " name="password" value= { password }  onChange={ handleInputChange  }  placeholder="password"/>   
                        <input type="submit" className="fadeIn fourth"  value="Log In"  />  
                    </form> 
                    <div id="formFooter">
  
                    </div>
                </div>
            </div>
        </>
    )
}
