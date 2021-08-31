import React, { Component } from 'react';
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom';
import {add} from '../../shopping-cart'




export default class ProductCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
    }


    this.handleClickAdd = this.handleClickAdd.bind(this);

  }//end constructor

  componentDidMount() {

  }


  handleClickAdd(event) {
    event.preventDefault();
    add(this.props.product,1);                                    
    alert("Agregado, ver pedidos!");
  }

  render() {

    return (
      <Card style={{ "width": '100%', "height": "auto", "marginTop":"15px" }}>
        <Card.Img variant="top" src={this.props.image}
          style={{ "width": "100%", "height": "auto" }} />
        <Card.Body style={{"backgroundColor":"rgba(5,5,5,0.1)"}}>
          <Card.Title><h4 className="text-primary">{this.props.name}</h4></Card.Title>
          <Card.Text>
            <h4 >Talla: {this.props.product.size}</h4>
            <span className="text-muted"> ref: {this.props.buy_code}</span>
          </Card.Text>



          <div style={{
            "width":"100%",
            "padding":"5px",
            "borderRadius":"5px",
            "display": "grid",
            "gridTemplateColumns": " 1fr 1fr  1fr 1fr",
            "gridGap": "10px",
            "backgroundColor":"rgba(80,80,80,0.9)"
          }}>
          <div></div>
            <Link to={`${this.props.url}/` + this.props.buy_code}>
              <Button
                variant="primary"
                style={{ "width": "100%","height":"auto" }}
              >Ver</Button>
            </Link>
         
            <Button
              variant="warning"
              style={{ "width": "90%","height":"auto" }}
              onClick={this.handleClickAdd}
            >&#128722;</Button>
            <div></div>
          </div>


        </Card.Body>
      </Card>
    )
  }
}

