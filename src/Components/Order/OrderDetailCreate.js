import React, {Component} from "react";
import {Link, Redirect} from 'react-router-dom'

class OrderDetailCreate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            orderid: props.match.params.orderid,
            productid: "",
            quantity: 1,
            createdOrderDetail: null
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleProductChange = this.handleProductChange.bind(this);
    }

    handleSubmit(event) {
        var data = {
            "id": 0,
            "orderid": parseInt(this.state.orderid),
            "productid": parseInt(this.state.productid),
            "quantity": parseInt(this.state.quantity)
        };
        var url = 'http://localhost:9000/api/orderdetail';

        fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        }).then(results => {
            return results.json();
        }).then(data => {
            this.setState({createdOrderDetail: true})
        });
    }

    handleInputChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleProductChange(event) {
        this.setState({
            productid: event.target.value
        });
    }

    componentDidMount() {
        let url = "http://localhost:9000/api/productbyorder/" + this.state.orderid

        fetch(url, {
            mode: 'cors',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': 'http://localhost:3000',
            },
            method: 'GET',
        })
            .then(results => {
                return results.json();
            }).then(data => {
            let products = data.map((prod) => {
                return (
                    <option key='Product_{prod.id}' value={prod.id} name="product">{prod.name}</option>
                )
            })
            this.setState({products: products})
        })
    }

    render() {
        if (this.state.createdOrderDetail !== null) {
            return <Redirect to={"/order/" + this.state.orderid}/>
        }

        return (
            <div>
                <label>
                    Quantity
                </label>
                <input className="form-control" id={this.state.value} name="quantity" type="text" value={this.state.quantity}
                       onChange={this.handleInputChange}
                />

                <div className="form-group">
                    <label htmlFor="productid">Product</label>
                    <select className="form-control" name="productid" id="productid" onChange={this.handleProductChange}>
                        <option value="1" name="productid">choose product</option>
                        {this.state.products}
                    </select>
                </div>

                <button className="btn btn-sm btn-secondary" onClick={this.handleSubmit}>Create</button>
                <Link to={"/order/" + this.state.orderid}
                      className="btn btn-sm btn-secondary">Cancel</Link>
            </div>
        );
    }
}

export default OrderDetailCreate;
