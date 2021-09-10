import React, {Component} from "react";
import {Link, Redirect} from "react-router-dom";

class ProductEdit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            productid: props.match.params.id,
            name: "",
            price: "",
            categoryid: "",
            supplierid: "",
            productEdited: false
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleCategoryChange = this.handleCategoryChange.bind(this);
        this.handleSupplierChange = this.handleSupplierChange.bind(this);
    }

    handleSubmit(event) {
        var data = {
            "id": this.state.productid,
            "name": this.state.productname,
            "price": parseFloat(this.state.productprice),
            "categoryid": parseInt(this.state.productcategoryid),
            "supplierid": parseInt(this.state.productsupplierid)
        };

        var url = 'http://localhost:9000/api/product/' + this.state.productid;

        fetch(url, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        }).then(result => {
            this.setState({productEdited: true})
        });
    }

    handleInputChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleCategoryChange(event) {
        this.setState({
            productcategoryid: event.target.value
        });
    }

    handleSupplierChange(event) {
        this.setState({
            productsupplierid: event.target.value
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
                this.setState({categoryname: data.category.name,
                    categoryid: data.category.id})
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
                this.setState({suppliername: data.supplier.name,
                    supplierid: data.supplier.id})
            })
    }

    componentDidMount() {
        this.getProduct().then(() => {
            this.getCategory().then(() => {
                this.getSupplier()
            })
        })

        let url = "http://localhost:9000/api/categories"

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
                let categories = data.map((cat) => {
                    let categorykey = "category" + cat.id
                    return (
                        <option value={cat.id} key={categorykey} name="category">{cat.name}</option>
                    )
                })
                this.setState({categories: categories})
            })

            url = "http://localhost:9000/api/suppliers"

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
                let suppliers = data.map((sup) => {
                    let supplierkey = "supplier" + sup.id
                    return (
                        <option value={sup.id} key={supplierkey} name="supplier">{sup.name}</option>
                    )
                })
                this.setState({suppliers: suppliers})
            })
        }

    render() {
        if (this.state.productEdited) {
            return <Redirect to={"/products/"}/>
        }
        else if (this.state.suppliername) {
        return (
            <div>
                <label>
                    Product Name
                </label>
                <input className="form-control" id={this.state.value} name="productname" type="text" value={this.state.productname}
                       onChange={this.handleInputChange}
                />
                <label>
                    Price
                </label>
                <input className="form-control" id={this.state.value} name="productprice" type="text" value={this.state.productprice}
                       onChange={this.handleInputChange}
                />

                <div className="form-group">
                    <label htmlFor="categoryid">Category</label>
                    <select className="form-control" name="productcategoryid" id="categoryid" key="3" onChange={this.handleCategoryChange}>
                        <option value={this.state.categoryid} name="productcategoryid">{this.state.categoryname}</option>
                        {this.state.categories}
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="supplierid">Supplier</label>
                    <select className="form-control" name="productsupplierid" id="supplierid" key="4" onChange={this.handleSupplierChange}>
                        <option value={this.state.supplierid} name="productsupplierid">{this.state.suppliername}</option>
                        {this.state.suppliers}
                    </select>
                </div>

                <button className="btn btn-sm btn-secondary" onClick={this.handleSubmit}>Save</button>
                <Link to={"/products"}
                      className="btn btn-sm btn-secondary">Cancel</Link>
            </div>
        );
        } else {
            return (
                <div>Waiting for data ...</div>)
        }
    }
}

export default ProductEdit;
