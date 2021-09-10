import React, {Component} from "react";
import {Link} from "react-router-dom";

class OrderList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            customerId: props.match.params.customerid,
            orders: null
        }
    }

    componentDidMount() {
        let url = "http://localhost:9000/api/orders/customer/" + this.state.customerId

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
            let orders = data.map((order) =>
                <li key={order.id}>
                    <Link to={"/order/" + order.id}>Order {order.id}</Link>
                </li>
            )
            this.setState({orders: orders})
        })
    }

    render() {
        return (
            <div>
            <div>
                <h3>Your orders</h3>
                <ul>
                    {this.state.orders}
                </ul>
            </div>
        <Link to="/order/add" className="btn btn-md btn-secondary">Create new</Link>
            </div>
        );
    }
}

export default OrderList;
