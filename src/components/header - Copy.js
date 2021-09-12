import React, {Component, Fragment} from 'react';
import  {withRouter,Link} from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import Axios from "axios";
import AppUrl from "../AppUrl/AppUrl";
import Image from '../asset/image/en.png'
import  {NavDropdown,Navbar,Nav} from "react-bootstrap";

class Header extends Component {

    constructor() {
        super();
    }

    componentDidMount() {
        const token = localStorage.admintoken
        if(token){
            const myFormData = new FormData()
            myFormData.append('token',token)
            const config = {
                headers : {'content-type':'multipart/form-data'}
            }
            Axios.post(AppUrl.profile,myFormData,config)
                .then(res=>{
                    console.log("Userdata Header "+res.data)
                    if(res.data.error=="Invalid"){
                        localStorage.clear()
                    }
                })
                .catch(error=>{
                    localStorage.clear()
                    console.log(error)
                    //this.props.history.push('/login')
                })
        }else{
            this.props.history.push('/login')
        }
    }


    logOut(e) {
        e.preventDefault()
        localStorage.removeItem('admintoken')
        //localStorage.clear()
        this.props.history.push(`/login`)
        toast.success('Successfully Logout', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }

    render() {
        return (
            <Fragment>
                <title>{this.props.title}</title>
                {window.innerWidth<=760?
                    <Navbar collapseOnSelect className="d-md-none nav2h d-sm-block bg-white" expand="lg" >
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" className="btn ml-2 minnavbtn" >
                        <i className="fas fa-bars"></i>
                    </Navbar.Toggle>
                    <Navbar className="navbar-nav ml-auto bg-white text-light" >
                        <Nav>
                            <Nav.Link ><img src={Image}/> English</Nav.Link>
                            <Link to="/profile" className="nav-link"><i className=" fa fa-user "></i></Link>
                            <Link className="nav-link"  onClick={this.logOut.bind(this)} >
                                <i className="fas fa-power-off" ></i>
                            </Link>
                        </Nav >
                    </Navbar>

                    <Navbar.Collapse id="responsive-navbar-nav" className="nav2">
                        <Nav >
                            <Link to="/" className="nav-link active"><i className=" fa fa-th-large pr-2"></i>Dashboard</Link>
                            <Link to="/admin" className="nav-link "><i className=" fa fa-user pr-2"></i>Admin</Link>
                            <Link to="/customer" className="nav-link "><i className=" fa fa-handshake pr-2"></i>Customer</Link>
                            <Link to="/spm" className="nav-link "><i className=" fa fa-store pr-2"></i>Service Point Manager</Link>
                            <Link to="/category" className="nav-link "><i className=" fa fa-bookmark pr-2"></i>Category</Link>
                            <Link to="/products" className="nav-link "><i className=" fa fa-shopping-bag pr-2"></i>Products</Link>
                            <Link to="/orders" className="nav-link "><i className=" fa fa-book pr-2"></i>Orders</Link>
                            <Link to="/location" className="nav-link "><i className=" fa fa-search-location pr-2"></i>SPM Location</Link>

                            <Link to="/spmform" className="nav-link "><i className=" fa fa-store pr-2"></i>SPM Form</Link>
                            <Link to="/supplierform" className="nav-link "><i className=" fa fa-user pr-2"></i>Supplier Form</Link>
                            <Link to="/payment" className="nav-link "><i className=" fa fa-money-bill-alt pr-2"></i>Bank List</Link>
                            <Link to="/blog" className="nav-link "><i className=" fa fa-edit pr-2"></i>Blog</Link>
                            <Link to="/slider" className="nav-link "><i className=" fa fa-image pr-2"></i>Slider List</Link>
                            <Link to="/message" className="nav-link "><i className=" fa fa-envelope pr-2"></i>Message</Link>
                            <Link to="/referral" className="nav-link "><i className=" fa fa-share-alt-square pr-2"></i>Referral System</Link>
                            <Link to="/settings" className="nav-link "><i className=" fa fa-wrench pr-2"></i>Settings</Link>

                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
                    :
                    <div className="wrapper">
                        <nav className=" main-header navbar navbar-expand navbar-white navbar-light ">
                            <ul className="navbar-nav">
                                <li className="nav-item">
                                    <a  className="nav-link" data-widget="pushmenu" href="#" role="button"><i
                                        className="fas fa-bars"></i></a>
                                </li>
                            </ul>
                            <ul className="navbar-nav ml-auto">
                                <li className="nav-item dropdown">
                                    <a className="nav-link" data-toggle="dropdown" >
                                        <img src={Image}/> English
                                    </a>
                                </li>
                                <li className="nav-item dropdown">
                                    <a className="nav-link" data-toggle="dropdown" >
                                        <i className="far fa-bell"></i>
                                    </a>
                                </li>
                                <li className="nav-item dropdown">
                                    <a className="nav-link" data-toggle="dropdown" >
                                        <i className="far fa-user "></i>
                                    </a>
                                    <div className="dropdown-menu dropdown-menu-lg dropdown-menu-right" style={{padding:'20px'}}>
                                        <li className="nav-item dropdown">
                                            <Link to='/profile' className="nav-link"  >
                                                <i className="fa fa-user" ></i> Profile
                                            </Link>
                                        </li>
                                        <li className="nav-item dropdown">
                                            <Link className="nav-link"  onClick={this.logOut.bind(this)} >
                                                <i className="fa fa-sign-out-alt" ></i> Logout
                                            </Link>
                                        </li>
                                    </div>
                                </li>
                            </ul>
                        </nav>

                        <ToastContainer
                            position="top-right"
                            autoClose={5000}
                            hideProgressBar
                            newestOnTop={false}
                            closeOnClick
                            rtl={false}
                            pauseOnFocusLoss
                            draggable
                            pauseOnHover
                        />
                    </div>
                }


            </Fragment>
        );
    }
}

export default withRouter(Header);