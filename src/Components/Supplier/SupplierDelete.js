import React, {Component} from "react";
import {Link, Redirect} from "react-router-dom";

class CustomerDelete extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: props.match.params.id,
            supplier: [],
            supplierDeleted: false,
            supplierDetailsShown: false
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        var data = {
            "id": this.state.id,
        };
        var url = 'http://localhost:9000/api/supplier/' + this.state.id;

        fetch(url, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        }).then(result => {
            this.setState({supplierDeleted: true})
        });
    }

    componentDidMount() {
        let url = "http://localhost:9000/api/supplier/" + this.state.id;

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
            let supplierDetails = (
                <div>
                    <div className="col-md-7">
                        <div>Id: {data.supplier.id}</div>
                        <div>Name: {data.supplier.name}</div>
                        <div>Address: {data.supplier.address}</div>
                    </div>
                    <hr></hr>

                </div>
            )
            this.setState({supplierDetailsShown: true});
            this.setState({supplier: supplierDetails});
        })
    }

    render() {
        if (this.state.supplierDeleted) {
            return <Redirect to={"/suppliers/"}/>
        }
            return (
                <div className="item-container">
                    <div className="container">
                        {this.state.supplier}
                    </div>
                    <div>
                        <button className="btn btn-sm btn-secondary" onClick={this.handleSubmit}>Delete</button>
                        <Link to={"/suppliers"}
                              className="btn btn-sm btn-secondary">Cancel</Link>
                    </div>
                </div>
            )


    }
}

export default CustomerDelete;
