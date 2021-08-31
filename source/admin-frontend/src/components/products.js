import axios from 'axios';
import React, { Component, useState } from 'react';

import ProductsList from './products/products-list';
import ProductEditor from './products/products-editor';

import ProductsForm from './products/products-form/product-form';

import { Domain } from '../vars';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useParams,
    useRouteMatch,
    useHistory
} from "react-router-dom";


export default class Products extends Component {
    constructor(props) {
        super(props);

        this.state = {
            catalog: [],
        }

        //this.handleSearch = this.handleSearch.bind(this);

    }//end constructor

    componentDidMount() {
        /* axios.get('http://localhost:5000/store/catalog')
             .then(res => {
                 console.log('res,  axios: ', res)
                 this.setState({
                     catalog: res.data
                 })
             })
             .catch(e => console.log('error:', e));*/

    }

    handleSearch() {
    }

    render() {

        return (
            <div>
                <div>
                    <Link to={'/admins-page/productos/new'}>crear producto</Link>
                </div>
                <Page />

            </div>

        )
    }
}
// I had to create a Page component to use " let { path, url } = useRouteMatch();"
function Page(props) {
    const [show, setShow] = useState(false);

    let { path, url } = useRouteMatch();

    const product = {
        "size": ["L"],
        "views": [],
        "units_sold": [],
        "images": [],
        "tags": [],
        "_id": "",
        "buy_code": "",
        "supplier_product_code": "",
        "supplier_id": "", //"60d1a9f0f4661230819770e5",
        "name": "",
        "description": "",
        "mark": "",
        "stock": 0,
        "price": 0,
        "discount": 0,
        "edited_by": "",
        "created_on": "",
        "updated_on": "",
    };
 
    return (

        <div>
            <Switch>
                <Route exact path={path}>

                    <h2> lista de productos (ver detalles)</h2>
                    <ProductsList
                        url={url}
                    />
                </Route>

                <Route path={`${path}/edit/:buy_code`}>
                    <ProductEditor />
                </Route>

                <Route path={`${path}/new`}>
                <Link to={'/admins-page/productos'}>⬅Regresar</Link>
                <br/>

                <span className="text-primary"
                style={{'fontSize':'1.5rem'}}
                >Crear nuevo producto: </span>
                {' '}
                                        
                    <label>
                 
                        <button
                            className="btn btn-success"
                            onClick={() => setShow(true)}>+</button>
                    </label>

                    <ProductsForm
                        product={product}
                        show={show}
                        close={() => setShow(false)}
                        load={() => { }/*history.push(path)*/}
                        method={'POST'}
                        buy_code={true}
                    />
                </Route>
            </Switch>
        </div>

    );
}
