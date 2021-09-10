import React, {Component} from "react";
import {Link, Redirect} from "react-router-dom";

class CustomerDelete extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: props.match.params.id,
            category: [],
            categoryDeleted: false,
            categoryDetailsShown: false
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        var data = {
            "id": this.state.id,
        };
        var url = 'http://localhost:9000/api/category/' + this.state.id;

        fetch(url, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        }).then(result => {
            this.setState({categoryDeleted: true})
        });
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
                        <div>Id: {data.category.id}</div>
                        <div>Name: {data.category.name}</div>
                    </div>
                    <hr></hr>

                </div>
            )
            this.setState({categoryDetailsShown: true});
            this.setState({category: categoryDetails});
        })
    }

    render() {
        if (this.state.categoryDeleted) {
            return <Redirect to={"/categories/"}/>
        }
            return (
                <div className="item-container">
                    <div className="container">
                        {this.state.category}
                    </div>
                    <div>
                        <button className="btn btn-sm btn-secondary" onClick={this.handleSubmit}>Delete</button>
                        <Link to={"/categories"}
                              className="btn btn-sm btn-secondary">Cancel</Link>
                    </div>
                </div>
            )


    }
}

export default CustomerDelete;
