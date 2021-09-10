import React, {Component} from "react";
import {Link} from "react-router-dom";

class DeliveryList extends Component {

    constructor() {
        super();
        this.state = {
            deliveries: [],
        }
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
            let deliveries = data.map((delivery) => {
                return (
                    <li key={delivery.id}>
                        <Link to={"/delivery/" + delivery.id}>{delivery.name}</Link>
                    </li>
                )
            })
            this.setState({deliveries: deliveries})
        })
    }

    render() {
        return (
            <div className="container">
                <div className="deliveries">
                    <h3>Deliveries</h3>
                    <ul>
                        {this.state.deliveries}
                    </ul>
                </div>
                <Link to="/delivery/add" className="btn btn-md btn-secondary">Create new</Link>
            </div>
        )
    }
}

export default DeliveryList;
