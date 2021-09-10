import React, {Component} from "react";
import {Link} from "react-router-dom";


class InventoryDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inventory: "",
            inventoryId: props.match.params.id
        }
    }

    async getInventory() {
        let url = "http://localhost:9000/api/inventory/" + this.state.inventoryId;

        return fetch(url, {
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
            this.setState({inventory: data.inventory})
        })
    }

    async getProduct() {
        let url = "http://localhost:9000/api/product/" + this.state.inventory.productid;

        return fetch(url, {
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
                this.setState({product: data.product})
            })
    }

    async getCategory() {
        let url = "http://localhost:9000/api/category/" + this.state.product.categoryid

        return fetch(url, {
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
               this.setState({category: data.category})
        })
    }

    componentDidMount() {
        this.getInventory().then(() => {
            this.getProduct().then(() => {
                this.getCategory()
            })
        })
    }

    render() {
        if (this.state.category) {
        return (
            <div className="item-container">
                <div className="container">
                    <h3>Inventory</h3>
                    <div className="col-md-7">
                        <div className="inventory-title">Product name: {this.state.product.name}</div>
                        <div className="inventory-category">Category: {this.state.category.name}</div>
                        <div className="inventory-price">Quantity: {this.state.inventory.quantity} pcs</div>
                    </div>
                    <hr></hr>
                    <div className="btn-group">
                        <Link to={"/inventory/edit/" + this.state.inventory.id}
                              className="btn btn-sm btn-secondary">Edit</Link>
                    </div>
                </div>
            </div>
            )
        } else {
            return (
                <div>Waiting for data ...</div>)
        }
    }
}

export default InventoryDetails;
