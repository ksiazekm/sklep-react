import React, {Component} from "react";
import {Link, Redirect} from "react-router-dom";

class SupplierEdit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: props.match.params.id,
            name: null,
            address: null,
            supplierEdited: false
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
        var url = 'http://localhost:9000/api/supplier/' + this.state.id;

        fetch(url, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        }).then(result => {
            this.setState({supplierEdited: true})
        });
    }

    async getSupplier()
    {
        let url = "http://localhost:9000/api/supplier/" + this.state.id;
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
                    id : data.supplier.id,
                    name : data.supplier.name,
                    address: data.supplier.address
                })
        });
    }

    componentDidMount() {
        this.getSupplier();
    }

    handleInputChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    render() {
        if (this.state.supplierEdited) {
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
                    Save
                </button>

                <Link to={"/suppliers"} className="btn btn-sm btn-secondary">
                    Cancel
                </Link>
            </div>
        );
    }
}

export default SupplierEdit;
