import axios from 'axios';
import React, { Component } from 'react';
import Search from './catalog/search-form'
import Gallery from './catalog/gallery';
import ProductView from './catalog/product-view';

import { Domain } from '../vars';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useParams,
    useRouteMatch
} from "react-router-dom";

export default class Catalog extends Component {
    constructor(props) {
        super(props);

        this.state = {
            catalog: [],
        }

        this.handleSearch = this.handleSearch.bind(this);

    }//end constructor

    componentDidMount() {
        axios.get(Domain+'/store/catalog')
            .then(res => {
                console.log('res,  axios: ', res)
                this.setState({
                    catalog: res.data
                })
            })
            .catch(e => console.log('error:', e));

    }

    handleSearch(querySearch) {
        let querySearchKeys = Object.keys(querySearch);
        let queryString = ''
        if (querySearchKeys.length === 0) {
            queryString = 'all=true'
        } else {
            let textArr = querySearchKeys.map(key => `${key}=${querySearch[key]}`);//end map
            queryString = 'all=false&' + textArr.join('&');
        }//end else

        let url = Domain + '/store/catalog/search?' + queryString

        axios.get(url)
            .then(res => {
                console.log('res,  axios: ', res)
                this.setState({
                    catalog: res.data
                })
            })
            .catch(e => console.log('error:', e));

        console.log('query string: ', url);
    }//end handleSearch

    render() {

        return (

            <Page
                handleSearch={this.handleSearch}
                catalog={this.state.catalog}
            />

        )
    }
}
// I had to create a Page component to use " let { path, url } = useRouteMatch();"
function Page(props) {

    let { path, url } = useRouteMatch();
    return (

        <div>
            <Switch>
                <Route exact path={path}>

                    <Search
                        onSearch={props.handleSearch}
                    />
                    <hr />
                    <Gallery
                        catalog={props.catalog}
                        url={url}
                    />


                </Route>

                <Route path={`${path}/:buy_code`}>
                    <ProductView 
                        catalog={props.catalog}
                    />
                </Route>
            </Switch>
        </div>

    );
}
/*
function ProductView(props) {

    let { buy_code} = useParams();
    return (
        <div>
        <Link to='/catalogo'><p className="info">Regresar</p></Link> 

            <h2>Ver producto</h2>
            <p>este es el producto</p>
            <b>{buy_code}</b>
        </div>
    );
}*/