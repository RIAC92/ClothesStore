import React, { Component } from 'react';
import axios from 'axios';
import {
    BrowserRouter as Router,
    Link,
    useParams
} from "react-router-dom";

import { Domain } from '../../vars';



export default class InProcess extends Component {
    constructor(props) {
        super(props)
        this.state = {
            delivers: [],
            company_i:0,
            contact_i:0,
            date: (new Date()).toISOString().match(/\d{4}-\d{2}-\d{2}/)[0]
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleChangeContact = this.handleChangeContact.bind(this);
        this.handleChangeDate = this.handleChangeDate.bind(this);
        this.handleChangeStatus = this.handleChangeStatus.bind(this);



    }//end constructor

    componentDidMount() {
        axios.get(Domain + '/admins/delivers')
            .then(res => {
                this.setState({
                    delivers: res.data,
                    company_i:0,
                    contact_i:0
                })
            })
            .catch(e => {
                alert('Ha ocurrido un error');
                console.log(e)
            })
    }//end componentDidMount

    handleChange(e) {
        this.setState({
            company_i:parseInt(e.target.value)
        })

    }//end handleChange

    handleChangeContact(e) {


        this.setState({
            contact_i:parseInt(e.target.value)
        })

    }//end handleChangeContact

    handleChangeDate(e) {
        this.setState({
            date: e.target.value
        })

    }

    handleChangeStatus(e){
        e.preventDefault();
        let ic=this.state.company_i;
        let ict=this.state.contact_i;
        let deliver={
            company_id:this.state.delivers[ic]._id,
            company:this.state.delivers[ic].company,
            contacts_id:this.state.delivers[ic].contacts_id[ict]._id,
            contacts_name:this.state.delivers[ic].contacts_id[ict].name,
            contacts_phone:this.state.delivers[ic].contacts_id[ict].phone,
            transfer_to_delivery_date:this.state.date


        }
        let in_process={
            status:'in_process',
            info:deliver
        }
        this.props.handleInProcess(in_process)
    }

    render() {updated_on: <date></date>
        let content = <div></div>
        if (this.props.status === 'new_order') {
            content = <div
                style={{
                    'border': 'solid',
                    'borderRadius': '15px',
                    'width': '500px',
                    'paddingLeft': '50px'
                }}>
                <label>
                    Compañia:
                    <select name='company' onChange={this.handleChange} value={this.state.company_i}>
                        {this.state.delivers.map((deliver,i) => <option value={i} key={deliver.company}>{deliver.company}</option>)}
                    </select>
                </label>
                <label>
                    Encargado:
                    <select name='contacts' onChange={this.handleChangeContact} value={this.state.contact_i}>
                        {this.state.delivers
                            .filter((d,i) => i === this.state.company_i).length === 0
                            ? ''
                            : this.state.delivers
                                .filter((d,i) => i === this.state.company_i)[0].contacts_id
                                .map((c,i) => <option key={c.name} value={i}>{c.name}({c.charge})</option>)}
                    </select>
                </label>

                <label>
                    Fecha de entrega al repartidor
                    <input type="date" value={this.state.date} onChange={this.handleChangeDate}></input>
                </label>
                <label>

                    Cambiar Estatus a :
                    <button
                        className='btn btn-warning'
                        onClick={this.handleChangeStatus}
                    >
                        in_process
                    </button>
                </label>
            </div>

        }
        return (
            <div>
                {content}
            </div>
        )
    }
}