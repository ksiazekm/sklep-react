import React, {Component} from "react";
import {Link, Redirect} from 'react-router-dom'

class OrderCreate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: 0,
            customerid: 1,
            paymentid: "",
            deliveryid: "",
            discountid: "",
            status: 0,
            createdOrderID: null
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handlePaymentChange = this.handlePaymentChange.bind(this);
        this.handleDeliveryChange = this.handleDeliveryChange.bind(this);
        this.handleDiscountChange = this.handleDiscountChange.bind(this);
    }

    handleSubmit(event) {
        var data = {
            "id": parseInt(this.state.id),
            "customerid": parseInt(this.state.customerid),
            "paymentid": parseInt(this.state.paymentid),
            "deliveryid": parseInt(this.state.deliveryid),
            "discountid": parseInt(this.state.discountid),
            "status": parseInt(this.state.status)
        };
        var url = 'http://localhost:9000/api/order';

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
            this.setState({createdOrderID: data.order.id})
        });
    }

    handlePaymentChange(event) {
        this.setState({
            paymentid: event.target.value
        });
    }

    handleDeliveryChange(event) {
        this.setState({
            deliveryid: event.target.value
        });
    }

    handleDiscountChange(event) {
        this.setState({
            discountid: event.target.value
        });
    }

    componentDidMount() {
        let url = "http://localhost:9000/api/deliveries"

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
            let deliveries = data.map((del) => {
                return (
                    <option value={del.id} name="delivery">{del.name}</option>
                )
            })
            this.setState({deliveries: deliveries})
        })

        url = "http://localhost:9000/api/payments"

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
            let payments = data.map((pay) => {
                return (
                    <option value={pay.id} name="supplier">{pay.name}</option>
                )
            })
            this.setState({payments: payments})
        })

        url = "http://localhost:9000/api/discounts"

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
            let discounts = data.map((disc) => {
                return (
                    <option value={disc.id} name="discount">{disc.value} %</option>
                )
            })
            this.setState({discounts: discounts})
        })
    }

    render() {
        if (this.state.createdOrderID !== null) {
            return <Redirect to={"/order/" + this.state.createdOrderID}/>
        }

        return (
            <div>
                <div className="form-group">
                    <label htmlFor="deliveryid">Category</label>
                    <select className="form-control" name="deliveryid" id="deliveryid" onChange={this.handleDeliveryChange}>
                        <option value="1" name="deliveryid">delivery</option>
                        {this.state.deliveries}
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="paymentid">Supplier</label>
                    <select className="form-control" name="paymentid" id="paymentid" onChange={this.handlePaymentChange}>
                        <option value="1" name="paymentid">payment</option>
                        {this.state.payments}
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="discountid">Discount</label>
                    <select className="form-control" name="discountid" id="discountid" onChange={this.handleDiscountChange}>
                        <option value="1" name="discountid">discount</option>
                        {this.state.discounts}
                    </select>
                </div>

                <button className="btn btn-sm btn-secondary" onClick={this.handleSubmit}>Create</button>
                <Link to={"/orders"}
                      className="btn btn-sm btn-secondary">Cancel</Link>
            </div>
        );
    }
}

export default OrderCreate;
