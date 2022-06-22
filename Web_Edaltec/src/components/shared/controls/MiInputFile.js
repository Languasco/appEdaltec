import React, {useEffect, useRef } from 'react';
import { IconButton, makeStyles, Tooltip  } from '@material-ui/core' 
import PhotoCameraRoundedIcon from '@material-ui/icons/PhotoCameraRounded';
import AttachmentRoundedIcon from '@material-ui/icons/AttachmentRounded';
 
const useStyles = makeStyles((theme) => ({
      input: {
        display: "none",
      },
      idFile: {
        color: theme.palette.primary ,
      },    
  }));

export const MiInputFile = ({ id, accept , multiple, onChange, selectedFile, clearFile, typeFile, disable}) => {
    
  const classes = useStyles();   
  const inputPdf = useRef();   

  useEffect(() => { 
    if (clearFile === true) {
        inputPdf.current.value = ""; 
    }
  }, [clearFile])

  return (
    <>
        {
            (  typeFile === 'imagen' )  && 
              <div>
                  <input    
                      id = { (!id) ? null : id }      
                      disabled={disable}    
                      accept={accept}
                      multiple = {multiple}     
                      className={classes.input}
                      type="file"
                      onChange={ onChange }
                      ref={inputPdf}   
                  />
                  <Tooltip title="Seleccione Imagen">
                      <label htmlFor="idFile">
                          <IconButton
                              className={classes.faceImage}
                              color="primary"
                              aria-label="upload picture"
                              component="span"                >
                              <PhotoCameraRoundedIcon fontSize="large" />
                          </IconButton>
                      </label>
                  </Tooltip>
                  <label htmlFor="idFile" className='cargando fileSelected' >{selectedFile}</label>  
              </div>           
        }

        {
            (  typeFile === 'archivos' )  && 
              <div>
                  <input           
                      accept={accept}
                      disabled={disable}
                      multiple = {multiple}     
                      className={classes.input }
                      id="idFile"
                      type="file"
                      onChange={ onChange }
                      ref={inputPdf}   
                  />
                  <Tooltip title="Seleccione Archivo">
                      <label htmlFor="idFile">
                          <IconButton
                              className={classes.faceImage}
                              color="primary"
                              aria-label="upload picture"
                              component="span"                >
                              <AttachmentRoundedIcon fontSize="large" />
                          </IconButton>
                      </label>
                  </Tooltip>
                  <label htmlFor="idFile" className='cargando fileSelected' >{selectedFile}</label>  
              </div>           
        }
         
    </>
  )
}
