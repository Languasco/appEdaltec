
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Col, Row  } from 'react-bootstrap';
import { makeStyles, Paper, TextField, FormControl, InputLabel, Select, MenuItem, Button, Card, CardActionArea, CardMedia, CardContent } from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';

import { useForm } from '../../../hooks/useForm';
 
import  './cliente.css';
import { MiInputFile } from '../../../components/shared/controls/MiInputFile';

import  logoSinImagen from '../../../assets/images/sinImagen.jpg';
import { saveCliente, updateCliente, validacionesCliente } from '../../../redux/slice/mantenimientos/clientesSlice';


const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%', 
    },
    formControl: {
        margin: theme.spacing(1),
      width: '99%',
    },
  }));

  export const ClientesRegistroForm = () => {    
 
    const { id : id_usuarioGlobal } = useSelector(state => state.login);  
    const classes = useStyles();  
    //----usando el hook  redux
    const dispatch = useDispatch();     

    //---utilizando datos de reducer----
    const { flag_modoEdicion } = useSelector(state => state.flagEdicion );
    const { objetoEdicion } = useSelector(state => state.objetoEdicion );

    const initialState = {
        id_Cliente : '0',
        nombre_Cliente : '',
        ruc_cliente : '',
        direccion_cliente : '',
        estado : '001',
        usuario_creacion : id_usuarioGlobal,
        logoNombre : 'Seleccione imagen . . .',
        logoNombreServidor : logoSinImagen        
    }

  const [ formParams, handleInputChange, , setFormParams ] = useForm(initialState)
  ///--- IMAGENES ---- 
  const [files, setFiles] = useState([]);

  const { id_Cliente, nombre_Cliente, ruc_cliente, direccion_cliente, estado, logoNombre, logoNombreServidor } = formParams;
 
   useEffect(() => {
        if (flag_modoEdicion === true) {             
            setFiles([]);
            let objfile = {}
            if( !objetoEdicion.logoNombre) {
                objfile = { logoNombre : 'Seleccione imagen . . .', logoNombreServidor : logoSinImagen }
            }else{
                objfile = { logoNombre : objetoEdicion.logoNombre, logoNombreServidor : objetoEdicion.logoNombreServidor }  
            }  
            setFormParams({...objetoEdicion,...objfile});       
        }   
   }, [flag_modoEdicion])
   
  const handleSave = async()=>{
    if (flag_modoEdicion === true) {     ///-- edicion

        const valor = await validacionesCliente(formParams, false);
        if (valor === false) return;
        dispatch(updateCliente({...formParams , usuario_creacion : id_usuarioGlobal } , files));
        
    }else{  /// nuevo
        const valor = await validacionesCliente(formParams, true);
        if (valor === false) return;
        dispatch(saveCliente({id_Cliente, nombre_Cliente, ruc_cliente, direccion_cliente, estado , usuario_creacion : id_usuarioGlobal} , files  ));        
    }
  }

  const handleClick_AbrirImg = ()=>{
    var inputFile = document.getElementById("idFile");   
    inputFile.click();
 }
 
  const handle_FileChange= (event) =>{    
    const filesTemporal = event.target.files;
    let files = [];
    for (let j = 0; j < filesTemporal.length; j++) { //for multiple files          
        files.push({
            'file': filesTemporal[j],
            'namefile': filesTemporal[j].name
        })  
    }
    setFiles(files);

    for (let i = 0; i < filesTemporal.length; i++) { //for multiple files          
        ((file)=> {
            var name = file.name;
            var reader = new FileReader();
            reader.onload = (e)=> {
                let urlImage = e.target;             
                setFormParams({...formParams, logoNombre : name , logoNombreServidor : String(urlImage['result'])});              
            }
            reader.readAsDataURL(file);
        })(filesTemporal[i]);
    } 
  } 
    
  return (
   
    <Paper elevation={3}   >
        <div className='title-form' >
            <h6>  Datos Generales </h6>                    
        </div> 
        <form className={classes.formControl} noValidate autoComplete="off">
            <Row className='p-2'  >
                <Col lg={ 8 } >

                        <Row>
                            <Col lg={3} >   
                                <TextField  label="Codigo Interno" disabled name="id_Cliente" value= { id_Cliente}   onChange={ handleInputChange } />
                            </Col>
                        </Row>  
                        <Row>
                            <Col md={4} lg={4} >   
                                <TextField  label="Ruc"   inputProps={{ maxLength: 20 }} name="ruc_cliente" value= { ruc_cliente}   onChange={ handleInputChange } />
                            </Col>

                            <Col md={8} lg={8}  >   
                                <TextField  label="Descripcion Cliente" inputProps={{ maxLength: 150 }} name="nombre_Cliente" value= { nombre_Cliente}   onChange={ handleInputChange } />
                            </Col>
                        </Row> 
                        <Row>
                            <Col md={12} lg={12}  >   
                                <TextField  label="Direccion Cliente"  inputProps={{ maxLength: 150 }}  name="direccion_cliente" value= { direccion_cliente}   onChange={ handleInputChange } />
                            </Col>
                        </Row> 
                         <br/>
                        <Row  >
                            <Col md={4} lg={4}  >   
                                <FormControl variant="outlined"  style= {{width:"100%"}} >
                                    <InputLabel id="estado"> Estado </InputLabel>
                                    <Select
                                        labelId="estado"
                                        name="estado" 
                                        value= { estado  }  
                                        onChange={ handleInputChange }   
                                    >
                                        <MenuItem value={'001'}> ACTIVO </MenuItem>
                                        <MenuItem value={'002'}> INACTIVO </MenuItem>
                                    </Select>
                                </FormControl>
                            </Col>
                        </Row> 
                        

                        <hr/>
                        <Row>
                            <Col lg={12} >   
                                <div className="text-center">
                                    <Button  variant="contained" color="primary"    startIcon={<SaveIcon />}  onClick={ handleSave }> Guardar</Button> 
                            </div>
                            </Col>
                        </Row>  
                        <br/>

                </Col> 

                <Col lg={4} >   
                    <Row>
                            <Col md={12} lg={6} style={{display:'none'}} >
                                <MiInputFile id="idFile" disable={false} accept = 'image/jpeg' multiple ={false}  typeFile = 'imagen'  selectedFile ='Seleccione imagen . . .' clearFile = {false} onChange = { handle_FileChange }  /> 
                            </Col>
                    </Row>  
                    <Card className={classes.rootCard} >
                        <CardActionArea onClick={()=>handleClick_AbrirImg()} >
                            <div style={{ width: '300px' , height: '280px'}}>
                                <CardMedia
                                    component="img"
                                    alt="Logo de la empresa"
                                    height="240"
                                    image={logoNombreServidor}
                                    title= "Click en la imagen para Cambiarla.."
                                />
                            </div>
                            <CardContent>
                            <p> {logoNombre} </p>   
                            </CardContent>
                        </CardActionArea>

                    </Card>                                   
           
                </Col>
            </Row>    
        </form>
    </Paper> 




  )
}
