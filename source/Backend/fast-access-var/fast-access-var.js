const fs = require('fs');
const path = require('path');
const util = require('util');
const file={
  tags:__dirname+'/config-tags.txt',
  banner:__dirname+'/config-banner.txt'
}


const readFilePromise = util.promisify(fs.readFile);
const writeFilePromise= util.promisify(fs.writeFile);

const read=(fileName)=>{
  
  return readFilePromise(file[fileName],'utf8')
        .then(data =>{
          return JSON.parse(data)
        })
        .catch(err => {
          console.log(err);
          return err
        });
}


const write=(obj,fileName)=>{
  let text=JSON.stringify(obj)
  return writeFilePromise(file[fileName], text)
  .then(()=>{
    return null;
  })
  .catch(err=>{
    console.log(err);
    return err
  })
}


/*
let dataTags={
  color:['rojo','azul','verde'],
  tipo:['deporte','casual','formal']
  
}
let dataBanner={
  banner_images:['img1','img2','https://proyecto-riac.000webhostapp.com/images-clothes-store/aa00-1-nike-camisapolo.jpg'],
  main_banner:{
    title:'titulo',
    message:'este es un mensaje'
  }

}
 read('banner')
 .then(data=>console.log('Estos son los datos:',data))
 .then(()=>write(dataBanner,'banner'))
 .then((data)=>console.log(data))
*/

module.exports = {
 read,
 write
}