import React, {Component} from "react";
import {Link, Redirect} from "react-router-dom";

class CustomerCreate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: 0,
            firstname: "",
            lastname: "",
            address: "",
            customerCreated: false
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleSubmit(event) {
        var data = {
            "id": this.state.id,
            "firstname": this.state.firstname,
            "lastname": this.state.lastname,
            "address": this.state.address,
        };
        var url = 'http://localhost:9000/api/customer';

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
            this.setState({
                customerCreated: true,
                id: data.customer.id
            })
        });
    }

    handleInputChange(event) {
        this.setState({
            [event.target.name]: event.target.value

        });
    }

    render() {
        if (this.state.customerCreated) {
            return <Redirect to={"/customers"}/>
        }
        return (
            <div>
                <label>
                    Firstname
                </label>
                <input className="form-control" id={this.state.value} name="firstname" type="text" value={this.state.firstname}
                       onChange={this.handleInputChange}
                />

                <label>
                    Lastname
                </label>
                <input className="form-control" id={this.state.value} name="lastname" type="text" value={this.state.lastname}
                       onChange={this.handleInputChange}
                />

                <label>
                    Address
                </label>
                <input className="form-control" id={this.state.value} name="address" type="text" value={this.state.address}
                       onChange={this.handleInputChange}
                />

                <button className="btn btn-sm btn-secondary" onClick={this.handleSubmit}>Create</button>
                <Link to={"/customers"}
                      className="btn btn-sm btn-secondary">Cancel</Link>
            </div>
        );
    }
}

export default CustomerCreate;
