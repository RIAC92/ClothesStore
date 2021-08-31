import axios from 'axios';
import React, { Component } from 'react';
import { getSummarize, getTotal } from '../shopping-cart'
import { Domain } from '../vars';
import OrderTable from './order/order-table';
import OrderForm from './order/order-form';

export default class Order extends Component {
    constructor(props) {
        super(props);

        this.state = {
            case: 2,
            date_expires: 0,
            follow_code: ''

        }

        this.handleSend = this.handleSend.bind(this);

    }//end constructor

    componentDidMount() {
        axios.get(Domain + '/store/order/form')
            .then(res => {
                if (res.data.case||res.data.case===0) {
                    this.setState({
                        case: res.data.case,
                        follow_code:!res.data.follow_code ? '' : res.data.follow_code,
                        date_expires: !res.data.date_expires ? 0 : res.data.date_expires
                    })
                }
            })
            .catch(e => {
                console.log(e)
            });
    }

    handleSend(costumerData) {
        let orderData = Object.assign({}, costumerData);
        orderData.products = getSummarize().map(item => JSON.stringify(item));
        orderData.total = getTotal();
        if (orderData.products.length === 0) {
            alert("No ha seleccionado ningun producto");
            return
        }
        let r = window.confirm(`¿Desea realizar la presente solicitud de compra por un total de $${getTotal()}?`);
        if (r) {
            axios.post(Domain + '/store/order', orderData,/*{responseType:"document"}*/)
                .then(res => {
                    alert(res.data.message || res.data.error);
                    if (res.data.message) {
                        this.setState({
                            follow_code: res.data.follow_code,
                            date_expires:parseInt(res.data.date_expires),
                            case:1
                        })
                    }
                    console.log(res);
                    return
                })
                .catch(e => {
                    console.log(e)
                    alert("La solicitud no se ha podido enviar")
                });
        }//end if

    }//end handleSend

    render() {
        let form = null;
        if (this.state.case === 0) {
            form = <OrderForm onSubmit={this.handleSend} />
        } else if (this.state.case === 1) {
            form = <div>
                <h2 className="text-primary">Su orden ha sido enviada</h2>
                <p className="text-primary">Nuestro personal pronto se pondrá en contacto con Usted!</p>
                <p>El codigó de su ultimo pedido es: <b>{this.state.follow_code}</b></p>
                <p className="text-info">Guarde el codigó de su pedido, con él podra dar referencia a nuestros vendedores</p>
                <p> Podrá volver a enviar una nueva orden el:</p>
                <h3 className="text-warning">{(new Date(parseInt(this.state.date_expires))).toLocaleString()}</h3>
            </div>
        }else if(this.state.case===2){
            form=<h2 className="text-info">Conectando!...</h2>
        }
        return (
            <div>
               
                <OrderTable />
                <hr />
                {form}
            </div>

        )
    }
}