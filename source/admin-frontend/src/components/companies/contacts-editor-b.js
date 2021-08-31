import React, { Component } from 'react';
import axios from 'axios'
import { Domain } from '../../vars';

export default function ContactsEditor (props) {
    
const handleChange=(e)=>{
let key= e.target.id.match(/(?<=input-contact-)\w+/)[0];
let newContact=Object.assign({},props.contact);
newContact[key]=e.target.value;
props.update(newContact)
}//end handleChanege

const handleSave=()=>{
    let r=window.confirm('Esta acción se actualizara de inmediato en la Base de Datos\n¿Desea continuar?');
    if(!r){
        return
    }
   let data={
        contact_id:props.contact._id,
        dataUpdate:{
            name:props.contact.name,
            charge:props.contact.charge,
            phone:props.contact.phone,
            email:props.contact.email
        }
    }
    axios.put(Domain+'/admins/contacts',data)
    .then(res=>{
        alert(res.data.message||res.data.error);
        return   axios.get(Domain + props.url)
    })
    .then(res => {
        let data = res.data;
        
        return props.reload(data)
    }).catch(e => {
        console.error(e)
        alert('Ha ocurrido un error!')
    })
}
    

        let list = <span style={{'backgroundColor':'green'}}>&#128466;</span>
        if (props.show) {
            list = <div
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
            <b>Editar Contacto</b>
            <ul>
                <li>
                    <label>
                    nombre:
                    <input type="text" id="input-contact-name"
                        value={props.contact.name}
                        onChange={handleChange}
                    />
                    </label>
                </li>
                <li>
                    <label>
                    cargo:
                    <input type="text" id="input-contact-charge"
                        value={props.contact.charge}
                        onChange={handleChange}
                    />
                    </label>
                </li>
                <li>
                    <label>
                    telefono:
                    <input type="text" id="input-contact-phone"
                        value={props.contact.phone}
                        onChange={handleChange}
                    />
                    </label>
                </li>
                <li>
                    <label>
                    email:
                    <input type="text" id="input-contact-email"
                        value={props.contact.email}
                        onChange={handleChange}
                    />
                    </label>
                </li>

                
            </ul>
            <button
                    className="badge badge-info"
                    onClick={handleSave}
                >&#128190;Guardar</button>
            
            </div>
        }


        return (
            <div>

                {list}


            </div>
        )
    
}//end ContactsEditor