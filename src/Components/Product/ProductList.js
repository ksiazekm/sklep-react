import React, {Component} from "react";
import {Link} from "react-router-dom";

class ProductList extends Component {

    constructor() {
        super();
        this.state = {
            products: [],
            productswithcategory: []
        }
    }

    componentDidMount() {
        let url = "http://localhost:9000/api/products"

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
            data.forEach((prod) => {
                let url = "http://localhost:9000/api/category/" + prod.categoryid
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
                            let withcategory = (
                                <li key={prod.id}>
                                    <Link to={"/product/" + prod.id}>{prod.name} {prod.categoryid} - {data.category.name}</Link>
                                </li>
                            )
                        this.setState({productswithcategory: this.state.productswithcategory.concat(withcategory)})
                    })
            })
            })
    }


    render() {
        return (
            <div className="container">
                <div className="categories">
                    <h3>Products</h3>
                    <ul>
                        {this.state.productswithcategory}
                    </ul>
                </div>
                <Link to="/product/add" className="btn btn-md btn-secondary">Create new</Link>
            </div>
        )
    }
}

export default ProductList;
