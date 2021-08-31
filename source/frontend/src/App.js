import React from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.min.css';


import NavbarMenu   from "./components/navbar-component";
import CarouselBanner   from "./components/carousel";
import Catalog  from "./components/catalog";
import Order from "./components/order"

/*
import ExcercisesList  from "./components/excercises-list-component";
import EditExcercise  from "./components/edit-excercise-component";
import CreateExcercise  from "./components/create-excercise-component";
import CreateUser  from "./components/create-user-component";
*/

function App() {
  return (
    <Router>
      <NavbarMenu/>
      <br/>
      <div className="container">
        <Route path="/" exact component={CarouselBanner}/>
        <Route path="/catalogo" component={Catalog}/>
        <Route path="/pedido" component={Order}/>
        </div>

    </Router>
    );
}

/*
function Catalog() {
  return (
    <div>
      <h2 >Catálogo</h2>
      <p  >Presentacion de los productos</p>
      <img src="https://static.nike.com/a/images/c_limit,w_318,f_auto/t_product_v1/c7c4a5db-047b-40dc-bdd9-a3bb2950acb5/nikecourt-dri-fit-polo-de-tenis-nino-DDlkRB.png" width="100" height="100"></img>
    </div>
  );
}
*/



export default App;
