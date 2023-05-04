import { useState } from "react";

export const useComboBuscador = (initialState) => {

 const [valueComboBuscador, setValueComboBuscador] = useState(initialState);

 const asignarComboBuscador =(nuevoValor)=>{
    setValueComboBuscador(nuevoValor);
 }

 const limpiarComboBuscador =()=>{
   setValueComboBuscador(initialState);
 }

 return[ valueComboBuscador,asignarComboBuscador, limpiarComboBuscador ]
}
