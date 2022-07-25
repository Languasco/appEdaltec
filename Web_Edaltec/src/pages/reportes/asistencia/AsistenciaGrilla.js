import React, { useState } from 'react'
import { Link,  makeStyles,  Paper } from '@material-ui/core';
import {  Row, Col  } from 'react-bootstrap';
import { DataGrid, esES } from '@material-ui/data-grid'
import {  useSelector } from 'react-redux';

import MiModalDialog from '../../../components/shared/controls/MiModalDialog';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
// import RoomIcon from '@material-ui/icons/Room';
import CardMedia from '@material-ui/core/CardMedia';

// import apiKeyGoogleMaps from '../../../helper/apiKeyGoogleMaps';
// import { useMapas } from '../../../hooks/useMapas';
// import Mymap from '../../../components/mapas/Mymap';

import  './asistencia.css';
 
const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%', 
    },
    formControl: {
      margin: theme.spacing(1),
      width: '99%',
    },
    rootCard: {
      paddingBottom: 5
    }, 
    styleIconoMapa : {
      color: 'red',
      fontSize: '25px',
      cursor:'pointer'
    }
  }));



export const AsistenciaGrilla = () => {

    const classes = useStyles(); 

    //----usando el hook  redux
  // const dispatch = useDispatch();
  const { reporteAsistenciaCab, tipoReporte } = useSelector(state => state.reporte_asistencia);
 
   //----- modal para ver la imagen ----
  const [showModalImg, setShowModalImg] = useState(false);
  const [imagenSeleccionada, setImagenSeleccionada] = useState([]);

    //  //----- modal para ver el mapa ----
    //  const [showModalMapa, setShowModalMapa] = useState(false);

    //  //// mapas---
    //  const [ {latitud, longitud}, asignar_latitudLongitud] = useMapas();
 

  const estructuraTablaInformacion = ()=>{
    if (Number(tipoReporte) === 1){
        return  [
            { field: 'id', headerName: '#', width: 120 },
            { field: 'fechaAsistencia', headerName: 'FECHA ASISTENCIA ', width: 300 },
            { field: 'placa', headerName: 'PLACA', width: 150},
            { field: 'supervisor', headerName: 'SUPERVISOR', width: 150},
            { field: 'personal', headerName: 'PERSONAL', width: 150},
            {
                field: "foto",
                headerName: "FOTO",
                sortable: false,
                width: 80,
                align: "center",
                renderCell: (params) => {
                    const onClickFoto = (e) => {
                        e.stopPropagation(); // don't select this row after clicking     
                        handleClick_verFoto(params.row,1);
                    };    
        
                    return (
                        <>    
                            {params.row.foto &&                     
                                <Link  className='cargando'  onClick={onClickFoto} > Ver </Link>             
                            }
                       </>
                    )
                }
            },
            {
                field: "fotoGrupal",
                headerName: "FOTO GRUPAL",
                sortable: false,
                width: 120,
                align: "center",
                renderCell: (params) => {
                    const onClickFotoGrupal = (e) => {
                        e.stopPropagation(); // don't select this row after clicking     
                        handleClick_verFoto(params.row,2);
                    };            
                    return (
                        <>    
                            {params.row.foto &&                     
                                <Link  className='cargando'  onClick={onClickFotoGrupal} > Ver </Link>             
                            }
                       </>
                    )
                }
            },
            // {
            //     field: "action",
            //     headerName: "UBICACION",
            //     sortable: false,
            //     width: 130,
            //     align: "center",
            //     renderCell: (params) => {
            //         const onClick = (e) => {
            //             e.stopPropagation(); // don't select this row after clicking     
            //             handleClick_verMapa(params.row);
            //         };            
            //         return (
            //         <>
            //            {params.row.latitud &&                     
            //                <RoomIcon  className={classes.styleIconoMapa}    onClick={onClick}  />          
            //            }              
            //         </>
            //         )
            //     }
            // },
          ];
    }else{
       return [
        { field: 'id', headerName: '#', width: 120 },
        { field: 'cargo', headerName: 'CARGO ', width: 300 },
        { field: 'nombrePersonal', headerName: 'NOMBRE PERSONAL', width: 300},
        { field: 'diasTrabajo', headerName: ' DIA DE TRABAJO', width: 130 , align: "right",},
      ]
    }

  }

  const columns = estructuraTablaInformacion();
  
  const handleClick_verFoto = (objFoto, tipo)=>{
    setShowModalImg(true);
    setImagenSeleccionada([ {id_Asistencia : objFoto.id_Asistencia ,  url : ( tipo === 1 ? objFoto.foto : objFoto.fotoGrupal  )   } ]);
  } 

  // const handleClick_verMapa = (obj)=>{
  //   setShowModalMapa(true);
  //   asignar_latitudLongitud( { latitud : obj.latitud, longitud : obj.longitud }); 
  // }  

  const handleModalClose = ()=>{
    setShowModalImg(false);
  }

  // const handleModal_mapaClose = ()=>{
  //   setShowModalMapa(false);
  // }



  return (
    <Paper className='mt-1'>
        {
            Number(tipoReporte) === 1 
            ? 
            <Row  >
                <div style={{ height: 500, width: '100%' }}>
                    <DataGrid
                        rows={reporteAsistenciaCab}
                        columns={columns}
                        pageSize={10}
                        rowsPerPageOptions={[10, 20, 50]}
                        // checkboxSelection
                        onSelectionModelChange={(ids) => {      
                            console.log(ids);
                        }}      
                        localeText={esES.props.MuiDataGrid.localeText}                                          
                    />
                </div>
            </Row> 
            : 
            <Row  >
                <div style={{ height: 500, width: '100%' }}>
                    <DataGrid
                        rows={reporteAsistenciaCab}
                        columns={columns}
                        pageSize={10}
                        rowsPerPageOptions={[10, 20, 50]}
                        // checkboxSelection
                        onSelectionModelChange={(ids) => {      
                            console.log(ids);
                        }}      
                        localeText={esES.props.MuiDataGrid.localeText}                                         
                    />
                </div>
            </Row> 
        }


        {
          showModalImg &&   
          <MiModalDialog fullWidth = {true} maxWidth = 'sm' showModal={showModalImg} titleModal='Foto'  closeModal = {handleModalClose}  > 
            <Row>
                <Col  lg={ 12 } >
                    <Paper elevation={3}   >    
                            {imagenSeleccionada.map((foto) => (    
                                  <Card key={foto.id_Asistencia}  className={classes.rootCard}>
                                        <CardActionArea>                                     
                                            <CardMedia
                                              component="img"
                                              alt="Imagenes Asistencia"
                                              height="240"
                                              image={foto.url}
                                              title={foto.url}
                                              className="imgContentModal"
                                            />                                     
                                        </CardActionArea>
                                        <CardActions>
                                        </CardActions>
                                </Card>                              
                            ))}
                    </Paper> 
                </Col> 
            </Row>            
          </MiModalDialog >
        }

        {/* {
          showModalMapa &&   
          <MiModalDialog fullWidth = {true} maxWidth = 'sm' showModal={showModalMapa} titleModal='Mapa'  closeModal = {handleModal_mapaClose}  > 
            <Row>
                <Col  lg={ 12 } >
                    <Mymap 
                          latitud = {latitud}
                          longitud = {longitud}
                          googleMapURL= {apiKeyGoogleMaps.mapsKey}
                          loadingElement= {<p> Cargando ....</p>}
                          containerElement={<div style={{ height: `400px` }} />}
                          mapElement={<div style={{ height: `100%` }} />}
                    /> 
                </Col> 
            </Row>            
          </MiModalDialog >
        } */}

    </Paper>
  )
}
