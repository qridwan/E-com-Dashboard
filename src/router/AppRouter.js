import React, {Component, Fragment} from 'react';
import  {Switch,Route } from "react-router-dom";
import Login from "../pages/Login";
import Home from "../pages/Home";
import Notfound from "../pages/Notfound";
import CustomerList from "../pages/CustomerList";
import AdminList from "../pages/AdminList";
import SpManager from "../pages/SPManager";
import Profile from "../pages/Profile";
import UpdateProfileByAdmin from "../pages/UpdateProfileByAdmin";
import Category from "../pages/Category";
import UpdateCategory from "../pages/UpdateCategory";
import Location from "../pages/Location";
import SPMForm from "../pages/SPMForm";
import SPMFormView from "../pages/SPMFormView";
import SuplierForm from "../pages/SuplierForm";
import SupplierFormView from "../pages/SupplierFormView";
import PaymentList from "../pages/PaymentList";
import BankView from "../pages/BankView";
import PaymentEdit from "../pages/PaymentEdit";
import BlogList from "../pages/BlogList";
import CreateBlog from "../pages/CreateBlog";
import EditBlog from "../pages/EditBlog";
import Slider from "../pages/Slider";
import CreateSlider from "../pages/CreateSlider";
import EditSlider from "../pages/EditSlider";
import Message from "../pages/Message";
import CreateMessage from "../pages/CreateMessage";
import EditMessage from "../pages/EditMessage";
import Settings from "../pages/Settings";
import EditSettings from "../pages/EditSettings";
import Products from "../pages/Products";
import CreateProducts from "../pages/CreateProducts";
import EditProduct from "../pages/EditProduct";
import ReferralSystemList from "../pages/ReferralSystemList";
import CreateReferralSystem from "../pages/CreateReferralSystem";
import EditReferralSystem from "../pages/EditReferralSystem";
import ReferralCustomerList from "../pages/ReferralCustomerList";
import CreateCustomerReferral from "../pages/CreateCustomerReferral";
import EditCustomerReferral from "../pages/EditCustomerReferral";
import OrdersList from "../pages/OrdersList";
import OrderDetailsPage from "../pages/OrderDetailsPage";
import CustomerDetails from "../pages/CustomerDetails";
import SpmDetails from "../pages/SpmDetails";

class AppRouter extends Component {
    render() {
        return (
          <Fragment>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/profile" component={Profile} />
              <Route exact path="/admin" component={AdminList} />
              <Route exact path="/spm" component={SpManager} />
              <Route exact path="/customer" component={CustomerList} />
              <Route
                exact
                path="/profile/:uid"
                component={UpdateProfileByAdmin}
              />
              <Route exact path="/category" component={Category} />
              <Route
                exact
                path="/category/update/:id"
                component={UpdateCategory}
              />
              <Route exact path="/location" component={Location} />
              <Route exact path="/spmform" component={SPMForm} />
              <Route exact path="/spmform/view/:id" component={SPMFormView} />
              <Route exact path="/supplierform" component={SuplierForm} />
              <Route
                exact
                path="/supplier/view/:id"
                component={SupplierFormView}
              />

              <Route exact path="/payment" component={PaymentList} />
              <Route exact path="/payment/create" component={BankView} />
              <Route exact path="/payment/edit/:id" component={PaymentEdit} />

              <Route exact path="/blog" component={BlogList} />
              <Route exact path="/blog/create" component={CreateBlog} />
              <Route exact path="/blog/edit/:id" component={EditBlog} />

              <Route exact path="/slider" component={Slider} />
              <Route exact path="/slider/create" component={CreateSlider} />
              <Route exact path="/slider/edit/:id" component={EditSlider} />

              <Route exact path="/message" component={Message} />
              <Route exact path="/message/create" component={CreateMessage} />
              <Route exact path="/message/edit/:id" component={EditMessage} />

              <Route exact path="/products" component={Products} />
              <Route exact path="/products/create" component={CreateProducts} />
              <Route exact path="/products/edit/:id" component={EditProduct} />

              <Route exact path="/referral" component={ReferralSystemList} />
              <Route
                exact
                path="/referral/system/create"
                component={CreateReferralSystem}
              />
              <Route
                exact
                path="/referral/system/edit/:id"
                component={EditReferralSystem}
              />
              <Route
                exact
                path="/referral/customer"
                component=k{ReferralCustomerList}
              />
              <Route
                exact
                path="/referral/customer/create"
                component={CreateCustomerReferral}
              />
              <Route
                exact
                path="/referral/customer/edit/:id"
                component={EditCustomerReferral}
              />

              <Route exact path="/orders" component={OrdersList} />
              <Route
                exact
                path="/order-history/details/:invoice"
                component={OrderDetailsPage}
              />

              <Route exact path="/settings" component={Settings} />
              <Route exact path="/settings/edit" component={EditSettings} />

              <Route
                exact
                path="/customer/details/:id"
                component={CustomerDetails}
              />
              <Route exact path="/spm/details/:id" component={SpmDetails} />

              <Route component={Notfound} />
            </Switch>
          </Fragment>
        );
    }
}

export default AppRouter;