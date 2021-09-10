import React, {Component} from "react";
import {Link, Redirect} from "react-router-dom";

class ProductDelete extends Component {
    constructor(props) {
        super(props);
        this.state = {
            productid: props.match.params.id,
            productDeleted: false,
            productDetailsShown: false
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        var data = {
            "id": this.state.id,
        };
        var url = 'http://localhost:9000/api/product/' + this.state.productid;

        fetch(url, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        }).then(result => {
            this.setState({productDeleted: true})
        });
    }

    async getProduct() {
        let url = "http://localhost:9000/api/product/" + this.state.productid;

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
                    productid: data.product.id,
                    productname: data.product.name,
                    productprice: data.product.price,
                    productcategoryid: data.product.categoryid,
                    productsupplierid: data.product.supplierid
                })
            })
    }

    async getCategory() {
        let url = "http://localhost:9000/api/category/" + this.state.productcategoryid

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
                    categoryname: data.category.name,
                    categoryid: data.category.id
                })
            })
    }

    async getSupplier() {
        let url = "http://localhost:9000/api/supplier/" + this.state.productsupplierid;

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
                    suppliername: data.supplier.name,
                    supplierid: data.supplier.id
                })
            })
    }

    componentDidMount() {
        this.getProduct().then(() => {
            this.getCategory().then(() => {
                this.getSupplier().then(() => {

            let products = (
                <div className="col-md-7">
                    <div className="product-title">Name: {this.state.productname}</div>
                    <div className="product-price">Price:
                        ${parseFloat(this.state.productprice.toFixed(2))}</div>
                    <div className="product-category">Category: {this.state.categoryname}</div>
                    <div className="product-supplier">Supplier: {this.state.suppliername}</div>
                </div>
            )
            this.setState({products: products})
            })
        })
        })
    }

    render() {
        if (this.state.productDeleted) {
            return <Redirect to={"/products/"}/>
        }
        if (this.state.products) {
            return (
                <div className="item-container">
                    <div className="container">
                        <h3>Product to remove</h3>
                        {this.state.products}
                    </div>
                    <div>
                        <button className="btn btn-sm btn-secondary" onClick={this.handleSubmit}>Delete</button>
                        <Link to={"/products"}
                              className="btn btn-sm btn-secondary">Cancel</Link>
                    </div>
                </div>
            )
        } else {
            return (
                <div>Waiting for data ...</div>)
        }
    }
}

export default ProductDelete;
