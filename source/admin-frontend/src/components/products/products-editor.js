import axios from 'axios';
import React, { useEffect,useState } from 'react';
import {   BrowserRouter as Router,useParams,Link } from 'react-router-dom';
import {Domain} from '../../vars';
import ProductsForm from './products-form/product-form';

export default function ProductEditor(){
    const {buy_code}=useParams();
    const [product,setProduct]=useState([]);
    const [showf,setShow]=useState(false)
    const [load,setLoad]=useState(0)
    useEffect(()=>{
        axios.get(Domain+'/admins/products/'+buy_code)
        .then(res=>{
            setProduct(res.data)
        })
    },[buy_code,load]);//useEffect only works at the begining and when 'buy_code' chang

    let keys=Object.keys(product)
    let show=keys.map(key=>{
        if (key==='images'){
            return <li>
            <b>{key}:</b>
            {product[key].map(img=>{
                return<a target="_blank" href={img}>
                <img src={img} style={{'width':'50px'}}/>
                </a>
            })}
            </li>
        }else if(key==='tags'){
            return<li><b>{key}</b>:{product[key].join(', ')}</li>
        }else if(key==='_id'||key==='__v'){
            return
        }else{
            return<li><b>{key}</b>:{product[key]}</li>
        }
        
    })
    return(
        <div>
         <Link to={'/admins-page/productos'}>⬅Regresar</Link>
         
        <div style={{
            'border':'solid',
            'borderRadius':'15px',
            'width':'500px',
        'paddingLeft':'50px'}}>
        <h3 className="text-primary">Ref:{product.buy_code}</h3>
            <ul>{show}</ul>
            
            <button 
            style={{'margin':'10px'}}
            className="btn btn-success" 
            onClick={()=>setShow(true)}>&#9999;Edit
            </button>
            </div>
            <ProductsForm
                product={product}
                show={showf}
                close={()=>setShow(false)}
                load={()=>{
                    let a=load+1;
                    return setLoad(a)
                }}
                method={'PUT'}
                buy_code={false}
            />
        </div>
    );
}
