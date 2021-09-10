import React, {Component} from "react";
import {Link} from "react-router-dom";

class PaymentList extends Component {

    constructor() {
        super();
        this.state = {
            categories: [],
        }
    }

    componentDidMount() {
        let url = "http://localhost:9000/api/payments"

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
            let categories = data.map((cat) => {
                return (
                    <li key={cat.id}>
                        <Link to={"/payment/" + cat.id}>{cat.name}</Link>
                    </li>
                )
            })
            this.setState({categories: categories})
        })
    }

    render() {
        return (
            <div className="container">
                <div className="payments">
                    <h3>Payments</h3>
                    <ul>
                        {this.state.categories}
                    </ul>
                </div>
                <Link to="/payment/add" className="btn btn-md btn-secondary">Create new</Link>
            </div>
        )
    }
}

export default PaymentList;
