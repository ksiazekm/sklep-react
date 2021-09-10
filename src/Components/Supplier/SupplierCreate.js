import React, {Component} from "react";
import {Link, Redirect} from "react-router-dom";

class SupplierCreate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: 0,
            name: null,
            address: null,
            supplierCreated: false
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleSubmit(event) {
        var data = {
            "id": this.state.id,
            "name": this.state.name,
            "address": this.state.address
        };
        var url = 'http://localhost:9000/api/supplier';

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
                supplierCreated: true
            })
        });
    }

    handleInputChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    render() {
        if (this.state.supplierCreated) {
            return <Redirect to={"/suppliers"}/>
        }
        return (
            <div>
                <label>
                    Supplier name
                </label>
                <input className="form-control" id={this.state.value} name="name" type="text" value={this.state.name}
                       onChange={this.handleInputChange}
                />
                <label>
                    Supplier address
                </label>
                <input className="form-control" id={this.state.value} name="address" type="text" value={this.state.address}
                       onChange={this.handleInputChange}
                />

                <button className="btn btn-sm btn-secondary" onClick={this.handleSubmit}>
                    Create
                </button>
                <Link to={"/suppliers"} className="btn btn-sm btn-secondary">
                    Cancel
                </Link>
            </div>
        );
    }
}

export default SupplierCreate;
