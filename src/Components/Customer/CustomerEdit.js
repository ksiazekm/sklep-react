import React, {Component} from "react";
import {Link, Redirect} from "react-router-dom";

class CustomerEdit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: props.match.params.id,
            firstname: "",
            lastname: "",
            address: "",
            customerEdited: false
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
        var url = 'http://localhost:9000/api/customer/' + this.state.id;

        fetch(url, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        }).then(result => {
            this.setState({customerEdited: true})
        });
    }

    handleInputChange(event) {
        this.setState({
            [event.target.name]: event.target.value

        });
    }

    async getcustomer() {
        let url = "http://localhost:9000/api/customer/" + this.state.id;
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
                id: data.customer.id,
                firstname: data.customer.firstname,
                lastname: data.customer.lastname,
                address: data.customer.address,
            })
        });
    }

    componentDidMount() {
        this.getcustomer();
    }

    render() {
        if (this.state.customerEdited) {
            return <Redirect to={"/customer/" + this.state.id}/>
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
                <button className="btn btn-sm btn-secondary" onClick={this.handleSubmit}>Edit</button>
                <Link to={"/customers"}
                      className="btn btn-sm btn-secondary">Cancel</Link>
            </div>
        );
    }
}

export default CustomerEdit;
