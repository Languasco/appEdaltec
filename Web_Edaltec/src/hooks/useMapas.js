import { useState } from "react";

export const useMapas = () => {

    const [latitud_longitud, setLatitud_longitud] = useState({ latitud : '', longitud : '' }); 

    const asignar_latitudLongitud = (lat_long) => {
      setLatitud_longitud( lat_long );
    }
 

  return (
    [ latitud_longitud , asignar_latitudLongitud]
  )
}
