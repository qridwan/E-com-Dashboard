import React, {Component, Fragment} from 'react';
import Header from "../components/header";
import SideBar from "../components/Sidebar";
import {Link} from "react-router-dom";
import jwt_decode from 'jwt-decode'
import Axios from "axios"
import AppUrl from "../AppUrl/AppUrl";
import ReactDatatable from '@ashvin27/react-datatable';
import NoImage from '../asset/image/noimage.png'
import {toast} from "react-toastify";
import Footer from "../components/Footer";
import Loading from "../components/Loading";
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';


class Settings extends Component {
    constructor() {
        super();
        this.state = {token:'', id:'',h_customer:'',h_spm:'',h_supplier:'',products:'',	our_spm:'',category:'',
            h_delivery:'',refund:'',privacy:'',footer:'',heading:'',update_info:'',overview:'',opportonity:'',
            loading:true
        }
    }

    componentDidMount() {
        const token = localStorage.admintoken
        if(token){
            this.setState({token:token})
            const myFormData = new FormData()
            myFormData.append('token',token)
            const config = {
                headers : {'content-type':'multipart/form-data'}
            }
            Axios.post(AppUrl.oneSettings,myFormData,config)
                .then(res=>{
                    this.setState({h_customer:res.data[0]['h_customer'],h_spm:res.data[0]['h_spm'],h_supplier:res.data[0]['h_supplier'],
                        products:res.data[0]['products'],category:res.data[0]['category'],our_spm:res.data[0]['our_spm'],opportonity:res.data[0]['opportonity'],
                        h_delivery:res.data[0]['h_delivery'],refund:res.data[0]['refund'],privacy:res.data[0]['privacy'],terms:res.data[0]['terms'],
                        overview:res.data[0]['overview'],update_info:res.data[0]['update_info'], footer:res.data[0]['footer'],heading:res.data[0]['heading'],loading:false})
                })
                .catch(error=>{
                    console.log(error)
                })
        }else{
            this.props.history.push('login')
        }
    }




    render() {

        return (
            <Fragment>
                <Header title="Settings"/>
                <div className="content-wrapper" style={{overflow:'hidden'}}>
                    {this.state.loading==true ? <Loading/> :
                        <div>
                            <h3 className="text-center col-md-12 col-12 bg-white">Settings Page</h3>
                            <div className="row  pt-3" style={{marginLeft:'10px'}}>
                                <div className="col-md-12 col-12 ">
                                    <div className="col-md-2 col-6 " >
                                        <Link className="btn btn-primary" to='/settings/edit'>Edit Settings</Link>
                                    </div>
                                </div>

                                <div className="col-md-2 col-11 " style={{margin:'10px'}}>
                                    <div className="card" >
                                        <div className="card-body">
                                            <p className="card-text">Happy Customer : {this.state.h_customer}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-md-2 col-11 " style={{margin:'10px'}}>
                                    <div className="card" >
                                        <div className="card-body">
                                            <p className="card-text">Happy SPM : {this.state.h_spm}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-2 col-11 " style={{margin:'10px'}}>
                                    <div className="card" >
                                        <div className="card-body">
                                            <p className="card-text">Happy Supplier : {this.state.h_supplier}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-md-2 col-11" style={{margin:'10px'}}>
                                    <div className="card">
                                        <div className="card-body">
                                            <p className="card-text">Total Products : {this.state.products}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-2 col-11" style={{margin:'10px'}}>
                                    <div className="card">
                                        <div className="card-body">
                                            <p className="card-text">Total Category : {this.state.category}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-2 col-11 " style={{margin:'10px'}}>
                                    <div className="card" >
                                        <div className="card-body">
                                            <p className="card-text">Our Service Point : {this.state.our_spm}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-2 col-11 " style={{margin:'10px'}}>
                                    <div className="card">
                                        <div className="card-body">
                                            <p className="card-text">Happy Delivery : {this.state.h_delivery}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-md-2 col-11 " style={{margin:'10px'}}>
                                    <div className="card">
                                        <div className="card-body">
                                            <p className="card-text">Footer Credit : {this.state.footer}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-md-4 col-11 " style={{margin:'10px'}}>
                                    <div className="card">
                                        <div className="card-body">
                                            <p className="card-text">Heading : {this.state.heading}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-md-11 col-11 " style={{margin:'10px'}}>
                                    <div className="card">
                                        <div className="card-body">
                                            <h5 className="card-title">Refund Policy</h5>
                                            <br/>
                                            <p className="card-text"> {ReactHtmlParser(this.state.refund)} </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-md-11 col-11 " style={{margin:'10px'}}>
                                    <div className="card">
                                        <div className="card-body">
                                            <h5 className="card-title">Privacy Policy</h5>
                                            <br/>
                                            <p className="card-text"> {ReactHtmlParser(this.state.privacy)} </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-md-11 col-11 " style={{margin:'10px'}}>
                                    <div className="card">
                                        <div className="card-body">
                                            <h5 className="card-title">Buy & Earn Opportonity</h5>
                                            <br/>
                                            <p className="card-text"> {ReactHtmlParser(this.state.opportonity)} </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-md-11 col-11 " style={{margin:'10px'}}>
                                    <div className="card">
                                        <div className="card-body">
                                            <h5 className="card-title">Terms Conditions</h5>
                                            <br/>
                                            <p className="card-text"> {ReactHtmlParser(this.state.terms)} </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-md-11 col-11 " style={{margin:'10px'}}>
                                    <div className="card">
                                        <div className="card-body">
                                            <h5 className="card-title">Guideline Information</h5>
                                            <br/>
                                            <p className="card-text"> {ReactHtmlParser(this.state.update_info)} </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-md-11 col-11 " style={{margin:'10px'}}>
                                    <div className="card">
                                        <div className="card-body">
                                            <h5 className="card-title">Overview</h5>
                                            <br/>
                                            <p className="card-text"> {ReactHtmlParser(this.state.overview)} </p>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>

                    }
                    <Footer/>
                </div>
                <SideBar/>
            </Fragment>
        );
    }
}

export default Settings;