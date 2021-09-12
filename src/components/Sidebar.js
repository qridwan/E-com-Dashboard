import React, {Component, Fragment} from 'react';
import {Link, withRouter} from "react-router-dom";
import Logo from '../asset/image/logo.png'
import Axios from "axios";
import AppUrl from "../AppUrl/AppUrl";
class SideBar extends Component {
    constructor() {
        super();
        this.state={
            location:'',p:''
        }
    }

    componentDidMount() {
        const token = localStorage.admintoken
        if(token) {
            const location = this.props.location.pathname
            this.setState({location: location})

            const myFormData = new FormData()
            myFormData.append('token',token)
            const config = {
                headers : {'content-type':'multipart/form-data'}
            }
            Axios.post(AppUrl.OrdersCount,myFormData,config)
                .then(res=>{
                    this.setState({p:res.data.p })
                    console.log("Ok")
                })
                .catch(error=>{
                    console.log('Error')
                })

        }else{
            this.props.history.push('/login')
        }
    }

    render() {
        return (
            <Fragment>
                <aside className="main-sidebar sidebar-dark-primary elevation-4 " id="overlay">
                    <Link to="/" className="brand-link overRidde">
                        <img src={Logo}  className=" elevation-2" style={{height:'40px',marginLeft:'10px'}} alt="Logo Image"/>
                        <span className="brand-text font-weight-light" style={{paddingLeft:'10px'}}> Trust Lite  </span>
                    </Link>

                    <div className="sidebar">
                        <nav className="">
                            <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                                <li className={this.state.location=='/'?'active nav-item':"nav-item"} >
                                    <Link to="/" className="nav-link ">
                                        <i className="nav-icon fa fa-th-large"></i>
                                        <p className="pb-2">
                                            Dashboard
                                        </p>
                                    </Link>
                                </li>
                                <li className={this.state.location=='/admin'?'active nav-item':"nav-item"}>
                                    <Link to="/admin" className="nav-link">
                                        <i className="nav-icon fa fa-user"></i>
                                        <p className="pb-2">
                                            Admin
                                        </p>
                                    </Link>
                                </li>

                                <li className={this.state.location=='/customer'?'active nav-item':"nav-item"}>
                                    <Link to="/customer" className="nav-link">
                                        <i className="nav-icon fa fa-handshake"></i>
                                        <p className="pb-2">
                                            Customer
                                        </p>
                                    </Link>
                                </li>
                                <li className={this.state.location=='/spm'?'active nav-item':"nav-item"}>
                                    <Link to="/spm" className="nav-link">
                                        <i className="nav-icon fa fa-store"></i>
                                        <p className="pb-2">
                                            SPM
                                        </p>
                                    </Link>
                                </li>

                                <li className={this.state.location=='/location'?'active nav-item':"nav-item"}>
                                    <Link to="/location" className="nav-link">
                                        <i className="nav-icon fa fa-search-location"></i>
                                        <p className="pb-2">
                                            SPM Location
                                        </p>
                                    </Link>
                                </li>

                                <li className={this.state.location=='/spmform'?'active nav-item':"nav-item"}>
                                    <Link to="/spmform" className="nav-link">
                                        <i className="nav-icon fa fa-store"></i>
                                        <p className="pb-2">
                                            SPM Form
                                        </p>
                                    </Link>
                                </li>
                                
                                <li className={this.state.location=='/category'?'active nav-item':"nav-item"}>
                                    <Link to="/category" className="nav-link">
                                        <i className="nav-icon fa fa-bookmark"></i>
                                        <p className="pb-2">
                                            Category
                                        </p>
                                    </Link>
                                </li>

                                <li className={this.state.location=='/products'?'active nav-item':"nav-item"}>
                                    <Link to="/products" className="nav-link">
                                        <i className="nav-icon fa fa-shopping-bag"></i>
                                        <p className="pb-2">
                                            Products
                                        </p>
                                    </Link>
                                </li>

                                <li className={this.state.location=='/orders'?'active nav-item':"nav-item"}>
                                    <Link to="/orders" className="nav-link">
                                        <i className="nav-icon fa fa-book"></i>
                                        <p className="pb-2">
                                            Order History ({this.state.p})
                                        </p>
                                    </Link>
                                </li>

                                <li className={this.state.location=='/supplierform'?'active nav-item':"nav-item"}>
                                    <Link to="/supplierform" className="nav-link">
                                        <i className="nav-icon fa fa-user"></i>
                                        <p className="pb-2">
                                            Supplier Form
                                        </p>
                                    </Link>
                                </li>
                                <li className={this.state.location=='/payment'?'active nav-item':"nav-item"}>
                                    <Link to="/payment" className="nav-link">
                                        <i className="nav-icon fa fa-money-bill-alt"></i>
                                        <p className="pb-2">
                                            Bank List
                                        </p>
                                    </Link>
                                </li>
                                <li className={this.state.location=='/blog'?'active nav-item':"nav-item"}>
                                    <Link to="/blog" className="nav-link">
                                        <i className="nav-icon fa fa-edit"></i>
                                        <p className="pb-2">
                                            Blog
                                        </p>
                                    </Link>
                                </li>
                                <li className={this.state.location=='/slider'?'active nav-item':"nav-item"}>
                                    <Link to="/slider" className="nav-link">
                                        <i className="nav-icon fa fa-image"></i>
                                        <p className="pb-2">
                                            Slider List
                                        </p>
                                    </Link>
                                </li>
                                <li className={this.state.location=='/message'?'active nav-item':"nav-item"}>
                                    <Link to="/message" className="nav-link">
                                        <i className="nav-icon fa fa-envelope"></i>
                                        <p className="pb-2">
                                            Message
                                        </p>
                                    </Link>
                                </li>
                                <li className={this.state.location=='/referral'?'active nav-item':"nav-item"}>
                                    <Link to="/referral" className="nav-link">
                                        <i className="nav-icon fa fa-share-alt-square"></i>
                                        <p className="pb-2">
                                            Referral System
                                        </p>
                                    </Link>
                                </li>
                                <li className={this.state.location=='/referral/customer'?'active nav-item':"nav-item"}>
                                    <Link to="/referral/customer" className="nav-link">
                                        <i className="nav-icon fa fa-users"></i>
                                        <p className="pb-2">
                                            Referral Customer
                                        </p>
                                    </Link>
                                </li>
                                <li className={this.state.location=='/settings'?'active nav-item':"nav-item"}>
                                    <Link to="/settings" className="nav-link">
                                        <i className="nav-icon fa fa-wrench"></i>
                                        <p className="pb-2">
                                            Settings
                                        </p>
                                    </Link>
                                </li>
                        </ul>
                    </nav>
                </div>

            </aside>
            </Fragment>
        );
    }
}

export default withRouter(SideBar);