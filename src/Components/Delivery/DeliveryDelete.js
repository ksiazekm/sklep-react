import React, {Component} from "react";
import {Link, Redirect} from "react-router-dom";

class CustomerDelete extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: props.match.params.id,
            delivery: [],
            deliveryDeleted: false,
            deliveryDetailsShown: false
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        var data = {
            "id": this.state.id,
        };
        var url = 'http://localhost:9000/api/delivery/' + this.state.id;

        fetch(url, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        }).then(result => {
            this.setState({deliveryDeleted: true})
        });
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
                        <div>Id: {data.delivery.id}</div>
                        <div>Name: {data.delivery.name}</div>
                        <div>Delivery Cost: {data.delivery.deliverycost.toFixed(2)}</div>
                    </div>
                    <hr></hr>

                </div>
            )
            this.setState({deliveryDetailsShown: true});
            this.setState({delivery: deliveryDetails});
        })
    }

    render() {
        if (this.state.deliveryDeleted) {
            return <Redirect to={"/deliveries/"}/>
        }
            return (
                <div className="item-container">
                    <div className="container">
                        {this.state.delivery}
                    </div>
                    <div>
                        <button className="btn btn-sm btn-secondary" onClick={this.handleSubmit}>Delete</button>
                        <Link to={"/deliveries"}
                              className="btn btn-sm btn-secondary">Cancel</Link>
                    </div>
                </div>
            )


    }
}

export default CustomerDelete;
