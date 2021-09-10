import React, {Component} from "react";
import {Link, Redirect} from "react-router-dom";

class PaymentAdd extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: 0,
            value: "",
            paymentCreated: false
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleSubmit(event) {

        var data = {
            "id": this.state.id,
            "name": this.state.value,
        };

        if (data.name === "") {
            alert("Name can't be empty!")
            return
        }

        var url = 'http://localhost:9000/api/payment';

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
            console.log(data)
            this.setState({
                paymentCreated: true
            })
        });
    }

    handleInputChange(event) {

        this.setState({
            value: event.target.value,
        });

    }

    render() {
        if (this.state.paymentCreated) {
            return <Redirect to={"/payments"}/>
        }
        return (
            <div>
                <div className="form-group">
                    <label>
                        Payment name
                    </label>
                    <input className="form-control" id={this.state.value} name="name" type="text" value={this.state.value}
                           onChange={this.handleInputChange}
                    />
                </div>

                <button className="btn btn-sm btn-secondary" onClick={this.handleSubmit}>
                    Create
                </button>

                <Link to={"/payments"} className="btn btn-sm btn-secondary">
                    Cancel
                </Link>
            </div>
        );
    }
}

export default PaymentAdd;
