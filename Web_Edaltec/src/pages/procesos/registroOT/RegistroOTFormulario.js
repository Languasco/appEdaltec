import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core'

import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab'; 
import Box from '@material-ui/core/Box';
 
import  './registroOT.css';
import { CargaInicialForm } from './CargaInicialForm';
import { ListaEvidenciaForm } from './ListaEvidenciaForm';
import { Spinner } from '../../../components/shared/Spinner';
import { useSelector } from 'react-redux';
import { MetradosForm } from './MetradosForm';
import { FotosForm } from './FotosForm';
 

 //----configuracion del tab------
function TabPanel(props) {
    const { children, value, index, ...other } = props;  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box >
             {children} 
          </Box>
        )}
      </div>
    );
  }
  
  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }
//----fin de configuracion del tab---

const useStyles = makeStyles((theme) => ({
      root: {
          width: '100%', 
      },
      formControl: {
        margin: theme.spacing(1),
        width: '95%',
        minWidth: 180,
      },
      rootTab: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
      },
    }));

  export const RegistroOTFormulario = () => {   

    const { spinner } = useSelector(state => state.spinner );
    const { id_OrdenTrabajo_Global } = useSelector(state => state.proceso_registroOT);  

    //----configuracion del tab------
    const [valueTab, setValueTab] = useState(0);
    const handleChangeTab = (event, newValue) => {
        setValueTab(newValue);
    };
    //----fin de configuracion del tab---  
    const classes = useStyles();   
  return (
    
    <div className={classes.rootTab}>
        {
            ( spinner )  &&  <Spinner loading = { spinner }  /> 
        }
        <AppBar position="static">
            <Tabs value={valueTab} onChange={handleChangeTab} aria-label="simple tabs example">
                <Tab label="Carga Inicial" {...a11yProps(0)} />
                <Tab label="Lista de Evidencias" {...a11yProps(1)}  disabled={ Number(id_OrdenTrabajo_Global) > 0 ? false: true } />
                <Tab label="Metrados del Campo" {...a11yProps(2)} disabled={ Number(id_OrdenTrabajo_Global) > 0 ? false: true } />
                <Tab label="Fotos" {...a11yProps(3)} disabled={ Number(id_OrdenTrabajo_Global) > 0 ? false: true } />
                <Tab label="Auditoria" {...a11yProps(4)} disabled={ Number(id_OrdenTrabajo_Global) > 0 ? false: true } />
            </Tabs>
        </AppBar>
        <TabPanel value={valueTab} index={0}  >
           <CargaInicialForm/> 
       </TabPanel>
        <TabPanel value={valueTab} index={1}>
            <ListaEvidenciaForm /> 
        </TabPanel>
        <TabPanel value={valueTab} index={2}>
           <MetradosForm/>
        </TabPanel>
        <TabPanel value={valueTab} index={3}>
          <FotosForm /> 
        </TabPanel>
        <TabPanel value={valueTab} index={4}>
              Auditoria
        </TabPanel>
  </div>
 
  )
}



