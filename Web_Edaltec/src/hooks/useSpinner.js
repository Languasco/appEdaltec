
import { useState } from 'react';

export const useSpinner = ( initialState ) => {

    const [ spinner , setSpinner ] = useState(initialState);

    const spinnerShow = () => {
        setSpinner( true );
    }

    const spinnerHide = () => {
        setSpinner( false ); 
    }

    return [ spinner , spinnerShow , spinnerHide ];

}