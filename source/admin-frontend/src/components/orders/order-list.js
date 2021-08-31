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



export default class OrdersList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            orders: [],
            status:'all'
        }

        this.handleDeleteOrder = this.handleDeleteOrder.bind(this);
        this.handleChange=this.handleChange.bind(this);

    }//end constructor

    componentDidMount() {
        axios.get(Domain + '/admins/orders')
            .then(res => {
                console.log('res,  axios: ', res)
                this.setState({
                    orders: res.data
                })
            })
            .catch(e => console.log('error:', e));

    }

    handleDeleteOrder(e) {
        e.preventDefault();
        let follow_code = e.target.id.match(/(?<=btn-delete-)\w+/);
        let r = window.confirm('Una vez ejecutada ' + follow_code + ' no se podrá recuperar ¿Desea continuar?')
        if (!r) { return }
        axios.delete(Domain + '/admins/orders/' + follow_code)
            .then(res => {
                alert(res.data.message || res.data.error);
                return axios.get(Domain + '/admins/orders')
            })
            .then(res => {
                console.log('res,  axios: ', res)
                this.setState({
                    orders: res.data
                })
            })
            .catch(e => {
                console.log(e);
                alert("Ha ocurrido un error!")
            })
    }// hanldeDeleteOrder

    handleChange(e){
         let status=e.target.value;
         if(status==='all'){
             axios.get(Domain+'/admins/orders')
             .then(res=>{
                 this.setState({
                     orders:res.data,
                     status:status
                 })
             }).catch(e=>{
                 console.log(e);
                alert('Ha ocurrido un error, posiblemente un fallo de conexión');
             })
         }else{
            axios.get(Domain+'/admins/orders/search?status='+status)
            .then(res=>{
                this.setState({
                    orders:res.data,
                    status:status
                })
            }).catch(e=>{
                console.log(e);
               alert('Ha ocurrido un error, posiblemente un fallo de conexión');
            })
         }//end else
    }

    render() {
        let content = this.state.orders.map((order, index) => {
            return <tr>
                <td><b>{index}</b></td>
                <td>{order.follow_code}</td>
                <td>{order.status}</td>
                <td>{order.costumer_name}</td>
                <td>{order.total}</td>

                <td>
                    <Link to={this.props.url + '/edit/' + order.follow_code}>ver &#129405;</Link>
                    {' | '}
                    <button
                        className="btn btn-danger"
                        id={'btn-delete-' + order.follow_code}
                        onClick={this.handleDeleteOrder}
                    >&#128465;</button>
                </td>

            </tr>
        });//end map
        return (
            <div>
                <label for="status">Filtrar por Estatus:</label>
                {'  '}
                <select 
                name="status" id="cars" 
                value={this.state.status}
                onChange={this.handleChange}
                >
                    <option value="all">Todos</option>
                    <option value="new_order">new_order</option>
                    <option value="in_process">in_process</option>
                    <option value="complited">complited</option>
                    <option value="cancelled">cancelled</option>

                </select>
                <Table striped bordered hover responsive>

                    <table class="default">
                        <thead>
                            <tr>  <th>#</th>
                                <th>follow_code</th>
                                <th>Estatus</th>
                                <th>Nombre del cliente</th>
                                <th>total ($)</th>
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