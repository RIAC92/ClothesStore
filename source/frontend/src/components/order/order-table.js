import React, { Component } from 'react';
import { read, remove, changeQty, getStock } from '../../shopping-cart'
import Table from 'react-bootstrap/Table'
export default class OrderTable extends Component {
    constructor(props) {
        super(props);

        this.state = {
            products: []
        }

        this.handleRemove = this.handleRemove.bind(this);
        this.handleQuantity = this.handleQuantity.bind(this);
    }//end constructor

    componentDidMount() {
        let products = read()
        this.setState({
            products: products
        })

    }

    handleRemove(e) {
        e.preventDefault();
        let id = e.target.id;
        let regex = /(?<=a-remove-)\w{4}/i;
        let item = id.match(regex)[0];
        remove(item);
        let products = read()
        this.setState({
            products: products
        })
    }//end handleSearch

    handleQuantity(e) {
        e.preventDefault();
        let id = e.target.id;
        let regex = /(?<=order-input-)\w{4}/i;
        let buy_code = id.match(regex)[0];
        let quantity =parseInt(e.target.value);
        let stock = getStock(buy_code);
        if (quantity > stock) {
            changeQty(buy_code, stock);
            let products = read();
            this.setState({
                products: products
            })
        } else if (quantity < 1) {
            changeQty(buy_code, 1);
            let products = read();
            this.setState({
                products: products
            })
        } else {
            changeQty(buy_code, quantity);
            let products = read()
            this.setState({
                products: products
            })
        }//end else

    }//end handleQuantity

    render() {
        let productTable = this.state.products.map((p, index) => {
            return <tr key={"t-" + p.buy_code}>
                <td>{index + 1}</td>
                <td>{p.buy_code}</td>
                <td>{p.size[0]}</td>
                <td><img src={p.images[0]} width="30px" /></td>
                <td>
                    <input
                        type="number"
                        id={"order-input-"+p.buy_code}
                        min="1"
                        max={p.stock}
                        value={p.quantity}
                        style={{ "width": "100%" }}
                        onChange={this.handleQuantity}
                    />
                </td>
                <td>{p.price}</td>
                <td>{p.price * p.quantity}</td>
                <td>
                    <a
                        className="text-danger"
                        href="#"
                        onClick={this.handleRemove}
                        key={"remove-" + p.buy_code}
                        id={"a-remove-" + p.buy_code}
                    >Quitar &#128465;</a>
                </td>
            </tr>
        })
        let total = 0;
        this.state.products.map(item => {
            total = total + item.price * item.quantity;
        })
        return (

            <div>
                <h1 className="text-primary">Pedidos</h1>
                <Table striped bordered hover responsive>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Código</th>
                            <th>Talla</th>
                            <th>Imagen</th>
                            <th>Cantidad</th>
                            <th>Precio unitario ($)</th>
                            <th>Sub total ($)</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {productTable}
                        <tr className="text-primary">
                            <td>Total:</td>
                            <td>${total}</td>
                        </tr>
                    </tbody>
                </Table>
            </div>

        )
    }
}