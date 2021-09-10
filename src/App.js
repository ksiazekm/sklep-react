import React, {Component} from 'react';
import './App.css';
import Menu from "./Components/Menu";

class App extends Component {
    render() {
        let links = [
            {label: "Product", link: "/products"},
            {label: "Category", link: "/categories"},
            {label: "Discount", link: "/discounts"},
            {label: "Suppliers", link: "/suppliers"},
            {label: "Customer", link: "/customers"},
            {label: "Wishlist", link: "/wishlist/customer/1"},
            {label: "Deliveries", link: "/deliveries"},
            {label: "Inventories", link: "/inventories"},
            {label: "Payments", link: "/payments"},
            {label: "Orders", link: "/orders/customer/1"}
        ]
        return (
            <div className="container">
                <Menu links={links}/>
            </div>
        );
    }
}

export default App;
