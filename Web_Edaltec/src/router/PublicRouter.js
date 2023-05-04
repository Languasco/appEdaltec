import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router';

export const PublicRouter = ({children}) => {
   ///--- sirve para obtener datos del reducer ---
   const { user_logueado }  = useSelector(state => state.login); 

   const URL_DOMINIO = process.env.REACT_APP_DOMAIN;
   return  (user_logueado === false) ? children : <Navigate to={URL_DOMINIO} />
}
