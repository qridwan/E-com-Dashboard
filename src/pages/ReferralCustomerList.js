import React, {Component, Fragment} from 'react';
import {Link} from "react-router-dom";
import Axios from "axios";
import AppUrl from "../AppUrl/AppUrl";
import {toast} from "react-toastify";
import Header from "../components/header";
import Loading from "../components/Loading";
import ReactDatatable from "@ashvin27/react-datatable";
import Footer from "../components/Footer";
import SideBar from "../components/Sidebar";
import moment from "moment";

class ReferralCustomerList extends Component {
    constructor() {
        super();
        this.state = {
            data: [],
            token:'',
            loading:true
        }
        this.columns = [
            {
                text: "Serial",
                className: "action",
                align: "center",
                cell: (record,key) => {
                    return(
                        <Fragment>
                            { key + 1}
                        </Fragment>
                    )
                }
            },
            {key: "name", text: "Customer Name"},
            {key: "phone", text: "Customer Mobile"},
            {key: "rank_name", text: "Rank Name"},
            {key: "rank_limit", text: "Rank Code Using Limit"},
            {key: "rank_expire", text: "Rank Expire Days"},
            {key: "rank_code", text: "Buy & Earn Code"},
            {key: "date", text: "Created Date",
                cell: record => {
                    return(
                        <Fragment>
                            {moment(record.date).format("Do  MMMM YYYY")}
                        </Fragment>
                    )
                }
            },
            {key: "action", text: "Action",
                cell: record => {
                    return (
                        <Fragment>
                            <div className="row" style={{width:'130px'}}>
                                <div className="col-md-12 col-sm-12 col-lg-12">
                                    <Link to={"/referral/customer/edit/"+record.id} className="btn btn-primary btn-sm col-md-4 col-lg-4 col-sm-6 m-1  ">
                                        <i className="fa fa-edit"></i>
                                    </Link>
                                    <button
                                        onClick={this.onDel.bind(this)}  name={record.id} className="btn btn-danger btn-sm col-lg-4 col-sm-6 col-md-4 m-1  ">
                                        <i className="fa fa-trash"></i>
                                    </button>
                                </div>
                            </div>
                        </Fragment>
                    );
                }
            }
        ];

        this.config = {
            page_size: 10,
            length_menu: [10, 20, 50],
            show_filter: true,
            show_pagination: true,
            pagination: 'basic',
            button: {
                excel: false,
                print: false
            }
        }

        this.state = {
            records: []
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
            Axios.post(AppUrl.ReferralCustomerList,myFormData,config)
                .then(res=>{
                    this.setState({records:res.data,loading:false})
                    console.log(res.data+"Data Get")
                })
                .catch(error=>{
                    console.log(error)
                })
        }
    }

    onDel(e){
        const id = e.target.name
        const token = this.state.token
        const formData = new FormData()
        formData.append('id',id)
        formData.append('token',token)
        Axios.post(AppUrl.ReferralCustomerDelete,formData)
            .then(res=>{
                this.componentDidMount()
                if(res.data.success){
                    toast.success(res.data.success, {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });

                }else{
                    toast.error(res.data.error, {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });

                }
            })
            .catch(err=>{
                console.log(err)
            })
    }

    render() {

        return (
            <Fragment>
                <Header title="Referral Customer List"/>
                <div className="content-wrapper">
                    <div className="col-md-4 col-12 p-3">
                        <Link to="/referral/customer/create"
                              className="btn btn-dark btn-sm" style={{width:'120px',marginLeft:'5px'}}>Add Customer</Link>
                    </div>
                    {this.state.loading==true ? <Loading/> :
                        <div className="row m-3 bg-white pt-3">
                            <p className="body-title">Referral Customer</p>
                            <div className="col-md-12 col-12 bg-white py-3 mt-2 table-responsive-sm mb-5 ">
                                <ReactDatatable
                                    config={this.config}
                                    records={this.state.records}
                                    columns={this.columns}/>
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

export default ReferralCustomerList;