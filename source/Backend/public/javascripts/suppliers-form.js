window.onload = function () {
    let showBtn = document.getElementById('show');
    let deleteSupplier = document.getElementById('delete-supplier')
    let idInput = document.getElementById('id-input');
    let ulGeneral = document.getElementById('general');
    let divContacs = document.getElementById('contacts');
    let addContactBtn = document.getElementById('add-contact-btn')
    let pAddCompanyID = document.getElementsByClassName('company-id')
    let deleteContactBtn = document.getElementById('delete-contact-btn');

    let editContactBtn = document.getElementById('edit-contact-btn');
    let dataCompany = null;
    pAddCompanyID.innerHTML = 'es necesario seleccionar una compañia'

    showBtn.addEventListener("click", () => {
        let id = idInput.value;
        let url = 'http://localhost:5000/admins/suppliers/' + id;
        fetch(url, { method: 'GET' })
            .then(res => res.json())
            .then(data => {
                if (!data.error) {
                    console.log('Info of company', data);
                    dataCompany = Object.assign({}, data)
                    let text = `  <li>company: ${data.company} </li>
            <li>country: ${data.country}</li>
            <li>created_on: ${data.created_on}</li>
            <li>updated_on: ${data.updated_on}</li>`;
                    ulGeneral.innerHTML = text;
                    for (let i = 0; i < pAddCompanyID.length; i++) {
                        pAddCompanyID[i].innerHTML = data._id;
                    }


                    if (data.contacts_id.length > 0) {
                        contacsText = data.contacts_id.map(contact => {
                            return `<ul>
                        <li>id: ${contact._id}</li>
                            <li>company_id: ${contact.company_id}</li>
                            <li>name: ${contact.name}</li>
                            <li>charge: ${contact.charge}</li>
                            <li>phone: ${contact.phone}</li>
                            <li>email: ${contact.email}</li>
                            </ul>`
                        })
                        divContacs.innerHTML = contacsText.join('');
                    } else {
                        divContacs.innerHTML = '<p>No hay contactos disponibles</p>'
                    }//end else
                } else {
                    ulGeneral.innerHTML='No existe el proveedor';
                    divContacs.innerHTML='';

                }//end else
            })

            .catch(e => {
                console.log(e)
                alert('Error: can not get the info')
            })
    });//end addEvenetListener showBtn

    deleteSupplier.addEventListener('click', () => {
        if (dataCompany === null) {
            alert('Es necesario seleccionar un proveedor');
            return
        } else {
            let sure = confirm('Desea eliminar el proveedor de la base de datos: ');
            if (sure) {
                let url = 'http://localhost:5000/admins/suppliers/';
                fetch(url + dataCompany._id, { method: 'delete' })
                    .then(res => res.json())
                    .then(data => alert(data.message || data.error))
                    .catch(e => {
                        console.log(e);
                        alert('A ocurrido un error');
                    })
            }//end if

        }//end else

    });//deleteSupplier.addEventListener

    addContactBtn.addEventListener('click', () => {
        if (dataCompany === null) {
            alert('no se puede agregar contactos sin seleccionar una compañia');
            return
        } else {//----------------------------------------------------------------
            let addInputs = document.getElementsByClassName('add-in');
            let contactData = {};
            for (let i = 0; i < addInputs.length; i++) {
                contactData[addInputs[i].name] = addInputs[i].value;
                if (contactData[addInputs[i].name] == '') {
                    console.log('hay campos del contact vacios')
                    return alert('Es necesario llenar todos los campos para agregar el contacto')
                }
            }//end for
            contactData.company_id = dataCompany._id;
            console.log('informacion del contacto para enviar: ', contactData);
            let bodyToSend = JSON.stringify(contactData);
            let url1 = 'http://localhost:5000/admins/contacts/'
            let url2 = 'http://localhost:5000/admins/suppliers/'

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
                .then(data => console.log(data))
                .catch(e => console.log(e));
        }//en else
    });//end addContactBtn.addEventListener

    deleteContactBtn.addEventListener('click', () => {
        if (dataCompany === null) {
            alert('no se puede eliminar contactos sin seleccionar una compañia');
            return
        } else {
            let url1 = 'http://localhost:5000/admins/contacts/';
            let url2 = 'http://localhost:5000/admins/suppliers/';
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

    });//end deleteContactBtn.addEventListener

    editContactBtn.addEventListener('click', () => {
        if (dataCompany == null) {
            alert('no se puede agregar contactos sin seleccionar una compañia');
            return
        } else {
            let editInputs = document.getElementsByClassName('edit-in');
            let id = document.getElementById('edit-id').value;

            if (id == '') {
                alert('Debe completar el id del contacto');
                return
            }
            let contactInfo = {};
            for (let i = 0; i < editInputs.length; i++) {
                if (editInputs[i].value !== '') {
                    contactInfo[editInputs[i].name] = editInputs[i].value;
                }
            }//end for
            if (Object.keys(contactInfo).length === 0) {
                alert('Las entradas estan vacias, no se pueden guardar los cambios');
                return
            }
            let bodyToSend = JSON.stringify({
                contact_id: id,
                dataUpdate: contactInfo
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
}//end windowson load


