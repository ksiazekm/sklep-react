import React, {Component} from "react";
import {Link} from "react-router-dom";

class PaymentDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            payment: [],
            id: props.match.params.id,
        }
    }

    componentDidMount() {
        let url = "http://localhost:9000/api/payment/" + this.state.id;

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
            let paymentDetails = (
                <div>
                    <div className="col-md-7">
                        <div>Name: {data.payment.name}</div>
                    </div>
                    <hr></hr>
                    <div className="btn-group wishlist">
                        <Link to={"/payment/edit/" + this.state.id}
                              className="btn btn-sm btn-secondary">Edit</Link>
                        <Link to={"/payment/delete/" + this.state.id}
                              className="btn btn-sm btn-secondary">Delete</Link>
                    </div>
                </div>
            )
            this.setState({payment: paymentDetails})
        })
    }

    render() {
        return (
            <div className="item-container">
                <div className="container">
                    <h3>Payment</h3>
                    {this.state.payment}
                </div>
            </div>

        )
    }
}

export default PaymentDetails;
