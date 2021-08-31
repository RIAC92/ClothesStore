import axios from 'axios';
import React, { Component } from 'react';
import { Domain } from '../vars';
export default class LogControl extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username:''
        }

        //this.handleSearch = this.handleSearch.bind(this);

    }//end constructor

    componentDidMount() {
        axios.get(Domain+'/admins/config/whoiam')
        .then(res=>{
            this.setState({
                username:res.data.username
            })
        })
        .catch(e=>{
            alert('Ha ocurrido un error, posiblemente un fallo de conexión');
            console.log(e);
            this.setState({
                username:'unkwon'
            })
        })

    }
    render() {
        return (
            <div>
                <span className='text-info'>
                Usuario:{' '} 
                <b>{this.state.username}</b>
                </span>
                {' '}|{' '}
                <a  href={Domain+'/login/out'} className='text-muted'>cerrar sessión</a>
            </div>
                )
    }
}