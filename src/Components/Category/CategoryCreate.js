import React, {Component} from "react";
import {Link, Redirect} from "react-router-dom";

class CategoryCreate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: 0,
            name: "",
            categoryCreated: false
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleSubmit(event) {
        var data = {
            "id": this.state.id,
            "name": this.state.value,
        };
        var url = 'http://localhost:9000/api/category';

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
                categoryCreated: true
            })
        });
    }

    handleInputChange(event) {

        this.setState({
            value: event.target.value,
        });

    }

    render() {
        if (this.state.categoryCreated) {
            return <Redirect to={"/categories"}/>
        }
        return (
            <div>
                <div className="form-group">
                    <label>
                        Category name
                    </label>
                    <input className="form-control" id={this.state.value} name="name" type="text" value={this.state.value}
                           onChange={this.handleInputChange}
                    />
                </div>

                <button className="btn btn-sm btn-secondary" onClick={this.handleSubmit}>Create</button>
                <Link to={"/categories"}
                          className="btn btn-sm btn-secondary">Cancel</Link>
            </div>
        );
    }
}

export default CategoryCreate;
