import axios from 'axios';
import React, { Component } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import {Domain} from '../vars'

export default class CarouselBanner extends Component {
    constructor(props) {
        super(props);

        this.state = {
            banner: []
        }

        // this.deleteExcercise=this.deleteExcercise.bind(this);

    }//end constructor

    componentDidMount() {
        axios.get(Domain+'/store/home')
            .then(res => {
                console.log('res,  axios: ', res)
                this.setState({
                    banner: Object.assign(this.state.banner, res.data)
                })
            })
            .catch(e => console.log('error:', e));

    }

    /*deleteExcercise(id){
        axios.delete('http://localhost:5000/excercises/'+id)
        .then(res=>console.log(res.data));
        this.setState({
            excercises:this.state.excercises.filter(el=>el._id!==id)
        })
    }*/


    render() {
        let items = null
        if (this.state.banner[0]) {
            items = this.state.banner.map((item, index) => {
                return <Carousel.Item key={'banner-item' + index.toString()}>
                    {console.log('item.img: ', item.img)}
                    <img
                        className="d-block w-100"
                        src={item.img}
                        alt="Second slide"
                        width="30%"
                        height="60%"
                        key={'banner-img' + index.toString()}
                    />
                    <Carousel.Caption key={'banner-caption' + index.toString()}>
                    <div style={{"backgroundColor":"rgba(5,5,5,0.75)"}}>
                        <b style={{"fontSize":"1.2rem"}}>{item.title}</b>
                        <p>{item.description}</p>
                        </div>  
                    </Carousel.Caption>
                </Carousel.Item>
            })

        } else {
            items=<Carousel.Item >fallo en la conexión!</Carousel.Item>
        }
        return (
            <div>
                <Carousel  variant="dark">
                    {items}
                </Carousel>
            </div>
        )
    }
}