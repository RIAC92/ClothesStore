
window.onload = () => {
    let createBtn = document.getElementById('create-btn');
    let deleteBtn=document.getElementById('delete-btn');
    
    createBtn.addEventListener('click', ()=>{
        
        let createInputs = document.getElementsByClassName('create-user');
        let  userData={};
        for (let i = 0; i < createInputs.length; i++) {
            if(createInputs[i].value===''){
                alert('Todos los campos deben de ser llenados')
                return
            }
            userData[createInputs[i].name]=createInputs[i].value;
        }//end for
        if(userData.password!==userData.password_confirm){
            alert('Contraseñas no coinciden')
            return
        }
        console.log(userData)
        let bodyToSend=JSON.stringify({
            username:userData.username,
            password:userData.password,
            admin_password:userData.admin_password
        });
        let url="http://localhost:5000/users?action=newUser"
        fetch(url, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: bodyToSend
        })
        .then(res=>res.json())
        .then(data=>{
            console.log(data);
            alert(data.message||data.error);
            return
        })
        .catch(e=>{
            console.log(e);
            alert('Ha ocurrido un error')
        })
    });//createBtn.addEventListener

    deleteBtn.addEventListener('click',()=>{
        let deleteInputs=document.getElementsByClassName('delete-user');
        let userData={};
        for (let i = 0; i < deleteInputs.length; i++) {
            if(deleteInputs[i].value===''){
                alert('Todos los campos deben de ser llenados')
                return
            }
            userData[deleteInputs[i].name]=deleteInputs[i].value;
        }//end for
        if(Object.keys(userData).length!==deleteInputs.length){
            alert('Es necesario llenar todos los campos');
            return
        }//end if
        let bodyToSend=JSON.stringify({
            id:userData.id,
            admin_password:userData.admin_password
        })
        let url="http://localhost:5000/users?action=delete"
        fetch(url, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: bodyToSend
        })
        .then(res=>res.json())
        .then(data=>{
            console.log(data);
            alert(data.message||data.error);
            return
        })
        .catch(e=>{
            console.log(e);
            alert('Ha ocurrido un error')
        })
    })//deleteBtn.addEventListener
    
}//window.onload