import axios from 'axios';
import React, { Component, useState } from 'react';

import OrderList from './orders/order-list';
import OrdersViewer from './orders/orders-viewer';




import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useParams,
    useRouteMatch,
    useHistory
} from "react-router-dom";


export default function Orders() {
    let { path, url } = useRouteMatch();
    return (

        <div>
            <Switch>
                <Route exact path={path}>

                    <h2> Lista De Pedidos (ver detalles)</h2>
                    <OrderList
                        url={url}
                    />
                </Route>

                <Route path={`${path}/edit/:follow_code`}>
                    <OrdersViewer />
                </Route>

            </Switch>
        </div>

    );
}

