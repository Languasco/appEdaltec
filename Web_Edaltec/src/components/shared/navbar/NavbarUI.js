
import React from 'react';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import PerfilLogueado from './PerfilLogueado';

import  './navbar.css';
import  imagen from '../../../assets/icons/icons';

export const NavbarUI = () => {
 
      ///--- sirve para obtener datos del reducer ---
 const { menu } = useSelector(state => state.login);

 const iconoMenu = (icono) =>{
   return imagen[''+icono+''];
 }
 
  return (
    <Navbar collapseOnSelect expand="lg" bg="primary" variant="dark" style={{zIndex: '1000'}}>
      <Container fluid>
        <Navbar.Brand href="/home">  Edaltec  
      
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto menuNavBar  ">
            {
              menu.map((menu)=> {
                
                return  <NavDropdown className='fadeInDown' 
                          key={menu.id_opcion}                 
                          title={
                                <div className='menuPrincipal' >
                                    <img
                                        src={iconoMenu(menu.urlmagene_principal)}
                                        alt="icono menu"
                                        style={{ padding: '0px' }}
                                    />
                                     { menu.nombre_principal } 
                                </div>                              
                            }               
                        >                  
                          {
                            menu.listMenu.map( (menuItem, index) => {
                              return <NavDropdown.Item  key= {index} href={ menuItem.url_page }>                                       
                                      {/* <img src="http://www.dominion-peru.com/Calidda/Content/Imagen/iconMenu/Menu_Mante.png" />    <span>   {String(menuItem.nombre_page).toUpperCase()}    </span>                                      */}
                                      {menuItem.nombre_page.toUpperCase()}
                                </NavDropdown.Item>
                            })
                          }                        
                        </NavDropdown>
              } )
            }
          </Nav> 
          <div className="d-flex">
             <PerfilLogueado ></PerfilLogueado>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>

    
  )
}

 