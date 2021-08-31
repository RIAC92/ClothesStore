window.onload = () => {
    let addDeliverBtn = document.getElementById('add-deliver-btn');
    let selectDeliverBtn = document.getElementById('select-deliver-btn');
    let bCompanyID = document.getElementsByClassName('company-id');
    let addContactBtn = document.getElementById('add-contact-btn');
    let deleteContactBtn=document.getElementById('delete-contact-btn');
    let deleteDeliverBtn=document.getElementById('delete-deliver');
    let editContactBtn=document.getElementById('edit-contact-btn');
    let dataCompany = null;

    addDeliverBtn.addEventListener('click', () => {
        let addDeliverInputs = document.getElementsByClassName('add-deliver-input')
        let dataNewDeliver = {};
        for (let i = 0; i < addDeliverInputs.length; i++) {
            if (addDeliverInputs[i].value !== '') {
                dataNewDeliver[addDeliverInputs[i].name] = addDeliverInputs[i].value;
            }

        }//end for
        if (Object.keys(dataNewDeliver).length < 2) {
            alert('Todos los campos deben de ser llenados')
            return
        }//end if
        let url = 'http://localhost:5000/admins/delivers';
        let bodyToSend = JSON.stringify(dataNewDeliver);
        fetch(url, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: bodyToSend
        })
            .then(res => res.json())
            .then(data => alert(data.message || data.error))
            .catch(e => {
                console.error(e);
                alert('Ha ocurrido un error');
                return
            })

    });//end addDeliverBtn.addEventListener

    selectDeliverBtn.addEventListener('click', () => {

        let id = document.getElementById('select-id-input').value;
        let ulGeneral = document.getElementById('general');
        let divContacts = document.getElementById('contacts');
        if (id == '') {
            alert('Debe de ingresar un ID');
            return
        }//end if
        let url = 'http://localhost:5000/admins/delivers/';
        fetch(url + id, { method: 'get' })
            .then(res => res.json())
            .then(data => {
                if (!data.error) {
                    console.log('Info of company', data);
                    dataCompany = Object.assign({}, data)
                    let text = `<li>company: ${data.company} </li>
                                <li>country: ${data.country}</li>
                                <li>created_on: ${data.created_on}</li>
                                <li>updated_on: ${data.updated_on}</li>`;

                    ulGeneral.innerHTML = text;

                    for (let i = 0; i < bCompanyID.length; i++) {
                        bCompanyID[i].innerHTML = data._id;
                    }


                    if (data.contacts_id.length > 0) {
                        let contactsText = data.contacts_id.map(contact => {
                            return `<ul>
                    <li>id: ${contact._id}</li>
                        <li>company_id: ${contact.company_id}</li>
                        <li>name: ${contact.name}</li>
                        <li>charge: ${contact.charge}</li>
                        <li>phone: ${contact.phone}</li>
                        <li>email: ${contact.email}</li>
                        </ul>`
                        })
                        divContacts.innerHTML = contactsText.join('');
                    } else {
                        divContacts.innerHTML = '<p>No hay contactos disponibles</p>'
                    }//end else
                } else {
                    ulGeneral.innerHTML = 'No existe el proveedor';
                    divContacts.innerHTML = '';

                }//end else
            })
    });//end selectDeliverBtn.addEventListener

    addContactBtn.addEventListener('click', () => {
        if (dataCompany === null) {
            alert('Es necesario selecionar una compañia');
            return
        } else {
            let contactInputs = document.getElementsByClassName('add-contact-input');
            let contactData = {};
            for (let i = 0; i < contactInputs.length; i++) {
                if (contactInputs[i].value !== '') {
                    contactData[contactInputs[i].name] = contactInputs[i].value;
                }
            }//end for
            if (Object.keys(contactData).length !== contactInputs.length) {
                alert('Es necesario llenar todas las entradas')
                return
            }//end if

            contactData.company_id = dataCompany._id;
            console.log('informacion del contacto para enviar: ', contactData);
            let bodyToSend = JSON.stringify(contactData);
            let url1 = 'http://localhost:5000/admins/contacts/'
            let url2 = 'http://localhost:5000/admins/delivers/'

            fetch(url1, {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: bodyToSend
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                    bodyToSend = null;
                    bodyToSend = JSON.stringify({
                        company_id: dataCompany._id,
                        dataUpdate: {
                            contacts_id: [...dataCompany.contacts_id, data.contact_id]
                        }
                    });

                    return fetch(url2, {
                        method: 'put',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: bodyToSend
                    })//end second fetch        
                })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    alert(data.message||data.error)
                    return
                })
                .catch(e => console.log(e));
        }//end else
    });//addContactBtn.addEventListener

    deleteDeliverBtn.addEventListener('click',()=>{
        if (dataCompany === null) {
            alert('Es necesario seleccionar un repartidor');
            return
        } else {
            let sure = confirm('Desea eliminar el repartidor de la base de datos: ');
            if (sure) {
                let url = 'http://localhost:5000/admins/delivers/';
                fetch(url + dataCompany._id, { method: 'delete' })
                    .then(res => res.json())
                    .then(data => alert(data.message || data.error))
                    .catch(e => {
                        console.log(e);
                        alert('A ocurrido un error');
                    })
            }//end if

        }//end else

    });//end deleteDeliver.addEventListener

    deleteContactBtn.addEventListener('click',()=>{
        if (dataCompany === null) {
            alert('no se puede eliminar contactos sin seleccionar una compañia');
            return
        } else {
            let url1 = 'http://localhost:5000/admins/contacts/';
            let url2 = 'http://localhost:5000/admins/delivers/';
            let contact_id = document.getElementById('delete-id').value;
            //console.log('in delete: ',dataCompany.contacts_id)
            let contacts_id_arr = dataCompany.contacts_id.filter(c => c._id != contact_id);
            if (contact_id == '') {
                alert('El campo ID, para eliminar, esta vacio')
                return
            } else {
                fetch(url1 + contact_id, { method: 'delete' })
                    .then(res => res.json())
                    .then(data => {
                        if (data.message) {
                            let bodyToSend = JSON.stringify({
                                company_id: dataCompany._id,
                                dataUpdate: {
                                    contacts_id: contacts_id_arr
                                }
                            });
                            return fetch(url2, {
                                method: 'put',
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                body: bodyToSend
                            })//end second fetch
                        } else {
                            alert(data.error)
                            throw 'Contact cannot be deleted';

                        }//end else
                    })
                    .then(res => res.json())
                    .then(data => {
                        console.log(data)
                        alert(data.message || data.error)
                        return
                    })
                    .catch(e => {
                        alert('Ha ocurrido un error a la hora de eliminiar el contacto');
                        console.log(e);
                    });


            }//end else

        }//end else

    });//deleteContactBtn.addEventListener

    editContactBtn.addEventListener('click',()=>{
        if(dataCompany==null){
            alert('es necesaria seleccionar una compañia')
            return
        }else{
            let editContactInfo={}
            let editContactInputs=document.getElementsByClassName('edit-in');
            let id=document.getElementById('edit-id').value;
            if(id==''){
                alert('Es necesaio ingresar un id')
                return
            }//end if
            for(let i=0;i<editContactInputs.length;i++){
                if(editContactInputs[i].value!==''){
                    editContactInfo[editContactInputs[i].name]=editContactInputs[i].value;
                }//end if
            }//end for
            if(Object.keys(editContactInfo).length===0){
                alert('No se ha llenado ningun campo')
                return
            }
            console.log(editContactInfo);
            let bodyToSend = JSON.stringify({
                contact_id: id,
                dataUpdate: editContactInfo
            });
            let url = 'http://localhost:5000/admins/contacts/';
            fetch(url, {
                method: 'put',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: bodyToSend
            })//end fetch)
                .then(res => res.json())
                .then(data => {
                    alert(data.message || data.error);
                    return
                })
                .catch(e => {
                    console.log(e)
                    alert('Ha ocurrido un error');
                    return
                })

        }//end else
    });//editContactBtn.addEventListener

}//end window.onload