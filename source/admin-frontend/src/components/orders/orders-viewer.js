import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    BrowserRouter as Router,
    Link,
    useParams
} from "react-router-dom";

import { Domain } from '../../vars';

import InProcess from './in-process';


export default function OrdersViewer(props) {
    const { follow_code } = useParams();
    const [order, setOrder] = useState({});
    const [load, setLoad] = useState(0);
    useEffect(() => {
        axios.get(Domain + '/admins/orders/search?follow_code=' + follow_code)
            .then(res => {
                setOrder(res.data[0])
            })
    }, [follow_code]);//useEffect only works at the begining and when 'follow_code' change

    const handleInProcess = (in_process) => {
        let order2 = Object.assign({}, order);
        order2.status = 'in_process';
        order2.status_history = [JSON.stringify(in_process), ...order2.status_history]
        setOrder(order2)
        setLoad(load + 1)

    }//end handleInProcess

    const handleComplited = () => {
        if (order.status !== 'in_process') {
            alert('solo se puede "completar" pedidos en estado "in_process"')
            return
        }
        let order2 = Object.assign({}, order);
        order2.status = 'complited';
        let newStatus = {
            status: 'complited',
            info: { updated_on: (new Date()).toISOString().match(/\d{4}-\d{2}-\d{2}/)[0] }

        }
        order2.status_history = [JSON.stringify(newStatus), ...order2.status_history]
        setOrder(order2)
        setLoad(load + 1)
    }//end handleComplited

    const handleCancelled = () => {
        if (order.status === 'cancelled' || order.status === 'complited') {
            return
        }
        let order2 = Object.assign({}, order);
        order2.status = 'cancelled';
        let reason = window.prompt('escriba la razón de la cancelación')
        let newStatus = {
            status: 'cancelled',
            info: {
                updated_on: (new Date()).toISOString().match(/\d{4}-\d{2}-\d{2}/)[0],
                reason: reason
            }
        }
        order2.status_history = [JSON.stringify(newStatus), ...order2.status_history]
        setOrder(order2)
        setLoad(load + 1)
    }//end handleCancelled

   const handleSave=()=>{
        let r = window.confirm('Esta Acción "NO" se podrá deshacer ¿Desea Continuar?');
        if (r) {
             
            let body={
                follow_code:order.follow_code,
                dataUpdate:{
                    status:order.status,
                    status_history:order.status_history
                }
            }
            axios.put(Domain + '/admins/orders', body)
                .then(res => {
                    alert(res.data.message || res.data.error);
                    return

                }).catch(e => {
                    console.error(e)
                    alert('Ha ocurrido un error de conexión!')
                })
        }
    }
    let keys = Object.keys(order)
    let content = keys.map(key => {
        if (key === '_id' || key === '__v') {
            return
        } else if (key == 'status_history') {
            return <li><b>status_history:</b>{order[key].map(h => <JsonPrint element={h} />)}</li>
        } else if (key == 'products') {
            return <table style={{ 'width': '100%', 'backgroundColor': 'silver' }}>
                <tr>
                    <th>buy_code</th>
                    <th>quantity</th>
                    <th>price</th>
                </tr>
                {order[key].map(product => {
                    let p = JSON.parse(product)
                    return <tr>
                        <td>{p.buy_code}</td>
                        <td>{p.quantity}</td>
                        <td>{p.price}</td>
                    </tr>
                })}

            </table>
        } else {
            return <li key={'li' + key}>
                <b>{key}</b> :{order[key]}
            </li>
        }


    })

    return (
        <div>
            <div style={{
                'border': 'solid',
                'borderRadius': '15px',
                'width': '500px',
                'height': 'auto',
                'paddingLeft': '50px'
            }}>
                <ul>
                    {content}
                </ul>
            </div>
            <InProcess
                status={order.status}
                handleInProcess={handleInProcess}
            />
            <button
                className="btn btn-success"
                onClick={handleComplited}
            >Completado</button>
{'  '}
            <button
                className="btn btn-danger"
                onClick={handleCancelled}
            >Cancelado</button>
{'  '}

            <button
                className="btn btn-info"
                onClick={handleSave}
            >&#128190;Guardar</button>
        </div>
    )

}

function JsonPrint(props) {
    let shObj = JSON.parse(props.element)
    let keys = Object.keys(shObj.info);
    let info = keys.map((key, index) => {
        return <li key={props.element.status + index}>
            <b>{key}</b>:{shObj.info[key]}
        </li>
    })
    return (
        <div>
            <hr />
            status:{' ' + shObj.status}
            <ul>
                info:
                {info}
            </ul>
        </div>
    )
}