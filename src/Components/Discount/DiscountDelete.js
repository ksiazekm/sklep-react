import React, {Component} from "react";
import {Link, Redirect} from "react-router-dom";

class DiscountDelete extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: props.match.params.id,
            discount: [],
            discountDeleted: false,
            discountDetailsShown: false
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        var data = {
            "id": this.state.id,
        };
        var url = 'http://localhost:9000/api/discount/' + this.state.id;

        fetch(url, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        }).then(result => {
            this.setState({discountDeleted: true})
        });
    }

    componentDidMount() {
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
            let discountDetails = (
                <div>
                    <div className="col-md-7">
                        <div>Id: {data.discount.id}</div>
                        <div>Name: {data.discount.firstname}</div>
                        <div>Lastname: {data.discount.lastname}</div>
                        <div>Address: {data.discount.address}</div>
                    </div>
                    <hr></hr>

                </div>
            )
            this.setState({discountDetailsShown: 1});
            this.setState({discount: discountDetails});
        })
    }

    render() {
        if (this.state.discountDeleted) {
            return <Redirect to={"/discounts"}/>
        }
            return (
                <div className="item-container">
                    <div className="container">
                        {this.state.discount}
                    </div>
                    <div>
                        <button className="btn btn-sm btn-secondary" onClick={this.handleSubmit}>Delete</button>
                        <Link to={"/discounts"}
                              className="btn btn-sm btn-secondary">Cancel</Link>
                    </div>
                </div>
            )


    }
}

export default DiscountDelete;
