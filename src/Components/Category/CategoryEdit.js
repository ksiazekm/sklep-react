import React, {Component} from "react";
import {Link, Redirect} from "react-router-dom";

class CategoryEdit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: props.match.params.id,
            name: "",
            categoryEdited: false
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleSubmit(event) {
        var data = {
            "id": this.state.id,
            "name": this.state.name,
        };
        var url = 'http://localhost:9000/api/category/' + this.state.id;

        fetch(url, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        }).then(result => {
            this.setState({productEdited: true})
        });
    }

    handleInputChange(event) {

        this.setState({
            name: event.target.value
        });

    }

    async getCategory()
    {
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
                this.setState({
                    id : data.category.id,
                    name : data.category.name,
                })
        });
    }

    componentDidMount() {
        this.getCategory();
    }

    render() {
        if (this.state.productEdited) {
            return <Redirect to={"/categories"}/>
        }
        return (
            <div>
                <div className="form-group">
                    <label>
                        Category name
                    </label>
                    <input className="form-control" id={this.state.name} name="name" type="text" value={this.state.name}
                           onChange={this.handleInputChange}
                    />
                </div>
                <button className="btn btn-sm btn-secondary" onClick={this.handleSubmit}>Save</button>
                <Link to={"/categories"}
                          className="btn btn-sm btn-secondary">Cancel</Link>
            </div>
        );
    }
}

export default CategoryEdit;
