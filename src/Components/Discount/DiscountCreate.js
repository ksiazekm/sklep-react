import React, {Component} from "react";
import {Link, Redirect} from "react-router-dom";

class DiscountCreate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: 0,
            value: null,
            discountCreated: false
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleSubmit(event) {
        var data = {
            "id": this.state.id,
            "value": parseInt(this.state.value)
        };
        var url = 'http://localhost:9000/api/discount';

        fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        }).then(results => {
            return results.json();
        }).then(data => {
            this.setState({
                discountCreated: true
            })
});
    }

    handleInputChange(event) {
        this.setState({
            [event.target.name]: event.target.value

        });
    }

    render() {
        if (this.state.discountCreated) {
            return <Redirect to={"/discounts"}/>
        }
        return (
            <div>
                <label>
                    Value
                </label>
                <input className="form-control" id={this.state.value} name="value" type="text" value={this.state.value}
                       onChange={this.handleInputChange}
                />

                <button className="btn btn-sm btn-secondary" onClick={this.handleSubmit}>Create</button>
                <Link to={"/discounts"}
                      className="btn btn-sm btn-secondary">Cancel</Link>
            </div>
        );
    }
}

export default DiscountCreate;
