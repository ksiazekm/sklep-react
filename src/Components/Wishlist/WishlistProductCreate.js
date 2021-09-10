import React, {Component} from "react";
import {Link, Redirect} from 'react-router-dom'

class WishlistProductCreate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            customerid: props.match.params.customerid,
            productid: "",
            createdWishlistProduct: null
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleProductChange = this.handleProductChange.bind(this);
    }

    handleSubmit(event) {
        var data = {
            "id": 0,
            "customerid": parseInt(this.state.customerid),
            "productid": parseInt(this.state.productid)
        };
        var url = 'http://localhost:9000/api/wishlist';

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
            this.setState({createdWishlistProduct: true})
        });
    }

    handleInputChange(name, value) {
        this.setState({
            [name]: value
        });
    }

    handleProductChange(event) {
        this.setState({
            productid: event.target.value
        });
    }

    componentDidMount() {
        let url = "http://localhost:9000/api/productbywishlistcustomer/" + this.state.customerid

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
                    <option key='Product_{prod.id}' value={prod.id} name="product">{prod.name}</option>
                )
            })
            this.setState({products: products})
        })
    }

    render() {
        if (this.state.createdWishlistProduct !== null) {
            return <Redirect to={"/wishlist/customer/" + this.state.customerid}/>
        }

        return (
            <div>
                <div className="form-group">
                    <label htmlFor="productid">Product</label>
                    <select className="form-control" name="productid" id="productid" onChange={this.handleProductChange}>
                        <option value="1" name="productid">choose product</option>
                        {this.state.products}
                    </select>
                </div>

                <button className="btn btn-sm btn-secondary" onClick={this.handleSubmit}>
                    Add
                </button>

                <Link to={"/wishlist/customer/" + this.state.customerid} className="btn btn-sm btn-secondary">
                    Cancel
                </Link>

            </div>
        );
    }
}

export default WishlistProductCreate;
