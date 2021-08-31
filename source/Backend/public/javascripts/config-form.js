window.onload = () => {
    let url = "http://localhost:5000/admins/config";
    let showTags = document.getElementById('tags');
    let showBanner = document.getElementById('show-banner');
    
    
    let dataConfig=null;
    fetch(url, { method: 'get' })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            dataConfig=Object.assign({},data);
            let fastConfig = Object.assign({}, data);
            let tagsKeys = Object.keys(fastConfig.tags);
            let tagsArr = [];

            for (let i = 0; i < tagsKeys.length; i++) {
                let text = `<b>${tagsKeys[i]}</b>`;
                tagsArr.push(text);
                text = null;

                text = fastConfig.tags[tagsKeys[i]].map((tag, index) => {
                    return `<li>${index + 1}- ${tag}</li>`
                });
                tagsArr.push(text.join(''));
            }


            showTags.innerHTML = tagsArr.join('');
            let bannerArr=fastConfig.banner.map((item,index)=>{
                return `<ul>
                            <li> banner: #${index}</li>
                            <li> <img src="${item.img}" width="100px" height="50px"></li>
                            <li> title:"${item.title}"</li>
                            <li> description:"${item.description}"</li>
                        </ul>`
            })
            showBanner.innerHTML = bannerArr.join('');
            

        })
        .then(() => {
            let addTagCatBtn = document.getElementById('add-tag-cat-btn');
            let deleteTagCatBtn=document.getElementById('delete-tag-cat-btn');
            
            addTagCatBtn.addEventListener('click', () => {
                let dataUpdate=Object.assign({},dataConfig);
                let newCat = document.getElementById('add-tag-cat-input').value;
                dataUpdate.tags[newCat]=[];
                let body = {
                    fileName: 'tags',
                    dataUpdate: dataUpdate.tags
                }
                console.log('esto se enviara',body)
                let bodyToSend = JSON.stringify(body);
                let url="http://localhost:5000/admins/config";
                fetch(url,{
                    method:'put',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: bodyToSend
                })
                .then(res=>res.json())
                .then((data)=>{
                    console.log('recibido:',data)
                    alert(data.message||data.error)
                    return
                })
                .catch(e=>{
                    alert('ha ocurrido un error');
                    console.log(e)
                    return
                })
            });//addTagCatBtn.addEventListener

            deleteTagCatBtn.addEventListener('click', () => {
                let dataUpdate=Object.assign({},dataConfig);
                let deleteCat = document.getElementById('delete-tag-cat-input').value;
                delete dataUpdate.tags[deleteCat];
                let body = {
                    fileName: 'tags',
                    dataUpdate: dataUpdate.tags
                }
                console.log('esto se enviara',body)
                let bodyToSend = JSON.stringify(body);
                let url="http://localhost:5000/admins/config";
                fetch(url,{
                    method:'put',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: bodyToSend
                })
                .then(res=>res.json())
                .then((data)=>{
                    console.log('recibido:',data)
                    alert(data.message||data.error)
                    return
                })
                .catch(e=>{
                    alert('ha ocurrido un error');
                    console.log(e)
                    return
                })
            });//addTagCatBtn.addEventListener
            
        })
        .catch(e => {
            console.log(e);
            alert('Ha ocurrido un error')
            return
        })
}