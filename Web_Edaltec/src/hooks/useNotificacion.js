import { useState } from "react";

 
export const useNotificacion = (initialState) => {

    //----- notificaciones-----
    const [notification, setNotification] = useState(false);    
    const [objNotification, setObjNotification] = useState(initialState);

    const openNotification = (event, reason) => {
        setNotification(true);
    };

    const closeNotification = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }  
        setNotification(false);
    };

    const assignNotification = (newObjectoNotification)=>{
        setObjNotification(newObjectoNotification);
    }

    return { notification, openNotification, closeNotification, objNotification, assignNotification }
}
