import React, { Component } from 'react';
import Table from 'react-bootstrap/Table'

import axios from 'axios';
import { Domain } from '../../vars';


import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useParams,
    useRouteMatch
} from "react-router-dom";



export default class ProductsList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            catalog: [],
        }

        this.handleDeleteProduct = this.handleDeleteProduct.bind(this);

    }//end constructor

    componentDidMount() {
        axios.get(Domain + '/admins/products')
            .then(res => {
                console.log('res,  axios: ', res)
                this.setState({
                    catalog: res.data
                })
            })
            .catch(e => console.log('error:', e));

    }

    handleDeleteProduct(e) {
        e.preventDefault();
        let buy_code=e.target.id.match(/(?<=btn-delete-)\w+/); 
        let r =window.confirm('Una vez ejecutada '+buy_code+' no se podrá deshacer ¿Desea continuar?')
        if(!r){return}
        axios.delete(Domain+'/admins/products/'+buy_code)
        .then(res=>{
            alert(res.data.message||res.data.error);
            return   axios.get(Domain + '/admins/products')
        })
        .then(res => {
            console.log('res,  axios: ', res)
            this.setState({
                catalog: res.data
            })
        })
        .catch(e=>{
            console.log(e);
            alert("Ha ocurrido un error!")
        })
    }

    render() {
        let content=this.state.catalog.map((product,index)=>{
            return <tr>
            <td><b>{index}</b></td>
            <td>{product.buy_code}</td>
            <td>{product.name}</td>
            <td><img src={product.images[0]} style={{'width':'100px'}}/></td>
            <td>
            <Link to={this.props.url+'/edit/'+product.buy_code}>ver &#129405;</Link>
            {' | '}
            <button 
            className="btn btn-danger"
            id={'btn-delete-'+product.buy_code}
            onClick={this.handleDeleteProduct}
            >&#128465;</button>
            </td>

        </tr>
        });//end map
        return (
            <div>
                  <Table striped bordered hover responsive>

                <table class="default">
                <thead>
                    <tr>  <th>#</th>
                        <th>buy_code</th>
                        <th>Nombre</th>
                        <th>imagen</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    {content}
                    </tbody>
                </table>
                </Table>


            </div>

        )
    }
}