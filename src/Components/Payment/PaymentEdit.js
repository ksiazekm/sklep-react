import React, {Component} from "react";
import {Link, Redirect} from "react-router-dom";

class PaymentEdit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: props.match.params.id,
            name: "",
            paymentEdited: false
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleSubmit(event) {
        var data = {
            "id": this.state.id,
            "name": this.state.name,
        };
        var url = 'http://localhost:9000/api/payment/' + this.state.id;

        fetch(url, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        }).then(result => {
            this.setState({productEdited: true})
        });
    }

    async getPayment()
    {
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
                this.setState({
                    id : data.payment.id,
                    name : data.payment.name,
                })
        });
    }

    componentDidMount() {
        this.getPayment();
    }

    handleInputChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }
    render() {
        if (this.state.productEdited) {
            return <Redirect to={"/payments"}/>
        }
        return (
            <div>
                <label>
                    Delivery name
                </label>
                <input className="form-control" id={this.state.value} name="name" type="text" value={this.state.name}
                       onChange={this.handleInputChange}
                />

                <button className="btn btn-sm btn-secondary" onClick={this.handleSubmit}>
                    Save
                </button>

                <Link to={"/payments"} className="btn btn-sm btn-secondary">
                    Cancel
                </Link>
            </div>
        );
    }
}

export default PaymentEdit;
