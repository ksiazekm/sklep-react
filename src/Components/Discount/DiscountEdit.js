import React, {Component} from "react";
import {Link, Redirect} from "react-router-dom";

class DiscountEdit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: props.match.params.id,
            code: "",
            value: "",
            discountEdited: false
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleSubmit(event) {
        var data = {
            "id": this.state.id,
            "value": parseInt(this.state.value)
        };
        var url = 'http://localhost:9000/api/discount/' + this.state.id;

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

    async getdiscount() {
        let url = "http://localhost:9000/api/discount/" + this.state.id;
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
                id: data.discount.id,
                value: data.discount.value
            })
        });
    }

    componentDidMount() {
        this.getdiscount();
    }

    handleInputChange(event) {
        this.setState({
            [event.target.name]: event.target.value

        });
    }

    render() {
        if (this.state.productEdited) {
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

                <button className="btn btn-sm btn-secondary" onClick={this.handleSubmit}>Save</button>
                <Link to={"/discounts"}
                      className="btn btn-sm btn-secondary">Cancel</Link>
            </div>
        );
    }
}

export default DiscountEdit;
