import React, {Component} from "react";
import {Link, Redirect} from "react-router-dom";

class DeliveryEdit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: props.match.params.id,
            name: null,
            deliverycost: null,
            deliveryEdited: false
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
        var url = 'http://localhost:9000/api/delivery/' + this.state.id;

        fetch(url, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        }).then(result => {
            this.setState({deliveryEdited: true})
        });
    }

    async getDelivery()
    {
        let url = "http://localhost:9000/api/delivery/" + this.state.id;
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
                    id : data.delivery.id,
                    name : data.delivery.name,
                    deliverycost: data.delivery.deliverycost
                })
        });
    }

    componentDidMount() {
        this.getDelivery();
    }

    handleInputChange(event) {
        this.setState({
            [event.target.name]: event.target.value

        });
    }

    render() {
        if (this.state.deliveryEdited) {
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
                <button className="btn btn-sm btn-secondary" onClick={this.handleSubmit}>Save</button>

                <Link to={"/deliveries"}
                          className="btn btn-sm btn-secondary">
                    Cancel
                </Link>
            </div>
        );
    }
}

export default DeliveryEdit;
