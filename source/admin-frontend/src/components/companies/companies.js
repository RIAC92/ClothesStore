import React, { Component } from 'react';
import axios from 'axios'
import { Domain } from '../../vars';

import ContactsEditor from './contacts-editor-b';
import ContactList from './contacs-list-b';


export default class Companies extends Component {
    constructor(props) {
        super(props);

        this.state = {
            show_add_company: false,
            companies: [],
            show: -1,
            edit: {
                show: false,
                company_index: -1,
                contact: {}
            }

        }

        this.handleAdd = this.handleAdd.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleShowContacts = this.handleShowContacts.bind(this);
        this.handleEditContact = this.handleEditContact.bind(this);
        this.handleReload = this.handleReload.bind(this);




    }//end constructor-
    componentDidMount() {
        axios.get(Domain + this.props.type.url)
            .then(res => {
                let data = res.data;
                this.setState({
                    companies: data
                })
            }).catch(e => {
                console.error(e)
                alert('Ha ocurrido un error!')
            })
    }//end componentDidMount

    handleAdd(e) {
        e.preventDefault();
        let inputs = document.getElementsByClassName('input-new-company');
        let newCompany = {};

        for (let i = 0; i < inputs.length; i++) {
            newCompany[inputs[i].name] = inputs[i].value;
            if (inputs[i].value.search(/\w/) === -1) {
                alert('Los campos no pueden tener caracteres especiales ni estar vacios');
                return
            }

        }

        console.log(newCompany)

        let r = window.confirm('Esta acción se actualizara\n inmediatamente en la base datos\n Deseea continuar?')
        if (!r) {
            return
        }
        axios.post(Domain + this.props.type.url, newCompany)
            .then(res => {
                alert(res.data.message || res.data.error);
                return axios.get(Domain + this.props.type.url)
            })
            .then(res => {
                let data = res.data;
                this.setState({
                    companies: data
                })
            }).catch(e => {
                console.error(e)
                alert('Ha ocurrido un error!')
            })
    };//end handleAdd

    handleDelete(e) {
        e.preventDefault();
        let companyIndex = parseInt(e.target.id.match(/\d+/)[0]);
        let companyId = this.state.companies[companyIndex]._id;
        let r = window.confirm('Esta acción se actualizara\n inmediatamente en la base datos\n Deseea continuar?');
        if (!r) {
            return
        }
        axios.delete(Domain + this.props.type.url + companyId)
            .then(res => {
                alert(res.data.message || res.data.error);
                return axios.get(Domain + this.props.type.url)
            })
            .then(res => {
                let data = res.data;
                this.setState({
                    companies: data
                })
            }).catch(e => {
                console.error(e)
                alert('Ha ocurrido un error!')
            })
    };//end handleDelete

    handleShowContacts(e) {
        e.preventDefault();
        let index = parseInt(e.target.id.match(/\d+/)[0]);
        this.setState({
            show: index
        })

    }//end hanldeShowContacts

    

    handleEditContact(index) {
        let edit = {
            show: true,
            company_index: this.state.show,
            contact: this.state.companies[this.state.show].contacts_id[index]
        }
        this.setState({
            edit,
            show: -1
        })
    }
    handleReload(data) {

        this.setState({
            edit: { show: false },
            companies: data
        })

    }

    render() {


        let list = this.state.companies.map((company, index) => {

            return <li key={'company' + index}>
                <b>{index}-{' ' + company.company}</b> ({company.country})
                {'  '}
                <button
                    onClick={this.handleDelete}
                    className="badge badge-danger"
                    id={'btn-delete-company' + index}
                >

                    &#10007;
                </button>
                {' '}|{' '}
                <button
                    className="badge badge-success"
                    id={'btn-contact-company' + index}
                    onClick={this.handleShowContacts}
                >&#128100;</button>
            </li>
        })//end map
        return (
            <div>
                <h2 className='text-primary'>{this.props.type.es}:</h2>
                <hr />
                <span className='text-info'>
                    &#8505;Hay acciones que se actualizan directamente en la Base de Datos!
                </span>
                <ul>
                    {list}



                </ul>

                <button  className="badge badge-secondary"
                onClick={() => this.setState((state) => ({
                    show_add_company: !state.show_add_company
                }))}>Nueva Compañia</button>

<div style={{
    'display':'flex',
    'flexDirection':'row',
    'justifyContent':'start',
    'alignItems':'start'
}}>
                <ContactList
                    close={() => this.setState({ show: -1 })}
                    companies={this.state.companies}
                    show={this.state.show}
                    handleEdit={this.handleEditContact}
                    reload={(data) => this.setState(state => ({
                        companies: data.data,
                        show: -1,
                        edit: {
                            show: data.show,
                            company_index: state.show,
                            contact: data.data[state.show].contacts_id[data.data[state.show].contacts_id.length - 1]
                        }
                    }))}
                    url={this.props.type.url}
                />


                <AddCompany
                    handleAdd={this.handleAdd}
                    show={this.state.show_add_company}
                    close={()=>this.setState({ show_add_company: false })}
                />

                <ContactsEditor
                    show={this.state.edit.show}
                    contact={this.state.edit.contact}
                    company_index={this.state.edit.company_index}
                    close={() => this.setState({ edit: { show: false } })}
                    reload={this.handleReload}
                    update={(contact) => this.setState({
                        edit: {
                            show: true,
                            contact: contact
                        }
                    })}
                    url={this.props.type.url}

                />
                </div>
            </div>
        )
    }
}//end Companies
//-------------------------------------------------------------------------------------------

function AddCompany(props) {
    let content = <span style={{'backgroundColor':'red'}}>&#128466;</span>
    if (props.show) {
        content = <div style={{
            'padding': '20px',
            'display': 'block',
            'position': 'fixed',
            'z-index': '1',
            'top': '25%',
            'left': '40%',
            'backgroundColor': 'rgb(235, 237, 239 )',
            'box-shadow': '5px 5px 5px gray'
        }}>
            <button
                className="badge badge-secondary"
                onClick={props.close}>x</button>
            <b className="text-info">Agregar Nueva Compañia</b>
            <ul>
                <li>
                    <label for="input-company-company">Campañia: </label>
                    <input type="text" id="input-company-company" name="company" className='input-new-company' />
                </li>
                <li>
                    <label for="input-company-county">País: </label>
                    <input type="text" id="input-company-country" name="country" className='input-new-company' />
                </li>
            </ul>
            <button
                className="badge badge-secondary"
                onClick={props.handleAdd}
            >Agregar</button>

        </div>
    }

    return (
        <di>{content}</di>
    )
}
