import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {
    BrowserRouter,
    Routes,
    Route
  } from "react-router-dom";

import { LoginScreen } from '../components/seguridad/login/LoginScreen';
import { Spinner } from '../components/shared/Spinner';
import { useSpinner } from '../hooks/useSpinner';
import { verifyLogin } from '../redux/slice/seguridad/loginSlice';
import { DashboardRoutes } from './DashboardRoutes';
import { PrivateRouter } from './PrivateRouter';
import { PublicRouter } from './PublicRouter';
 
export const AppRouter = () => {

    //----usando el hook  redux
    const dispatch = useDispatch();
    
   ///--- sirve para obtener datos del reducer ---

   const { user_logueado, checking }  = useSelector(state => state.login);
    ///---- cargando el spinner -------
     const [ spinner  ]  = useSpinner(true);
    ///---- fin  cargando el spinner -------


    useEffect(() => {
        let mounted = true;
        if(mounted){
            dispatch(verifyLogin());
        }
        return () => mounted = false;
    }, [dispatch])


    if (checking === true &&  user_logueado === false ) {
        return (<Spinner loading = { spinner }  /> )
    }
    const URL_DOMINIO = process.env.REACT_APP_DOMAIN;
    return (
        <div>
            <BrowserRouter>
                <Routes>
                        <Route path={URL_DOMINIO + 'login'} element={
                                                    <PublicRouter >
                                                        <LoginScreen />
                                                    </PublicRouter>
                                            } /> 
                        <Route path="/*" element={
                                <PrivateRouter >
                                    < DashboardRoutes />
                                </PrivateRouter>
                        } />                    
                </Routes>
            </BrowserRouter>
        </div>

    )
}
