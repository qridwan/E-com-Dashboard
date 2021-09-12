import React, {Component} from 'react';
import Header from "../components/header";
import SideBar from "../components/Sidebar";
import {ToastContainer} from "react-toastify";
import Footer from "../components/Footer";
import {Link} from "react-router-dom";
import Axios from "axios";
import AppUrl from "../AppUrl/AppUrl";
import Loading from "../components/Loading";

class Home extends Component {
    constructor() {
        super();
        this.state = {
            admin:'',
            spm:'',
            customer:'',
            cashier:'',
            product:'',
            slider:'',
            location:'',
            blog:'',
            payment:'',
            category:'',
            loading:true
        }
    }

    componentDidMount() {
        const token = localStorage.admintoken
        if(token){
            const MyForm = new FormData()
            MyForm.append('token',token)
            const config = {
                headers : {'content-type':'multipart/form-data'}
            }
            Axios.post(AppUrl.SiteCountData,MyForm,config)
                .then(res=>{
                    this.setState({admin:res.data.admin,
                        spm:res.data.spm,cashier:res.data.cashier,
                        customer:res.data.customer,product:res.data.product,slider:res.data.slider,
                        location:res.data.location,blog:res.data.blog,payment:res.data.payment,
                        category:res.data.category,loading:false})
                    console.log("Ok")
                })
                .catch(error=>{
                    console.log('Error')
                })
        }else{
            // this.props.history.push('login')
            this.props.history.push('/')
        }
    }

    render() {
        return (
            <div>
                <Header title="Dashboard" />
                <div className="content-wrapper p-3">
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
                    <section className="content ">
                        <div className="py-1">
                            {this.state.loading==true ? <Loading/>:
                                <div className="row homepage" >
                                    <div className="col-lg-4 col-12">
                                        <div className="card text-center">
                                            <div className="card-body card-body-home text-center">
                                                <p className=" text-center pt-1"><i className="fa fa-user"></i> Total Admin </p>
                                                <h3 className="card-text pt-1">{this.state.admin}</h3>
                                                <Link to="/admin" className="btn btn-dark col-md-12 col-12 homebtn">Manage Admin </Link>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-4 col-12">
                                        <div className="card text-center">
                                            <div className="card-body card-body-home text-center">
                                                <p className=" text-center pt-1"> <i className="fa fa-user"></i> Total Cashier </p>
                                                <h3 className="card-text pt-1">{this.state.cashier}</h3>
                                                <Link to="/admin" className="btn btn-dark col-md-12 col-12 homebtn">Manage Cashier </Link>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-4 col-12">
                                        <div className="card text-center">
                                            <div className="card-body card-body-home text-center">
                                                <p className=" text-center pt-1"><i className="fa fa-users"></i> Total Customer </p>
                                                <h3 className="card-text pt-1">{this.state.customer}</h3>
                                                <Link to="/customer" className="btn btn-dark col-md-12 col-12 homebtn">Manage Customer </Link>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-lg-4 col-12">
                                        <div className="card text-center">
                                            <div className="card-body card-body-home text-center">
                                                <p className=" text-center pt-1"><i className="fa fa-users"></i> Total Service Point Manager </p>
                                                <h3 className="card-text pt-1">{this.state.spm}</h3>
                                                <Link to="/spm" className="btn btn-dark col-md-12 col-12 homebtn">Manage Service Point </Link>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-lg-4 col-12">
                                        <div className="card text-center">
                                            <div className="card-body card-body-home text-center">
                                                <p className=" text-center pt-1"><i className="fa fa-shopping-basket"></i> Total Products </p>
                                                <h3 className="card-text pt-1">{this.state.product}</h3>
                                                <Link to="/products" className="btn btn-dark col-md-12 col-12 homebtn">Manage Products </Link>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-lg-4 col-12">
                                        <div className="card text-center">
                                            <div className="card-body card-body-home text-center">
                                                <p className=" text-center pt-1"><i className="fa fa-location-arrow"></i> Total SPM Location </p>
                                                <h3 className="card-text pt-1">{this.state.location}</h3>
                                                <Link to="/location" className="btn btn-dark col-md-12 col-12 homebtn"> Create Location </Link>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-lg-4 col-12">
                                        <div className="card text-center">
                                            <div className="card-body card-body-home text-center">
                                                <p className=" text-center pt-1"><i className="fa fa-images"></i> Total Slider Image </p>
                                                <h3 className="card-text pt-1">{this.state.slider}</h3>
                                                <Link to="/slider/create" className="btn btn-dark col-md-12 col-12 homebtn"> Create Slider </Link>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-lg-4 col-12">
                                        <div className="card text-center">
                                            <div className="card-body card-body-home text-center">
                                                <p className=" text-center pt-1"><i className="fa fa-edit"></i> Total Blog </p>
                                                <h3 className="card-text pt-1">{this.state.blog}</h3>
                                                <Link to="/blog" className="btn btn-dark col-md-12 col-12 homebtn">Manage Blogs </Link>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-lg-4 col-12">
                                        <div className="card text-center">
                                            <div className="card-body card-body-home text-center">
                                                <p className=" text-center pt-1"><i className="fa fa-coins"></i> Total Payment Account </p>
                                                <h3 className="card-text pt-1">{this.state.payment}</h3>
                                                <Link to="/payment" className="btn btn-dark col-md-12 col-12 homebtn">Manage Payment </Link>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-4 col-12">
                                        <div className="card text-center">
                                            <div className="card-body card-body-home text-center">
                                                <p className=" text-center pt-1">Settings </p>
                                                <h3 className="card-text pt-1"> <i className="fa fa-wrench"></i> </h3>
                                                <Link to="/settings" className="btn btn-dark col-md-12 col-12 homebtn">Manage Settings </Link>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-4 col-12">
                                        <div className="card text-center">
                                            <div className="card-body card-body-home text-center">
                                                <p className=" text-center pt-1"><i className="fa fa-bookmark"></i> Total Sub Category </p>
                                                <h3 className="card-text pt-1">{this.state.category}</h3>
                                                <Link to="/category" className="btn btn-dark col-md-12 col-12 homebtn"> Create Category </Link>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-4 col-12 ">
                                        <div className="card text-center">
                                            <div className="card-body card-body-home text-center">
                                                <p className=" text-center pt-2"><i className="fa fa-book"></i> Total Category </p>
                                                <h3 className="card-text pt-1">5</h3>
                                                <h3></h3>
                                                <br/>
                                            </div>
                                        </div>
                                    </div>



                                </div>
                            }
                        </div>
                    </section>

                </div>

                <SideBar/>
                <Footer/>
            </div>
        );
    }
}

export default Home;