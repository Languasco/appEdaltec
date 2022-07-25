
import React, { useState }  from 'react';
import {  Button, makeStyles, Paper } from '@material-ui/core' 
import { Col, Row } from 'react-bootstrap';
 

import { useDispatch, useSelector } from 'react-redux';
import { MiInputFile } from '../../../components/shared/controls/MiInputFile';
  
import SaveIcon from '@material-ui/icons/Save';
import AddCircleRoundedIcon from '@material-ui/icons/AddCircleRounded';

import { Swal_alert, Swal_Question } from '../../../helper/alertas';
import { anularFotoTab4, descargarTodasFotosTab4, subirFotosTab4 } from '../../../redux/slice/procesos/registroOTSlice';
 
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';

import MiModalDialog from '../../../components/shared/controls/MiModalDialog';

import  './registroOT.css';

import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import { useFile } from '../../../hooks/useFile';
  
const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%', 
    },
    formControl: {
      margin: theme.spacing(1),
      width: '99%',
    },
    rootTab: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.paper,
    },
    rootCard: {
      // maxWidth: 345,
      paddingBottom: 5
    },
    media: {
      width: '100%',
      marginLeft: 'auto',
      marginRight: 'auto'
    },
    fotoGrilla:{
      width: '100%',
      height: '150px!important'
    },
    tituloFotoGrilla:{
      fontSize: '11px',
      textDecoration: 'underline',
      color: '#003575'
    }
  }));

