
import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


export default class OrderForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: "Pablo",
            last_name: "Peréz",
            address: "Colonia San José San Salvador",
            phone: "79896545",
            email: "pablo_perez@gmail.com",
        }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);


    }//end constructor

    componentDidMount() {

    }
    handleChange(e){
        e.preventDefault();
        let id = e.target.id;
        let regex = /(?<=costumer-)\w+/i;
        let key = id.match(regex)[0];
        let value=e.target.value;
        let obj={}
        obj[key]=value
        this.setState(obj)
    }//end handleChange

    handleSubmit(e){
        e.preventDefault();
        let keys=Object.keys(this.state);
        let messages=keys.map(key=>{
            let r=validator(key,this.state[key]);
            if (r===null){
                return null
            }else{
                return r
            }
        })
        let msgToPrint=messages.filter(msg=>msg!==null);
        if(msgToPrint.length!==0){
            alert("el mesaje es: "+ msgToPrint.join(", "))
        }else{
            this.props.onSubmit(this.state)
        }
        
    }//handleSubmit

    render() {
        return (
            <Form onSubmit={this.handleSubmit}>
            <h2 className="text-primary">Solicitar El Pedido</h2>
                <Container
                style={{
                    "border":"solid",
                    "borderRadius":"5px",
                    "borderColor":"black",
                    "backgroundColor":"rgba(80,80,80,0.9)",
                    "padding":"20px"
                }}
                >
                    <Row xs={1} lg={2}>
                        <Col>
                            <Form.Group  className="mb-3" controlId="costumer-name">
                                <Form.Label className="text-warning">Nombre</Form.Label>
                                <Form.Control 
                                required
                                type="text"
                                placeholder="Ingrese su nombre"
                                value={this.state.name}
                                onChange={this.handleChange}
                                 />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group controlId="costumer-last_name">
                                <Form.Label className="text-warning">Apellido</Form.Label>
                                <Form.Control 
                                required
                                type="text"
                                placeholder="Ingrese su apellido"
                                value={this.state.last_name}
                                onChange={this.handleChange}
                                 />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Group controlId="costumer-address">
                                <Form.Label className="text-warning">Dirección</Form.Label>
                                <Form.Control 
                                required
                                type="text" 
                                placeholder="Ingrese su dirección"
                                value={this.state.address}
                                onChange={this.handleChange}
                                 />
                            </Form.Group>
                        </Col>
                    </Row>
                    <hr/>
                    <Row xs={1} lg={2}>
                        <Col>
                            <Form.Group controlId="costumer-phone">
                                <Form.Label className="text-warning">Teléfono</Form.Label>
                                <Form.Control 
                                required
                                type="text" 
                                placeholder="Ingrese su dirección"
                                value={this.state.phone}
                                onChange={this.handleChange} />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group controlId="costumer-email">
                                <Form.Label className="text-warning">Email</Form.Label>
                                <Form.Control 
                                required
                                type="email"
                                placeholder="ejemplo@email.com"
                                value={this.state.email}
                                onChange={this.handleChange} />
                                 
                            </Form.Group>
                        </Col>
                    </Row>
                    <Button variant="primary" type="submit">
                        Enviar &#128228;
                    </Button>

                </Container>

            </Form>
        )
    }
}

function validator(key,value){
    
    if(key==="name"||key==="last_name"){
        if(value.search(/\S/)===-1){
            return "Se debe completar el "+(key==="name"?"nombre":"apellido")
        }else if(value.search(/[^A-Za-zÀ-ÿ]/)!==-1){
            return "Ha ingresado un "+(key==="name"?"nombre":"apellido")+" inválido"
        }else{
            return null
        }
    }else if(key==="address"){
        if(value.search(/\S/)===-1){
            return "Se debe completar la dirección"
        }else if(value.search(/[A-Za-z]/)===-1){
            return "Ha ingresado una dirección inválida"
        }else{
            return null
        }
    }else if(key=="phone"){
        if(value.search(/\S/)===-1){
            return "Se debe completar el teléfono"
        }else if(value.search(/\d{8}/)!==-1&&value.length!==8){
            return "El numero de teléfono es inválido"
        }else{
            return null
        }
    }else if(key==="email"){
        if(value.search(/\S/)===-1){
            return "Se debe completar el email"
        }else if(value.search(/\S+[@]\S+[.]\S/)){
            return "El email es inválido"
        }else{
            return null;
        }
    }else{
        return null
    }
}