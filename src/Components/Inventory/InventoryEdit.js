import React, {Component} from "react";
import {Link, Redirect} from "react-router-dom";

class InventoryEdit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: 0,
            inventoryId: props.match.params.id,
            quantity: 0,
            inventoryUpdated: false
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    async getProduct() {
        let url = "http://localhost:9000/api/product/" + this.state.inventoryproductid;

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
            this.setState({
                inventoryproductid: data.inventory.productid,
                inventoryquantity: data.inventory.quantity
            })
        });
    }

    handleSubmit(event) {
        var data = {
            "id": this.state.id,
            "productid": parseInt(this.state.inventoryproductid),
            "quantity": parseInt(this.state.inventoryquantity),
        };
        var url = 'http://localhost:9000/api/inventory/' + this.state.inventoryId;

        fetch(url, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        }).then(results => {
            return results.json();
        }).then(data => {
            this.setState({
                inventoryUpdated: true,
                id: data.inventory.id
            })
        });
    }

    handleInputChange(event) {
        this.setState({
            [event.target.name]: event.target.value

        });
    }

    render() {
        if (this.state.inventoryUpdated) {
            return <Redirect to={"/inventories/"}/>
        }
        if (this.state.category) {
            return (
                <div className="item-container">
                    <div className="container">
                        <h3>Inventory</h3>
                        <div className="col-md-7">
                            <div className="inventory-title">Product name: {this.state.product.name}</div>
                            <div className="inventory-category">Category: {this.state.category.name}</div>
                            <label>
                                Quantity
                            </label>
                            <input className="form-control" id={this.state.value} name="inventoryquantity" type="text" value={this.state.inventoryquantity}
                                   onChange={this.handleInputChange}
                            />
                        </div>
                    </div>
                    <div>
                        <button className="btn btn-sm btn-secondary" onClick={this.handleSubmit}>
                            Save
                        </button>

                        <Link to={"/inventories"}
                              className="btn btn-sm btn-secondary">
                            Cancel
                        </Link>
                    </div>
                </div>
            )
        } else {
            return (
                <div>Waiting for data ...</div>)
        }

    }
}

export default InventoryEdit;
