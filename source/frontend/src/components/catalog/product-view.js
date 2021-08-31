import { Link, useParams, Redirect } from 'react-router-dom';
import React, { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import Button from 'react-bootstrap/Button';
import {add} from '../../shopping-cart'
import { produceWithPatches } from 'immer';



export default function ProductView(props) {

    const [quantity, setQuantity] = useState(1);


    

    let { buy_code } = useParams();
    let product = [];
    let show = null;
    if (props.catalog.length === 0) {

        show = <Redirect to="/catalogo" />

    } else {
        product = props.catalog.filter(p => p.buy_code === buy_code);
       
        let stock =product[0].stock;
        const handleChange = event => {
            setQuantity(event.target.value);
            
            if(event.target.value>stock){
                setQuantity(stock);
            }else if(event.target.value<1){
                setQuantity(1);
            }else{
                setQuantity(event.target.value);
            }
            
        };//end handleChange

        const handleAdd=()=>{
            let r=add(product[0],quantity);
            if(r){
                alert("Producto Agregado! Ver pedidos...")
            }else{
                alert('Algo ha salido mal!')
            }
        };//handleAdd

        let items = product[0].images.map((item, index) => {
            return <Carousel.Item key={buy_code + index.toString()}>
                <img
                    className="d-block w-100"
                    src={item}
                    alt="error"
                    width="100%"
                    key={buy_code + 'Img' + index.toString()}
                    style={{ "border": 'solid' }}
                />
                <Carousel.Caption key={'banner-caption' + index.toString()}>
                    <div style={{ 
                        "width":"100%",
                        "height":"auto"
                       
                         }}>
                      
                        <b style={{ 
                            "backgroundColor": "rgba(5,5,5,0.75)",
                            "padding":"10px"
                            }}>Imagen: {(index + 1).toString()}</b>
                    </div>
                </Carousel.Caption>
            </Carousel.Item>
        });//end product[0].images.map
        let divCarouselsCss = {
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
        }
        show = <div >
            <Link to='/catalogo' style={{ "textDecoration": "none" }}><p className="info">&#11013;Regresar</p></Link>

            <h2 className="text-primary">Producto ref: {product[0].buy_code}</h2>


            <div style={divCarouselsCss}>
                <Carousel variant="dark">
                    {items}
                </Carousel>

            </div>
            <div style={{
                "width": "100%",
                "height":"5rem",
                "marginTop":"2rem",
                "display": "flex",
                "flexDirection": "column",
                "justifyContent": "center",
                "alignItems": "center"
            }}>
            <h4>Agregar producto</h4>
                <div style={{
                    "width": "15rem",
                    "border": "solid",
                    "borderRadius":"5px",
                    "display": "flex",
                    "flexDirection": "rows",
                    "justifyContent": "center",
                    "alignItems": "center",
                    "padding":"10px",
                    "backgroundColor": "rgba(5,5,5,0.75)"

                }}>

                    <input type="number" 
                    min="1"
                    max={product[0].stock}
                    value={quantity}
                    onChange={handleChange}
                    className="form-control" 
                    style={{ "width": "4rem" }} />
                    <div style={{ "width": "1rem" }}></div>
                    <Button 
                    variant="warning"
                    onClick={handleAdd}
                    >Agregar &#128722;</Button>


                </div>
            </div>
            <br />
            <h3 className="text-info">Información:</h3>
            <hr />
            <ul className="text-light" style={{ "backgroundColor": "rgba(5,5,5,0.75)" }}>
                <li><b>{product[0].name}</b></li>
                <li>Código: <b>{product[0].buy_code}</b></li>
                <li>Descripción: <b>{product[0].description}</b></li>
                <li>Marca: <b>{product[0].mark}</b></li>
                <li>Precio: <b>$ {product[0].price}</b></li>
                <li>Talla: <b> {product[0].size.join(', ')}</b></li>
                <li>Stock: <b> {product[0].stock}</b></li>

            </ul>
        </div>

    }//end else

    return (
        <div style={{
            "width": "100vw",
            "position": "absolute",
            "left": "0px",
            "margin": "0",
            "backgroundColor": "rgba(5,5,5,0.1)"
        }}>
            {show}
        </div>
    );
}