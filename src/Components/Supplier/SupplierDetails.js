import React, {Component} from "react";
import {Link} from "react-router-dom";

class SupplierDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            supplier: [],
            id: props.match.params.id,
        }
    }

    componentDidMount() {
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
            let supplierDetails = (
                <div>
                    <div className="col-md-7">
                        <div>Name: {data.supplier.name}</div>
                        <div>Address: {data.supplier.address}</div>
                    </div>
                    <hr></hr>
                    <div className="btn-group wishlist">
                        <Link to={"/supplier/edit/" + this.state.id}
                              className="btn btn-sm btn-secondary">Edit</Link>
                        <Link to={"/supplier/delete/" + this.state.id}
                              className="btn btn-sm btn-secondary">Delete</Link>
                    </div>
                </div>
            )
            this.setState({supplier: supplierDetails})
        })
    }

    render() {
        return (
            <div className="item-container">
                <div className="container">
                    <h3>Supplier</h3>
                    {this.state.supplier}
                </div>
            </div>

        )
    }
}

export default SupplierDetails;
