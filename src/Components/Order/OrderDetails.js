import React, {Component} from "react";
import {Link} from "react-router-dom";

class OrderDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            orderid: props.match.params.id,
            orderdetails: [],
            grandtotal: 0,
            grandtotaldiscount: "",
            orderConfirmed: false,
            loaded: 0
        }
        this.handleConfirm = this.handleConfirm.bind(this);
        this.handleRemove = this.handleRemove.bind(this);
        this.baseState = this.state;
    }

    getOrder() {
        let url = "http://localhost:9000/api/order/" + this.state.orderid

        return fetch(url, {
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
                        discountid: data.order.discountid,
                        deliveryid: data.order.deliveryid,
                        paymentid: data.order.paymentid,
                        customerid: data.order.customerid,
                        status: data.order.status
                    })
                }
            )
    }

    getDelivery() {
        let url = "http://localhost:9000/api/delivery/" + this.state.deliveryid

        return fetch(url, {
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
                        delivery: data.delivery.name
                        })
                }
            )
    }

    getPayment() {
        let url = "http://localhost:9000/api/payment/" + this.state.paymentid

        return fetch(url, {
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
                        payment: data.payment.name
                    })
                }
            )
    }

    getDiscount() {
        let url = "http://localhost:9000/api/discount/" + this.state.discountid

        return fetch(url, {
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
                        discountvalue: data.discount.value
                    })
                }
            )
    }

    getProductDetails(productid) {
        let url = "http://localhost:9000/api/product/" + productid

        return fetch(url, {
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
                    productname: data.product.name,
                    productprice: data.product.price})
        }
        )
    }

    getOrderDetails() {
        let url = "http://localhost:9000/api/orderdetail/order/" + this.state.orderid

        return fetch(url, {
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
            }).then(data =>{
              data.forEach((orderdetail) => {
                this.getProductDetails(orderdetail.productid).then(() => {

                    let allowmodification = null

                    let orderdetails = []

                    if(!this.state.status) {
                        allowmodification = (
                            <React.Fragment>
                            <td key='incr_{orderdetail.id}'>
                                <button className="btn btn-sm btn-secondary" onClick={() => this.handleIncrease(orderdetail.id,orderdetail.productid,orderdetail.quantity)}>+</button>
                            </td>
                            <td key='dec_{orderdetail.id}'>
                                <button className="btn btn-sm btn-secondary" onClick={() => this.handleDecrease(orderdetail.id,orderdetail.productid,orderdetail.quantity)}>-</button>
                            </td>
                            <td key='remove_{orderdetail.id}'>
                                <button className="btn btn-sm btn-secondary" onClick={() => this.handleRemove(orderdetail.id)}>Remove item</button>
                            </td>
                            </React.Fragment>
                    )

                    }

                    orderdetails = (
                    <tr key={orderdetail.id}>
                        <td key='Product_{orderdetail.productid}'>{this.state.productname}</td>
                        <td key='ProductPrice_{orderdetail.productid}'>${this.state.productprice.toFixed(2)}</td>
                        <td key='Quantity_{orderdetail.quantity}_{orderdetail.productid}'>{orderdetail.quantity}</td>
                        <td key='ProductTotal_{orderdetail.productid}'>${(orderdetail.quantity * this.state.productprice).toFixed(2)}</td>
                        {allowmodification}
                    </tr>
                )
                    this.setState({
                        orderdetails: this.state.orderdetails.concat(orderdetails),
                        grandtotal: this.state.grandtotal + (orderdetail.quantity * this.state.productprice),
                    })
                })
             })})
    }

    confirmAndAdd(){
        let allowconfirm = ""

        if(!this.state.status) {
            allowconfirm = (
                <React.Fragment>
                    <button className="btn btn-sm btn-secondary" onClick={this.handleConfirm}>Confirm order</button>
                    <Link to={'/orderdetail/add/' + this.state.orderid}>
                        <button className="btn btn-sm btn-secondary">Add Item</button>
                    </Link>
                </React.Fragment>
            )
        }
        this.setState({allowconfirm: allowconfirm})
    }

    handleConfirm(event) {
        var data = {
            "id": parseInt(this.state.orderid),
            "paymentid": this.state.paymentid,
            "discountid": this.state.discountid,
            "deliveryid": this.state.deliveryid,
            "customerid": this.state.customerid,
            "status": parseInt(1)
        };

        var url = 'http://localhost:9000/api/order/' + this.state.orderid;

        fetch(url, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        }).then(result => {
            this.setState({
                orderdetails: [],
                orderConfirmed: true
            })
            this.getOrder().then(() => {
                this.getOrderDetails().then(() => {
                    this.confirmAndAdd()
                })
            })
        });
    }

    handleRemove(orderdetailid) {

        var data = {
            "id": orderdetailid
        };

        var url = 'http://localhost:9000/api/orderdetail/' + orderdetailid

        fetch(url, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        }).then(() => {
            this.setState({
                orderdetails: [],
                orderDetailDeleted: true,
                grandtotal: 0
            })
            this.getOrderDetails()
        });
    }

    handleIncrease(orderdetailid,productid,currentqty) {
        var data = {
            "id": orderdetailid,
            "orderid": parseInt(this.state.orderid),
            "productid": productid,
            "quantity": currentqty + 1
        };

        var url = 'http://localhost:9000/api/orderdetail/' + orderdetailid;

        fetch(url, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        }).then(result => {
            this.setState({
                orderdetails: [],
                grandtotal: 0,
                orderDetailUpdated: true
            })
            this.getOrderDetails()
        });
    }

    handleDecrease(orderdetailid,productid,currentqty) {

        if(currentqty === 1){
            return
        }

        var data = {
            "id": orderdetailid,
            "orderid": parseInt(this.state.orderid),
            "productid": productid,
            "quantity": currentqty - 1
        };

        var url = 'http://localhost:9000/api/orderdetail/' + orderdetailid;

        fetch(url, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        }).then(result => {
            this.setState({
                orderdetails: [],
                grandtotal: 0,
                orderDetailUpdated: true
            })
            this.getOrderDetails()
        });
    }

    componentDidMount() {
       this.getOrder().then(() => {
            this.getDelivery().then(() => {
                this.getDiscount().then(() => {
                    this.getPayment().then(() => {
                            this.getOrderDetails().then(() => {
                                this.confirmAndAdd()
                                this.setState({loaded: 1})
                            })
                    })
                })
            })
        })
    }

    render() {
        /*if (this.state.orderConfirmed) {
            return <Redirect to={"/order/" + this.state.orderid}/>
        }
        else*/ if (this.state.loaded) {
        return (
            <div>
            <div>
                <table className="table table-sm">
                    <thead>
                    <tr key="HeadRow">
                        <th key="ProductHead" scope="col">Delivery</th>
                        <th key="PriceHead" scope="col">Payment method</th>
                        <th key="QuantityHead" scope="col">Discount value</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>{this.state.delivery}</td>
                        <td>{this.state.payment}</td>
                        <td>{this.state.discountvalue} %</td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <div>
                <table  className="table table-sm table-striped">
                    <thead>
                    <tr key="HeadRow">
                        <th key="ProductHead" scope="col">Product</th>
                        <th key="PriceHead" scope="col">Price</th>
                        <th key="QuantityHead" scope="col">Quantity</th>
                        <th key="TotalHead" scope="col">Total</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.orderdetails}
                <tr>
                    <td colSpan="3">Grand Total:</td>
                    <td>${this.state.grandtotal.toFixed(2)}</td>
                </tr>
                    <tr>
                        <td colSpan="3">Grand Total with discount:</td>
                        <td>${(this.state.grandtotal * (1.0 - parseFloat(this.state.discountvalue) / 100.0)).toFixed(2)}</td>
                    </tr>
                    </tbody>
                </table>
            </div>
                {this.state.allowconfirm}
            </div>
        )
    } else {
    return (
        <div>Waiting for data ...</div>
    )
        }
    }
}

export default OrderDetails;
