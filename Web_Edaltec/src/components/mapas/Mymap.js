import { withGoogleMap, GoogleMap, Marker, withScriptjs} from "react-google-maps" 

const Mymap = ({ latitud , longitud }) => { 
  return (
    <GoogleMap
    defaultZoom={8}
    defaultCenter={{ lat: -12.0553017, lng: -77.0626949 }}
    >
      <Marker position={{ lat: Number(latitud ), lng: Number(longitud)}} />
    </GoogleMap>
  )
}

export default withScriptjs(
    withGoogleMap(
      Mymap
    )
)