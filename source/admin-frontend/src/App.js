
import './App.css';
import FormData from 'form-data'

import React from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.min.css';


import NavbarMenu   from "./components/navbar-component";
import LogControl from "./components/log-control";
import General from "./components/general";
import Companies from "./components/companies/companies";
import Products from './components/products';
import Orders from './components/orders';

const form =new FormData();
function App() {
  return (
    <div >
      <Router>
      <NavbarMenu/>
      <LogControl/>
      <br/>
      <div className="container">
        <Route path="/admins-page/" exact component={General}/>
        <Route path="/admins-page/pedidos" component={Orders}/>
        <Route path="/admins-page/productos" component={Products}/>
        <Route path="/admins-page/repartidores"><Companies type={{es:'Repartidores',url:'/admins/delivers/'}}/></Route>
        <Route path="/admins-page/proveedores" ><Companies type={{es:'Proveedores',url:'/admins/suppliers/'}}/></Route>

        </div>

    </Router>
    </div>
  );
}
function Prueba(props) {
  return (
    <div>
      <h2 >esta es una prueba{props.msg}</h2>
      
    </div>
  );
}
export default App;

