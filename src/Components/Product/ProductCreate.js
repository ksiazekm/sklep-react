import React, {Component} from "react";
import {Link, Redirect} from 'react-router-dom'

class ProductCreate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            price: "",
            categoryid: "",
            supplierid: "",
            createdProductId: null
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleCategoryChange = this.handleCategoryChange.bind(this);
        this.handleSupplierChange = this.handleSupplierChange.bind(this);
    }

    handleSubmit(event) {
        var data = {
            "id": 0,
            "name": this.state.name,
            "price": parseFloat(this.state.price),
            "categoryid": parseInt(this.state.categoryid),
            "supplierid": parseInt(this.state.supplierid)
        };
        var url = 'http://localhost:9000/api/product';

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
            this.setState({createdProductId: data.product.id})
        });
    }

    handleInputChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleCategoryChange(event) {
        this.setState({
            categoryid: event.target.value
        });
    }

    handleSupplierChange(event) {
        this.setState({
            supplierid: event.target.value
        });
    }

    componentDidMount() {
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
                return (
                    <option value={cat.id} name="category">{cat.name}</option>
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
                return (
                    <option value={sup.id} name="supplier">{sup.name}</option>
                )
            })
            this.setState({suppliers: suppliers})
        })
    }

    render() {
        if (this.state.createdProductId !== null) {
            return <Redirect to={"/products"}/>
        }

        return (
            <div>
                <label>
                    Product Name
                </label>
                <input className="form-control" id={this.state.value} name="name" type="text" value={this.state.name}
                       onChange={this.handleInputChange}
                />
                <label>
                    Price
                </label>
                <input className="form-control" id={this.state.value} name="price" type="text" value={this.state.price}
                       onChange={this.handleInputChange}
                />

                <div className="form-group">
                    <label htmlFor="categoryid">Category</label>
                    <select className="form-control" name="categoryid" id="categoryid" onChange={this.handleCategoryChange}>
                        <option value="1" name="categoryid">category</option>
                        {this.state.categories}
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="supplierid">Supplier</label>
                    <select className="form-control" name="supplierid" id="supplierid" onChange={this.handleSupplierChange}>
                        <option value="1" name="supplierid">supplier</option>
                        {this.state.suppliers}
                    </select>
                </div>

                <button className="btn btn-sm btn-secondary" onClick={this.handleSubmit}>Create</button>
                <Link to={"/products"}
                      className="btn btn-sm btn-secondary">Cancel</Link>
            </div>
        );
    }
}

export default ProductCreate;
