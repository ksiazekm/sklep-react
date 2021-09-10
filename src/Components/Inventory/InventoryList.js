import React, {Component} from "react";
import {Link} from "react-router-dom";

class InventoryList extends Component {

    constructor() {
        super();
        this.state = {
            inventories: []
        }
    }

    componentDidMount() {
        let url = "http://localhost:9000/api/inventories"

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
            data.forEach((inv) => {
                let url = "http://localhost:9000/api/product/" + inv.productid
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
                            let withproduct = (
                                <li key={inv.id}>
                                    <Link to={"/inventory/" + inv.id}>{data.product.name} - {inv.quantity} pcs</Link>
                                </li>
                            )
                    this.setState({inventories: this.state.inventories.concat(withproduct)})
                    })
            })
            })
    }


    render() {
        return (
            <div className="container">
                <div className="inventories">
                    <h3>Inventories</h3>
                    <ul>
                        {this.state.inventories}
                    </ul>
                </div>
                <Link to="/inventory/add" className="btn btn-md btn-secondary">Create new</Link>
            </div>
        )
    }
}

export default InventoryList;
