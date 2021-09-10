import React, {Component} from "react";
import {Link, Redirect} from "react-router-dom";

class InventoryCreate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: 0,
            productId: 0,
            inventoryquantity: 0,
            inventoryCreated: false
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleProductChange = this.handleProductChange.bind(this);
    }

    handleSubmit(event) {
        var data = {
            "id": 0,
            "productid": parseInt(this.state.productid),
            "quantity": parseInt(this.state.inventoryquantity)
        };
        var url = 'http://localhost:9000/api/inventory';

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
                inventoryCreated: true,
                id: data.inventory.id
            })
        });
    }

    handleInputChange(event) {
        this.setState({
            [event.target.name]: event.target.value

        });
    }

    handleProductChange(event) {
        this.setState({
            productid: event.target.value
        });
    }

    componentDidMount() {
        let url = "http://localhost:9000/api/productsbyinventories"

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
            let products = data.map((prod) => {
                return (
                    <option value={prod.id} name="product">{prod.name}</option>
                )
            })
            this.setState({products: products})
        })
    }

    render() {
        if (this.state.inventoryCreated) {
            return <Redirect to={"/inventories/"}/>
        }
        return (
            <div>
                <div className="form-group">
                    <label htmlFor="productid">Category</label>
                    <select className="form-control" name="productid" id="productid" onChange={this.handleProductChange}>
                        <option value="1" name="productid">product</option>
                        {this.state.products}
                    </select>
                </div>
                <label>
                    Quantity
                </label>
                <input className="form-control" id={this.state.value} name="inventoryquantity" type="text" value={this.state.inventoryquantity}
                       onChange={this.handleInputChange}
                />

                <button className="btn btn-sm btn-secondary" onClick={this.handleSubmit}>Create</button>
                <Link to={"/inventories"}
                      className="btn btn-sm btn-secondary">Cancel</Link>
            </div>
        );
    }
}

export default InventoryCreate;
