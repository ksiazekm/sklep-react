import React, {Component} from "react";
import {Link} from "react-router-dom";

class DeliveryDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            delivery: [],
            id: props.match.params.id,
        }
    }

    componentDidMount() {
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
            let deliveryDetails = (
                <div>
                    <div className="col-md-7">
                        <div>Name: {data.delivery.name}</div>
                        <div>Cost: { data.delivery.deliverycost.toFixed(2)}</div>
                    </div>
                    <hr></hr>
                    <div className="btn-group wishlist">
                        <Link to={"/delivery/edit/" + this.state.id}
                              className="btn btn-sm btn-secondary">Edit</Link>
                        <Link to={"/delivery/delete/" + this.state.id}
                              className="btn btn-sm btn-secondary">Delete</Link>
                    </div>
                </div>
            )
            this.setState({delivery: deliveryDetails})
        })
    }

    render() {
        return (
            <div className="item-container">
                <div className="container">
                    <h3>Delivery</h3>
                    {this.state.delivery}
                </div>
            </div>

        )
    }
}

export default DeliveryDetails;