export const FotosForm = () => {

    const classes = useStyles(); 
    
    //----usando el hook  redux 
    const dispatch = useDispatch();  

    const { id : id_usuarioGlobal } = useSelector(state => state.login);  
    const { fotosTab4, id_OrdenTrabajo_Global } = useSelector(state => state.proceso_registroOT);    

    // const [files, setFiles] = useState([]);
    // const [selectedFiles, setSelectedFiles] = useState('Seleccione imagen . . .');
    // const [cleanfiles, setClearfiles] = useState(false);
    // const [disableInputFile, setDisable] = React.useState(false);

    const [ files, assignFiles, selectedFiles, assignFileDescription, cleanfiles , assignCleanfiles , disableInputFile , assignDisabledInputFile ]  = useFile('Seleccione imagen . . .')

    const [showModalImg, setShowModalImg] = React.useState(false);
    const [imagenSeleccionada, setImagenSeleccionada] = useState([]);
 
    const handle_FileChange= (event) =>{    
        const filesTemporal = event.target.files;
        let files = [];
        for (var i = 0; i < filesTemporal.length; i++) { //for multiple files          
            files.push({
                'file': filesTemporal[i],
                'namefile': filesTemporal[i].name
            })  
        }
        //----almacenando la imagen--------
        assignFiles(files);

        const cantFile = files.length;
        if(cantFile === 1){
          assignFileDescription(files[0].file.name);
        }else{
          assignFileDescription( cantFile + ' archivos seleccionados ..' );
        }

    }

    const handleSubirFile = () => {  
      if (files.length === 0) {
          Swal_alert('error', 'Por favor seleccione alguna imagen..');
          return;
      }
      dispatch(subirFotosTab4(files,id_OrdenTrabajo_Global, id_usuarioGlobal));
      assignDisabledInputFile(true);
  };

  const handleLimpiarFile = ()=>{
    assignFiles([]);
    assignFileDescription('Seleccione imagen . . .');
    assignCleanfiles(true);
    assignDisabledInputFile(false);
  }

  const handleClickImg = (objFoto)=>{
      setShowModalImg(true);
      setImagenSeleccionada([objFoto]);
  }

  const handleModalClose = ()=>{
    setShowModalImg(false);
  }

  const handleClick_Anular = ({ id_OrdenTrabajo_Foto})=>{ 
    Swal_Question('Sistemas', 'Esta seguro de anular la imagen ?')
    .then((result)=>{
      if(result.value){    
        dispatch(anularFotoTab4(id_OrdenTrabajo_Foto, id_usuarioGlobal));
        handleModalClose();
      }
    })        
  } 

  
  const handleClick_descargar= ()=>{       
    if (fotosTab4.length === 0) {
      return;
    }    
    dispatch(descargarTodasFotosTab4(id_OrdenTrabajo_Global, id_usuarioGlobal));
  }

  return (
    <>
        <Row>
            <Col  lg={ 12 } >
                <Paper elevation={3}   >
                    <div className='title-form' >
                        <h6>  Fotos </h6>                    
                   </div> 
 
                      <form className={classes.formControl} noValidate autoComplete="off">
                        <Row>
                          <Col md={12} lg={6} >
                              <MiInputFile id='idFile' disable={disableInputFile} accept = 'image/jpeg' multiple ={true}  typeFile = 'imagen'  selectedFile ={selectedFiles} clearFile = {cleanfiles} onChange = { handle_FileChange }  /> 
                          </Col>
                          <Col md={12} lg={6} >
                                <Button disabled={disableInputFile} startIcon={<SaveIcon />}  variant="contained" color="primary" onClick={()=>handleSubirFile() }> Adjuntar </Button> 
                                <Button startIcon={<AddCircleRoundedIcon />}  variant="contained" color='secondary'  onClick={  ()=>handleLimpiarFile() }>Limpiar </Button> 
                                <Button startIcon={<CloudDownloadIcon />}  variant="contained" color="default"  onClick={ handleClick_descargar }> Descargar </Button> 
                          </Col>
                          </Row>  
                      </form>   
 
                        
                    <Row className='p-2'>
                        {fotosTab4.map((foto, index) => (      
                              <Col key={foto.id_OrdenTrabajo_Foto} xs={6} sm={4} md={3} lg={2}  className='imgContent' >
                                <Card className={classes.rootCard}>
                                    <CardActionArea onClick={()=>handleClickImg(foto)}>
                                        <CardMedia
                                          className={classes.fotoGrilla}
                                          component="img"
                                          alt="Imagenes OT"
                                          image={foto.Url_Foto_Ubicacion}
                                          title={foto.Url_Foto_Nombre}
                                        />
                                        <CardContent>
                                             <p  className={classes.tituloFotoGrilla} > {foto.Url_Foto_Nombre } </p>                                                        
                                        </CardContent>
                                    </CardActionArea>
                                </Card>
                              </Col>              
                        ))}
                    </Row>       
                </Paper> 
            </Col> 
      </Row>  



        {
          showModalImg &&   
          <MiModalDialog fullWidth = {true} maxWidth = 'sm' showModal={showModalImg} titleModal='Foto'  closeModal = {handleModalClose}  > 
            <Row>
                <Col  lg={ 12 } >
                    <Paper elevation={3}   >    
                            {imagenSeleccionada.map((foto) => (    
                                    <Card key={foto.id_OrdenTrabajo_Foto}  className={classes.rootCard}>
                                        <CardActionArea>                                     
                                            <CardMedia
                                              component="img"
                                              alt="Imagenes OT"
                                              height="240"
                                              image={foto.Url_Foto_Ubicacion}
                                              title={foto.Url_Foto_Nombre}
                                              className="imgContentModal"
                                            />                                     
                                            {/* <CardContent>
                                              <Typography gutterBottom variant="h6" component="h6"> {foto.Url_Foto_Nombre } </Typography>   
                                            </CardContent> */}
                                        </CardActionArea>
                                        <CardActions>
                                            <Button size="small" variant='contained' color="secondary" onClick={() => handleClick_Anular(foto)} >
                                                Anular
                                            </Button>
                                        </CardActions>
                                    </Card>                              
                            ))}
                    </Paper> 
                </Col> 
            </Row>            
          </MiModalDialog >
        }
    </>


  )
}


