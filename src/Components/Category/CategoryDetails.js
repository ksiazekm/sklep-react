import React, {Component} from "react";
import {Link} from "react-router-dom";

class CategoryDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            category: [],
            id: props.match.params.id,
        }
    }

    componentDidMount() {
        let url = "http://localhost:9000/api/category/" + this.state.id;

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
            let categoryDetails = (
                <div>
                    <div className="col-md-7">
                        <div>Name: {data.category.name}</div>
                    </div>
                    <hr></hr>
                    <div className="btn-group wishlist">
                        <Link to={"/category/edit/" + this.state.id}
                              className="btn btn-sm btn-secondary">Edit</Link>
                        <Link to={"/category/delete/" + this.state.id}
                              className="btn btn-sm btn-secondary">Delete</Link>
                    </div>
                </div>
            )
            this.setState({category: categoryDetails})
        })
    }

    render() {
        return (
            <div className="item-container">
                <div className="container">
                    <h3>Category</h3>
                    {this.state.category}
                </div>
            </div>

        )
    }
}

export default CategoryDetails;
