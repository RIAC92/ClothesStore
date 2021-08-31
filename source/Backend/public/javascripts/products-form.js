window.onload = () => {
    let createBtn = document.getElementById('create-product-btn');
    let selectBtn = document.getElementById('select-btn');
    let deleteBtn=document.getElementById('delete-btn');
    let addImgBtn=document.getElementById('add-img-btn');
    let deleteImgBtn=document.getElementById('delete-img-btn');
    
    let dataProduct = null;

    createBtn.addEventListener('click', () => {
        let inputs = document.getElementsByClassName('create-input');
        let newProduct = {};
        for (let i = 0; i < inputs.length; i++) {
            if (inputs[i].value == '') {
                alert('todos los campos deben de ser llenados');
                return
            }
            switch (inputs[i].name) {
                case 'size':
                    let content = inputs[i].value.toUpperCase();
                    newProduct[inputs[i].name] = content.split(',');
                    break;
                case 'images':
                    newProduct[inputs[i].name] = [inputs[i].value];
                    break;
                case 'tags':
                    newProduct[inputs[i].name] = [inputs[i].value];
                    break;
                case 'price':
                    newProduct[inputs[i].name] = parseFloat(inputs[i].value);
                    break;
                case 'stock':
                    newProduct[inputs[i].name] = parseInt(inputs[i].value);
                    break;
                case 'discount':
                    newProduct[inputs[i].name] = parseFloat(inputs[i].value);
                    break;
                default:
                    newProduct[inputs[i].name] = inputs[i].value
                    break;
            }//end switch
        };//end for
        console.log('estos son los datos llenados: ', newProduct)

        let bodyToSend = JSON.stringify(newProduct);
        let url = 'http://localhost:5000/admins/products'
        fetch(url, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: bodyToSend
        })
            .then(res => res.json())
            .then(data => {
                alert(data.message || data.error);
                return
            })
            .catch(e => {
                alert('ha ocurrido un error')
                console.log(e)
                return
            })
    });//createBtn.addEventListener

    selectBtn.addEventListener('click', () => {
        let buy_code = document.getElementById('select-buy-code').value;
        let showDiv=document.getElementById('select-div');
        if (buy_code === '') {
            alert('todos los campos deben de ser rellenados');
            return
        }
        let url = 'http://localhost:5000/admins/products/' + buy_code;
        fetch(url, { method: 'get' })
            .then(res => res.json())
            .then(data => {
                console.log('datos recibidos:', data);
                dataProduct=Object.assign({},data);
                let dataKeys = Object.keys(data);
                let show = dataKeys.map(key => {
                    switch (key) {
                        case 'size':
                            let sizes = data[key].join(',')
                            return `<li>talla: ${sizes}</li>`
                        case 'tags':
                            let tags = data[key].join(',')
                            return `<li>viñetas: ${tags}</li>`
                        case 'units_sold':
                            return `<li>unidades vendidas: ${JSON.stringify(data[key])}</li>`
                        case 'views':
                            return `<li>vistas: ${JSON.stringify(data[key])}</li>`
                        case 'images':
                            return ''
                        case '__v':
                            return ''
                        default:
                            return `<li>${key}: ${data[key]}</li>`
                    }
                })
                let images=data.images.map((img,i)=>{
                    return `<b>img-${i+1} </b><img src="${img}"/><span> <span>`
                })
                let show2=`<li><p>images: </p><div>${images.join('')}</div></li>`
                showDiv.innerHTML='<ul>'+show.join('')+show2+'</ul>';
                return
            })
            .catch(e => {
                showDiv.innerHTML='Record product do not exist!'
                alert('ha ocurrido un error');
                console.log(e);
                return
            })
    });//selectBtn.addEventListener

    deleteBtn.addEventListener('click',()=>{
        if(!dataProduct){
            alert('Es necesario seleccionar un producto')
            return
        }
        let buy_code=dataProduct.buy_code;
        let url = 'http://localhost:5000/admins/products/' + buy_code;
        fetch(url,{method:'delete'})
        .then(res=>res.json())
        .then(data=>{
            alert(data.message||data.error)
            return
        })
        .catch(e=>{
            alert('A error has occurred')
            console.log(e)
        })
        
    });//deleteBtn.addEventListener

    addImgBtn.addEventListener('click',()=>{
        if(!dataProduct){
            alert('Es necesario seleccionar un producto')
            return
        }
        let newImg=document.getElementById('add-img-input').value;
        let bodyToSend=JSON.stringify({
            buy_code:dataProduct.buy_code,
            dataUpdate:{
                images:[...dataProduct.images,newImg]
            }
        })
        let url = 'http://localhost:5000/admins/products/';
        fetch(url,{
            method:'put',
            headers:{
                'Content-Type': 'application/json'
            },
            body:bodyToSend
        })
        .then(res=>res.json())
        .then(data=>{
            alert(data.message||data.error);
            return
        })
        .catch(e=>{
            alert('A error has ocurred');
            console.log(e)
        })
        
    });//addImgBtn.addEventListener

    deleteImgBtn.addEventListener('click',()=>{
        if(!dataProduct){
            alert('Es necesario seleccionar un producto')
            return
        }
        let nImage=parseInt(document.getElementById('delete-img-input').value)-1;
        if(nImage<0 ||nImage>dataProduct.images.length){
            alert('entrada invalida');
            return
        }
        let images=dataProduct.images.filter(img=>{
            return img!==dataProduct.images[nImage]
        });
        let bodyToSend=JSON.stringify({
            buy_code:dataProduct.buy_code,
            dataUpdate:{
                images:images
            }
        })
        let url = 'http://localhost:5000/admins/products/';
        fetch(url,{
            method:'put',
            headers:{
                'Content-Type': 'application/json'
            },
            body:bodyToSend
        })
        .then(res=>res.json())
        .then(data=>{
            alert(data.message||data.error);
            return
        })
        .catch(e=>{
            alert('A error has ocurred');
            console.log(e)
        })
    })
}