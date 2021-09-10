import React, {Component} from "react";
import {Link, Redirect} from "react-router-dom";

class DeliveryCreate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: 0,
            name: null,
            address: null,
            deliveryCreated: false
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleSubmit(event) {
        var data = {
            "id": this.state.id,
            "name": this.state.name,
            "deliverycost": parseFloat(this.state.deliverycost)
        };
        var url = 'http://localhost:9000/api/delivery';

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
                deliveryCreated: true
            })
        });
    }

    handleInputChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    render() {
        if (this.state.deliveryCreated) {
            return <Redirect to={"/deliveries"}/>
        }
        return (
            <div>
                <label>
                    Delivery name
                </label>
                <input className="form-control" id={this.state.value} name="name" type="text" value={this.state.name}
                       onChange={this.handleInputChange}
                />

                <label>
                    Delivery cost
                </label>
                <input className="form-control" id={this.state.value} name="deliverycost" type="text" value={this.state.deliverycost}
                       onChange={this.handleInputChange}
                />

                <button className="btn btn-sm btn-secondary" onClick={this.handleSubmit}>Create</button>
                <Link to={"/deliveries"}
                          className="btn btn-sm btn-secondary">Cancel</Link>
            </div>
        );
    }
}

export default DeliveryCreate;
