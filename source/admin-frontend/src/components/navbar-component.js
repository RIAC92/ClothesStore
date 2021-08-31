import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav'

export default class NavbarMenu extends Component {
    
    render() {
        return (
            <Navbar bg="dark" expand="lg" variant="dark" sticky="top">
                <Navbar.Brand><span className='navbar-brand' >Administrar Tienda</span></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <ul className='navbar-nav mr-auto"'>
                            <li className="nav-item">
                                <Nav.Link > <Link to='/admins-page/' className='nav-link'>Configuración General</Link> </Nav.Link>

                            </li>
                            <li className="nav-item">
                                <Nav.Link> <Link to='/admins-page/pedidos' className='nav-link'>Pedidos</Link> </Nav.Link>

                            </li>
                            <li className="nav-item">
                                <Nav.Link> <Link to='/admins-page/productos' className='nav-link'>Productos</Link> </Nav.Link>

                            </li>
                            <li className="nav-item">
                                <Nav.Link> <Link to='/admins-page/proveedores' className='nav-link'>Proveedores</Link> </Nav.Link>

                            </li>

                            <li className="nav-item">
                                <Nav.Link> <Link to='/admins-page/repartidores' className='nav-link'>Repartidores</Link> </Nav.Link>

                            </li>

                        </ul>

                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        )
    }
}