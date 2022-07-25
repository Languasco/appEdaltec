import React, { useEffect, useRef, useState } from 'react';
import { makeStyles, Paper, Snackbar  } from '@material-ui/core' 
import { Col, Row, Table  } from 'react-bootstrap';
import { MiButton } from '../../../components/shared/controls/MiButton';
import BlockIcon from '@material-ui/icons/Block';
import AttachmentIcon from '@material-ui/icons/Attachment';

import { useDispatch, useSelector } from 'react-redux';
import { anularArchivosCargadoEvidencia, flagTerminoCargaArchivo, subirArchivoEvidencias } from '../../../redux/slice/procesos/registroOTSlice';
import { Swal_alert, Swal_Question } from '../../../helper/alertas';
import { Alert, AlertTitle } from '@material-ui/lab';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import { useNotificacion } from '../../../hooks/useNotificacion';

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
  }));
 
 
export const ListaEvidenciaForm = () => {

    const inputPdf = useRef();
    const inputEscaneo = useRef();
    const inputCroquis = useRef();
    const inputVereda = useRef();

    const classes = useStyles();  

    //----usando el hook  redux
    const dispatch = useDispatch();  

    const { id : id_usuarioGlobal } = useSelector(state => state.login);  
    const { archivosEvidencias, id_OrdenTrabajo_Global , flag_terminoCargaArchivos} = useSelector(state => state.proceso_registroOT);    

    const [files, setFiles] = useState([]);
    const [filesEscaneo , setFilesEscaneo ] = useState([]);
    const [filesCroquis, setFilesCroquis ] = useState([]);
    const [filesVereda , setFilesVereda ] = useState([]);    

    //  //----- notificaciones-----
    const {  notification, openNotification, closeNotification, objNotification, assignNotification } = useNotificacion({
        nombre_usuario_creacion : '',
        fecha_creacion : '',
        nombre_usuario_edicion : '',
        fecha_edicion:  ''
    })

    useEffect(() => {
        const {tipoCarga , estaCompletadoCarga } = flag_terminoCargaArchivos;
        if (estaCompletadoCarga === true) {
            if (tipoCarga === 1){
                setFiles([]);
                inputPdf.current.value = "";
            }
            else if (tipoCarga === 2){
                setFilesEscaneo([]);
                inputEscaneo.current.value = "";
            }
            else if (tipoCarga === 3){
                setFilesCroquis([]);
                inputCroquis.current.value = "";
            }
            else if (tipoCarga === 4){
                setFilesVereda([]);
                inputVereda.current.value = "";
            } 
            dispatch(flagTerminoCargaArchivo({ tipoCarga : 0, estaCompletadoCarga: false }));  
        }
    }, [flag_terminoCargaArchivos, dispatch])
          
    const handleSubirFile = async(tipoCarga) => { 
        if (tipoCarga === 1){
            if (files.length === 0) {
                Swal_alert('error', 'Por favor seleccione el archivo de PDF');
                return;
            }
            dispatch(subirArchivoEvidencias(files,id_OrdenTrabajo_Global, id_usuarioGlobal, tipoCarga))
        }
        else if (tipoCarga === 2){
            if (filesEscaneo.length === 0) {
                Swal_alert('error', 'Por favor seleccione el archivo de Escaneos' );
                return;
            } 
            dispatch(subirArchivoEvidencias(filesEscaneo,id_OrdenTrabajo_Global, id_usuarioGlobal, tipoCarga))
        }
        else if (tipoCarga === 3){
            if (filesCroquis.length === 0) {
                Swal_alert('error', 'Por favor seleccione el archivo de Croquis');
                return;
            } 
            dispatch(subirArchivoEvidencias(filesCroquis,id_OrdenTrabajo_Global, id_usuarioGlobal, tipoCarga))
        }
        else if (tipoCarga === 4){
            if (filesVereda.length === 0) {
                Swal_alert('error', 'Por favor seleccione el archivo de Vereda');
                return;
            }
            dispatch(subirArchivoEvidencias(filesVereda,id_OrdenTrabajo_Global, id_usuarioGlobal, tipoCarga)); 
        }

    };

    const handle_FileChange= (event, tipoCarga) =>{   

        const filesTemporal = event.target.files;
        let files = [];
        for (var i = 0; i < filesTemporal.length; i++) { //for multiple files          
            files.push({
                'file': filesTemporal[i],
                'namefile': filesTemporal[i].name
            })  
        }
        if (tipoCarga === 1){
            setFiles(files);
        }
        else if (tipoCarga === 2){
            setFilesEscaneo(files);
        }
        else if (tipoCarga === 3){
            setFilesCroquis(files);
        }
        else if (tipoCarga === 4){
            setFilesVereda(files);
        }
    }

    const handleClick_Anular = ({ id_OrdenTrabajo_Archivos})=>{ 
        Swal_Question('Sistemas', 'Esta seguro de anular ?')
        .then((result)=>{
          if(result.value){    
            dispatch(anularArchivosCargadoEvidencia(id_OrdenTrabajo_Archivos, id_usuarioGlobal));
          }
        })        
    } 
    
    const handleClick_Auditoria = ({nombre_usuario_creacion, fecha_creacion, nombre_usuario_edicion, fecha_edicion })=>{  
        openNotification(true);
        assignNotification({
                nombre_usuario_creacion,
                fecha_creacion,
                nombre_usuario_edicion ,
                fecha_edicion,
        })
    }  


  return (
    <form className={classes.formControl} noValidate autoComplete="off">
        <Row>
        <Col  lg={ 12 } >
            <Paper  elevation={3} >
            <div className='title-form' >
                <h6>  Registro de Archivos </h6>
            </div>
            <div className="m-2">
                <Row>       
                    <Col md={6}  lg={6} >
                        <Paper  elevation={3}  >
                            <div className='title-form' >
                                <h6> PDF </h6>
                            </div>
                            <div className='botonFile' >
                                <input type="file" className="form-control-file btn"    
                                    ref={inputPdf}                                                                 
                                    accept="application/pdf"
                                    onChange={ (event)=>handle_FileChange(event,1) }  
                                />
                                <MiButton   startIcon={<AttachmentIcon />}  variant="contained" color="primary"  text= 'Adjuntar' onClick={  ()=>handleSubirFile(1) }></MiButton> 
                            </div>
                        </Paper>       
                    </Col>    
                    <Col md={6}  lg={6} >
                        <Paper  elevation={3}  >
                            <div className='title-form' >
                                <h6> CROQUIS </h6>
                            </div>
                            <div className='botonFile' >
                                <input type="file" className="form-control-file btn"   
                                    ref={inputCroquis}             
                                    multiple                               
                                    onChange={ (event)=>handle_FileChange(event,3) }  
                                />
                                <MiButton   startIcon={<AttachmentIcon />}  variant="contained" color="primary"  text= 'Adjuntar' onClick={  ()=>handleSubirFile(3) }></MiButton> 
                            </div>
                        </Paper>       
                    </Col>                  
                </Row>
                <Row>       
                    <Col md={6}  lg={6} >
                        <Paper  elevation={3}  >
                            <div className='title-form' >
                                <h6> ESCANEOS </h6>
                            </div>
                            <div className='botonFile' >
                                <input type="file" className="form-control-file btn"     
                                    ref={inputEscaneo}                                                                   
                                    accept=".jpg, .jpeg, .png"
                                    onChange={ (event)=>handle_FileChange(event,2) }  
                                />
                                <MiButton   startIcon={<AttachmentIcon />}  variant="contained" color="primary"  text= 'Adjuntar' onClick={ ()=>handleSubirFile(2) }></MiButton> 
                            </div>
                        </Paper>       
                    </Col>   
                    <Col md={6}  lg={6} >
                        <Paper  elevation={3}  >
                            <div className='title-form' >
                                <h6> VEREDAS </h6>
                            </div>
                            <div className='botonFile' >
                                <input type="file" className="form-control-file btn" 
                                    ref={inputVereda}
                                    multiple
                                    onChange={ (event)=>handle_FileChange(event,4) }  
                                />
                                <MiButton   startIcon={<AttachmentIcon />}  variant="contained" color="primary"  text= 'Adjuntar' onClick={ ()=>handleSubirFile(4) }></MiButton> 
                            </div>
                        </Paper>       
                    </Col>                                       
                </Row>
                <Row>
                    <Col md={10}  lg={10} >
                        <div className ="tableFixHead">
                                <Table hover >
                                <thead className="theadTableModal" >
                                        <tr>
                                            <th className='text-center'> TIPO REPARACION </th>
                                            <th className='text-center'> NOMBRE DE ARCHIVO </th>
                                            <th className='text-center'> ACCIONES </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                            {
                                                archivosEvidencias.filter(file => (file.id_TipoDocumentoAdjunto === 1 || file.id_TipoDocumentoAdjunto === 2 ) ).map((item, index)=>{
                                                    return <tr key={item.id_OrdenTrabajo_Archivos} className = {(item.id_estado===0) ? 'canceledFile' : ''} >  
                                                        <td>  
                                                            {item.nombreTipoDocumentoAdjunto}              
                                                        </td>
                                                        <td>  
                                                            {item.nombre_DocumentoAdjunto}              
                                                        </td>
                                                        <td className='text-center'>
                                                        <div className='text-center' style={{width : '250px' , marginBottom: '-7px', marginTop: '-7px' }}>
                                                                {
                                                                    item.id_estado !==0  &&  <MiButton  startIcon={<BlockIcon />}  variant="contained" color="secondary"  text= 'Anular' onClick={ ()=> handleClick_Anular(item) }></MiButton>  
                                                                }  
                                                                <MiButton  startIcon={<LibraryBooksIcon />}  variant="contained" color="primary"  text= 'Auditoria' onClick={ ()=> handleClick_Auditoria(item) }></MiButton>  
                                                            </div>  
                                                        </td>
                                                    </tr>
                                                })
                                            } 
                                    </tbody>
                                </Table>  
                        </div>   
                    </Col>
                </Row>                              

                <Row>
                    <Col md={12}  lg={6} >
                       <strong className='tituloArchivo'>  CROQUIS </strong>   
                        <div className ="tableFixHead">
                            <Table hover >
                            <thead className="theadTableModal" >
                                        <tr>
                                            <th className='text-center'> NOMBRE DE ARCHIVO </th>
                                            <th className='text-center'> ACCIONES </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                            {
                                                archivosEvidencias.filter(file => (file.id_TipoDocumentoAdjunto === 3 ) ).map((item, index)=>{
                                                    return <tr key={item.id_OrdenTrabajo_Archivos} className = {(item.id_estado===0) ? 'canceledFile' : ''} >  
                                                        <td>  
                                                            {item.nombre_DocumentoAdjunto}              
                                                        </td>
                                                        <td className='text-center'>
                                                        <div className='text-center' style={{width : '250px' , marginBottom: '-7px', marginTop: '-7px' }}>
                                                                {
                                                                    item.id_estado !==0  &&  <MiButton  startIcon={<BlockIcon />}  variant="contained" color="secondary"  text= 'Anular' onClick={ ()=> handleClick_Anular(item) }></MiButton>  
                                                                }  
                                                                <MiButton  startIcon={<LibraryBooksIcon />}  variant="contained" color="primary"  text= 'Auditoria' onClick={ ()=> handleClick_Auditoria(item) }></MiButton>  
                                                            </div>  
                                                        </td>
                                                    </tr>
                                                })
                                            } 
                                    </tbody>
                            </Table> 
                        </div>                     
                    </Col>

                    <Col md={12}  lg={6} >
                    <strong className='tituloArchivo'>  VEREDA </strong>   
                        <div className="tableFixHead">
                                <Table  hover >
                                <thead className="theadTableModal" >
                                                <tr>
      
                                                    <th className='text-center'> NOMBRE DE ARCHIVO </th>
                                                    <th className='text-center'> ACCIONES </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                    {
                                                        archivosEvidencias.filter(file => (file.id_TipoDocumentoAdjunto === 4 ) ).map((item, index)=>{
                                                            return <tr key={item.id_OrdenTrabajo_Archivos} className = {(item.id_estado===0) ? 'canceledFile' : ''} >  
 
                                                                <td>  
                                                                    {item.nombre_DocumentoAdjunto}              
                                                                </td>
                                                                <td  >
                                                                <div className='text-center' style={{width : '250px' , marginBottom: '-7px', marginTop: '-7px' }}>
                                                                        {
                                                                            item.id_estado !==0  &&  <MiButton  startIcon={<BlockIcon />}  variant="contained" color="secondary"  text= 'Anular' onClick={ ()=> handleClick_Anular(item) }></MiButton>  
                                                                        }  
                                                                        <MiButton  startIcon={<LibraryBooksIcon />}  variant="contained" color="primary"  text= 'Auditoria' onClick={ ()=> handleClick_Auditoria(item) }></MiButton>  
                                                                    </div>                                    
                                                                </td>
                                                            </tr>
                                                        })
                                                    } 
                                            </tbody>
                                </Table>  
                        </div>                       
                    </Col>                    
                </Row>

                <Snackbar open={notification}        
                        anchorOrigin={{vertical: 'top', horizontal: 'right'} }   
                        autoHideDuration={3000} onClose={closeNotification}>
                    <Alert onClose={closeNotification} severity="success">
                    <AlertTitle>   Auditoria </AlertTitle>                        
                    Usuario Creacion : { objNotification.nombre_usuario_creacion } — <strong> {objNotification.fecha_creacion} </strong> 
                       <br></br>       
                       <hr/>   
                    Usuario Edicion : { objNotification.nombre_usuario_edicion } — <strong> {objNotification.fecha_edicion} </strong> 
                    </Alert>                    
                </Snackbar>

            </div>
            </Paper> 
        </Col>
        </Row>
    </form>



  )
}

