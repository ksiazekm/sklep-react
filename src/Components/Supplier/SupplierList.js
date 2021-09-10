import React, {Component} from "react";
import {Link} from "react-router-dom";

class SupplierList extends Component {

    constructor() {
        super();
        this.state = {
            suppliers: [],
        }
    }

    componentDidMount() {
        let url = "http://localhost:9000/api/suppliers"

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
            let suppliers = data.map((supplier) => {
                return (
                    <li key={supplier.id}>
                        <Link to={"/supplier/" + supplier.id}>{supplier.name}</Link>
                    </li>
                )
            })
            this.setState({suppliers: suppliers})
        })
    }

    render() {
        return (
            <div className="container">
                <div className="suppliers">
                    <h3>Suppliers</h3>
                    <ul>
                        {this.state.suppliers}
                    </ul>
                </div>
                <Link to="/supplier/add" className="btn btn-md btn-secondary">Create new</Link>
            </div>
        )
    }
}

export default SupplierList;
