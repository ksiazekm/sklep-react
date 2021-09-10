import React, {Component} from "react";
import {Link, Redirect} from "react-router-dom";

class CustomerDelete extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: props.match.params.id,
            customer: [],
            customerDeleted: false,
            customerDetailsShown: false
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        var data = {
            "id": this.state.id,
        };
        var url = 'http://localhost:9000/api/customer/' + this.state.id;

        fetch(url, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        }).then(result => {
            this.setState({customerDeleted: true})
        });
    }

    componentDidMount() {
        let url = "http://localhost:9000/api/customer/" + this.state.id;

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
            let customerDetails = (
                <div>
                    <div className="col-md-7">
                        <div>Id: {data.customer.id}</div>
                        <div>Name: {data.customer.firstname}</div>
                        <div>Lastname: {data.customer.lastname}</div>
                        <div>Address: {data.customer.address}</div>
                    </div>
                    <hr></hr>

                </div>
            )
            this.setState({customerDetailsShown: 1});
            this.setState({customer: customerDetails});
        })
    }

    render() {
        if (this.state.customerDeleted) {
            return <Redirect to={"/customers/"}/>
        }
            return (
                <div className="item-container">
                    <div className="container">
                        {this.state.customer}
                    </div>
                    <div>
                        <button className="btn btn-sm btn-secondary" onClick={this.handleSubmit}>Delete</button>
                        <Link to={"/customers"}
                              className="btn btn-sm btn-secondary">Cancel</Link>
                    </div>
                </div>
            )


    }
}

export default CustomerDelete;
