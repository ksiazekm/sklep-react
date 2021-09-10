import React, {Component} from "react";
import {Link} from "react-router-dom";

class DiscountDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            discount: [],
            id: props.match.params.id,
        }
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
                        <div>Value: {data.discount.value}%</div>
                    </div>
                    <hr></hr>
                    <div className="btn-group">
                        <Link to={"/discount/edit/" + this.state.id}
                              className="btn btn-sm btn-secondary">Edit</Link>
                        <Link to={"/discount/delete/" + this.state.id}
                              className="btn btn-sm btn-secondary">Delete</Link>
                    </div>
                </div>
            )
            this.setState({discount: discountDetails})
        })
    }

    render() {
        return (
            <div className="item-container">
                <div className="container">
                    <h3>Discount</h3>
                    {this.state.discount}
                </div>
            </div>

        )
    }
}

export default DiscountDetails;
