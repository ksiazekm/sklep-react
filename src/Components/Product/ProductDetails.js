import React, {Component} from "react";
import {Link} from "react-router-dom";



class ProductDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            product: "",
            productId: props.match.params.id,
            supplierDetails: null
        }
    }

    async getProduct() {
        let url = "http://localhost:9000/api/product/" + this.state.productId;

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

    async getSupplier() {
        let url = "http://localhost:9000/api/supplier/" + this.state.product.supplierid;

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
                this.setState({supplier: data.supplier})
        })
    }

    componentDidMount() {
        this.getProduct().then(() => {
            this.getCategory().then(() => {
                this.getSupplier()
            })
        })
    }

    render() {
        if (this.state.supplier) {
        return (
            <div className="item-container">
                <div className="container">
                    <h3>Product</h3>
                    <div className="col-md-7">
                        <div className="product-title">Name: {this.state.product.name}</div>
                        <div className="product-price">Price:
                            ${parseFloat(this.state.product.price.toFixed(2))}</div>
                        <div className="product-category">Category: {this.state.category.name}</div>
                        <div className="product-supplier">Supplier: {this.state.supplier.name}</div>
                    </div>
                    <hr></hr>
                    <div className="btn-group">
                        <Link to={"/product/edit/" + this.state.product.id}
                              className="btn btn-sm btn-secondary">Edit</Link>
                        <Link to={"/product/delete/" + this.state.product.id}
                              className="btn btn-sm btn-secondary">Delete</Link>
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

export default ProductDetails;
