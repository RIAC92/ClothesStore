import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav'

export default class NavbarMenu extends Component {
    
    render() {
        return (
            <Navbar bg="dark" expand="lg" variant="dark" sticky="top">
                <Navbar.Brand><Link className='navbar-brand' to='/'>Tienda de Ropa</Link></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <ul className='navbar-nav mr-auto"'>
                            <li className="nav-item">
                                <Nav.Link > <Link to='/' className='nav-link'>Inicio</Link> </Nav.Link>

                            </li>
                            <li className="nav-item">
                                <Nav.Link> <Link to='/catalogo' className='nav-link'>Catálogo</Link> </Nav.Link>

                            </li>
                            <li className="nav-item">
                                <Nav.Link> <Link to='/pedido' className='nav-link'>Pedidos&#128722;</Link> </Nav.Link>

                            </li>

                        </ul>

                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        )
    }
}