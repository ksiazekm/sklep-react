import React, {Component} from "react";
import {Link, Redirect} from "react-router-dom";

class CustomerDelete extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: props.match.params.id,
            payment: [],
            paymentDeleted: false,
            paymentDetailsShown: false
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        var data = {
            "id": this.state.id,
        };
        var url = 'http://localhost:9000/api/payment/' + this.state.id;

        fetch(url, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        }).then(result => {
            this.setState({paymentDeleted: true})
        });
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
                        <div>Id: {data.payment.id}</div>
                        <div>Name: {data.payment.name}</div>
                    </div>
                    <hr></hr>

                </div>
            )
            this.setState({paymentDetailsShown: true});
            this.setState({payment: paymentDetails});
        })
    }

    render() {
        if (this.state.paymentDeleted) {
            return <Redirect to={"/payments/"}/>
        }
            return (
                <div className="item-container">
                    <div className="container">
                        {this.state.payment}
                    </div>
                    <div>
                        <button className="btn btn-sm btn-secondary" onClick={this.handleSubmit}>Delete</button>
                        <Link to={"/categories"}
                              className="btn btn-sm btn-secondary">Cancel</Link>
                    </div>
                </div>
            )


    }
}

export default CustomerDelete;
