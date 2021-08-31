
import React, { Component } from 'react';
import axios from 'axios'
import { Domain } from '../../vars';

export default function ContactList(props) {
    const handleDelete = (e) => {
        e.preventDefault();
        let index=parseInt(e.target.id.match(/\d+/)[0]);
        let r=window.confirm('Esta acción se actualiza inmediatamente en la Base de datos\nNo se podra deshacer!\n¿Desea continuar?')
        if(!r){return};
        let deleteContactID=props.companies[props.show].contacts_id[index]._id;
    
        axios.delete(Domain+'/admins/contacts/'+deleteContactID)
        .then(res=>{
            alert(res.data.message||res.data.error);
           
            let contacts_id=props.companies[props.show].contacts_id.filter(c=>c._id!==deleteContactID);
            let body={
                company_id:props.companies[props.show]._id,
                dataUpdate:{
                    contacts_id
                }
            }
            return axios.put(Domain+props.url,body)
            .then(res=>{
                alert(res.data.message||res.data.error);
                return axios.get(Domain+props.url)
            })
            .then(res=>{
                let data=res.data;
                return props.reload({data,show:false});
            })
            .catch(e=>{
                alert('Ha ocurrido un error!')
                console.log(e);
            })
        })

        return

    }//end handle Delete
    const handleAdd = () => {
        let data={
            name: "",
            company_id: props.companies[props.show]._id,
            charge: "",
            phone: "",
            email: "",
        }
        let r=window.confirm('Esta acción se actualiza inmediatamente en la Base de datos\n¿Desea continuar?')
        if(!r){return};
        axios.post(Domain+'/admins/contacts',data)
        .then(res=>{
            alert(res.data.message||res.data.error);
            let newContactID=res.data.contact_id;
            let contacts_id=props.companies[props.show].contacts_id.map(contact=>contact._id);
            contacts_id.push(newContactID);
            let body={
                company_id:data.company_id,
                dataUpdate:{
                    contacts_id
                }
            }
            return axios.put(Domain+props.url,body)
            .then(res=>{
                alert(res.data.message||res.data.error);
                return axios.get(Domain+props.url)
            })
            .then(res=>{
                let data=res.data;
                return props.reload({data,show:true});
            })
            .catch(e=>{
                alert('Ha ocurrido un error!')
                console.log(e);
            })
        })

        return
    }//end handleAdd

    const handleEdit = (e) => {
        e.preventDefault();
        let index=parseInt(e.target.id.match(/\d+/)[0]);
        
        props.handleEdit(index)

        return
    }//end handleAdd


    let show = <span style={{'backgroundColor':'blue'}}>&#128466;</span>
    if (props.show > -1 && props.companies.length > props.show) {
        show = <div
            style={{
                'padding': '20px',
                'display': 'block',
                'position': 'absolute',
                'z-index': '1',
                'top': '25%',
                'left': '40%',
                'backgroundColor': 'rgb(235, 237, 239 )',
                'box-shadow': '5px 5px 5px gray'
            }}

        >
            <button
                className="badge badge-secondary"
                onClick={props.close}>x</button>
            Contactos de:<b>{' ' + props.companies[props.show].company}</b>
            <ul>
                {props.companies[props.show].contacts_id.map((contact, index) => {
                    return <li>
                      <b>  {contact.name +':'}</b>
                        <button
                            onClick={handleDelete}
                            className="badge badge-danger"
                            id={'btn-delete-contact-' + index}
                        >
                            &#10007;
                        </button>
                        <button
                            onClick={handleEdit}
                            className="badge badge-success"
                            id={'btn-delete-contact-' + index}
                        >
                            &#9999;
                        </button>

                        <ul>
                            <li>puesto: {contact.charge}</li>
                            <li>Tel: {contact.phone}</li>
                            <li>email:{contact.email}</li>
                        </ul>

                    </li>
                })}
            </ul>
            <button
                className="badge badge-secondary"
                onClick={handleAdd}
            >Agregar</button>
        </div>
    }//end if
    return (
        <div
        >{show}
        </div>
    )
}