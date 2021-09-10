import React, {Component} from "react";
import {
    BrowserRouter as Router,
    Route,
    Link,
    Switch
} from 'react-router-dom';
import {SupplierList, SupplierDetails, SupplierAdd, SupplierEdit, SupplierDelete} from "./Supplier";
import {CategoryList, CategoryDetails, CategoryAdd, CategoryEdit, CategoryDelete} from "./Category";
import {DiscountList, DiscountDetails, DiscountAdd, DiscountEdit, DiscountDelete} from './Discount'
import {ProductList, ProductDetails, ProductAdd, ProductEdit, ProductDelete} from './Product'
import {InventoryCreate, InventoryEdit, InventoryList, InventoryDetails} from './Inventory'
import {CustomerList, CustomerDetails, CustomerAdd, CustomerEdit, CustomerDelete} from './Customer'
import {PaymentList, PaymentDetails, PaymentAdd, PaymentEdit, PaymentDelete} from './Payment'
import {WishlistList} from "./Wishlist";
import {OrderDetails, OrderList, OrderDetailCreate, OrderCreate} from "./Order";
import {DeliveryList, DeliveryDetails, DeliveryAdd, DeliveryEdit, DeliveryDelete} from "./Delivery";
import WishlistProductCreate from "./Wishlist/WishlistProductCreate";


class Menu extends Component {
    linksMarkup = this.props.links.map(link =>
        <li className="nav-item" key={link.label}>
            <Link className="nav-link" to={link.link}>{link.label}</Link>
        </li>
    );

    render() {
        return <Router>
            <nav className="navbar navbar-expand-md navbar-light bg-light fixed-bottom">
                <div className="container ml-auto">
                    <a className="navbar-brand" href="/">Home</a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse"
                            data-target="#navbarsExampleDefault"
                            aria-controls="navbarsExampleDefault" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"/>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarsExampleDefault">
                        <ul className="navbar-nav ml-auto">
                            {this.linksMarkup}
                        </ul>
                    </div>
                </div>
            </nav>
            <Switch>
                <Route path="/products" component={ProductList}/>
                <Route path="/product/add" component={ProductAdd}/>
                <Route path="/product/edit/:id" component={ProductEdit}/>
                <Route path="/product/delete/:id" component={ProductDelete}/>
                <Route path="/product/:id" component={ProductDetails}/>

                <Route path="/categories" component={CategoryList}/>
                <Route path="/category/add" component={CategoryAdd}/>
                <Route path="/category/edit/:id" component={CategoryEdit}/>
                <Route path="/category/delete/:id" component={CategoryDelete}/>
                <Route path="/category/:id" component={CategoryDetails}/>

                <Route path="/suppliers" component={SupplierList}/>
                <Route path="/supplier/add" component={SupplierAdd}/>
                <Route path="/supplier/edit/:id" component={SupplierEdit}/>
                <Route path="/supplier/delete/:id" component={SupplierDelete}/>
                <Route path="/supplier/:id" component={SupplierDetails}/>

                <Route path="/deliveries" component={DeliveryList}/>
                <Route path="/delivery/add" component={DeliveryAdd}/>
                <Route path="/delivery/edit/:id" component={DeliveryEdit}/>
                <Route path="/delivery/delete/:id" component={DeliveryDelete}/>
                <Route path="/delivery/:id" component={DeliveryDetails}/>

                <Route path="/discounts" component={DiscountList}/>
                <Route path="/discount/add" component={DiscountAdd}/>
                <Route path="/discount/edit/:id" component={DiscountEdit}/>
                <Route path="/discount/delete/:id" component={DiscountDelete}/>
                <Route path="/discount/:id" component={DiscountDetails}/>

                <Route path="/customers" component={CustomerList}/>
                <Route path="/customer/add" component={CustomerAdd}/>
                <Route path="/customer/edit/:id" component={CustomerEdit}/>
                <Route path="/customer/delete/:id" component={CustomerDelete}/>
                <Route path="/customer/:id" component={CustomerDetails}/>

                <Route path="/payments" component={PaymentList}/>
                <Route path="/payment/add" component={PaymentAdd}/>
                <Route path="/payment/edit/:id" component={PaymentEdit}/>
                <Route path="/payment/delete/:id" component={PaymentDelete}/>
                <Route path="/payment/:id" component={PaymentDetails}/>

                <Route path="/wishlist/customer/:customerid" component={WishlistList}/>
                <Route path="/wishlist/add/:customerid" component={WishlistProductCreate} />

                <Route path="/order/add" component={OrderCreate} />
                <Route path="/orders/customer/:customerid" component={OrderList} />
                <Route path="/order/:id" component={OrderDetails} />
                <Route path="/orderdetail/add/:orderid" component={OrderDetailCreate} />

                <Route path="/inventories" component={InventoryList}/>
                <Route path="/inventory/add" component={InventoryCreate}/>
                <Route path="/inventory/edit/:id" component={InventoryEdit}/>
                <Route path="/inventory/:id" component={InventoryDetails}/>
            </Switch>
        </Router>
    }
}

export default Menu;
