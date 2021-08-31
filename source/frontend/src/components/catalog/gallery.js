
import React, { Component } from 'react';

import ProductCard from './card';

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'


export default class Gallery extends Component {
    constructor(props) {
        super(props);

       /* this.state = {
        }*/
   }//end constructor

    render() {
        let cards = null;
        if (this.props.catalog.length === 0) {
            cards = <h3>No hay productos con esa descripción</h3>
        } else {
          
            let productArr = this.props.catalog;
            cards = [];
            let rowContent = [];
            
            for (let i = 0; i < productArr.length; i++) {
                rowContent.push(<Col>
                    <ProductCard
                        key={productArr[i].buy_code}
                        image={productArr[i].images[0]}
                        name={productArr[i].name}
                        description={productArr[i].description}
                        buy_code={productArr[i].buy_code}
                        url={this.props.url}
                        product={productArr[i]}

                        />
                </Col>)
                if((i%2)!==0){
                    cards.push(<Row xs={1} md={2} lg={2}> {rowContent}</Row>);
                    rowContent=[];//reset de rowContent
                }else if((i===productArr.length-1)&&((productArr.length-1)%2)===0){
                    cards.push(<Row xs={1} md={2} lg={2}>{rowContent}<Col></Col></Row>)
                    rowContent=[]
                }

            }//end for



        }//end else
        return (
           
                <Container fluid ="md">
                {cards}
                </Container>
           
        )
    }
}