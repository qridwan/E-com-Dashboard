import React, {Component, Fragment} from 'react';
import Axios from "axios";
import AppUrl from "../AppUrl/AppUrl";
import Header from "../components/header";
import SideBar from "../components/Sidebar";
import Loading from "../components/Loading";
import moment from "moment";
import NoImage from "../asset/image/noimage.png";
import Footer from "../components/Footer";
import {Link} from "react-router-dom";
import ReactDatatable from "@ashvin27/react-datatable";
import {toast} from "react-toastify";

class CustomerDetails extends Component {
    constructor({match}) {
        super();
        this.state = {
            uid:match.params.id,
            name:'',phone:'',type:'',email:'',status:'',date:'',address:'',token:'',image:'',image2:'',
            loading:true,payment_type:'',account:'',records: []
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
            {key: "invoice_no", text: "Invoice"},
            {key: "spm_location", text: "SPM Location"},
            {key: "customer_name", text: "Customer Name"},
            {key: "amount", text: "Total" ,
                cell: record => {
                    return(
                        <Fragment>
                            ৳ {record.amount} + Delivery charge
                        </Fragment>
                    )
                }},
            {key: "qtn", text: "Product Quantity"},
            {key: "date", text: "Created Date",
                cell: record => {
                    return(
                        <Fragment>
                            {moment(record.date).format("Do  MMMM YYYY")}
                        </Fragment>
                    )
                }
            },
            { text: "Action",
                cell: record => {
                    return(
                        <Fragment>
                            <Link to={"/order-history/details/"+record.invoice_no} className="btn btn-info btn-sm mr-1 mb-1"> View More</Link>
                            <button onClick={this.onDelete.bind(this)} name={record.invoice_no} className="btn mr-1 mb-1 btn-danger btn-sm"> Delete</button>
                        </Fragment>
                    )
                }
            },

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


    }



    componentDidMount() {
        const token = localStorage.admintoken
        if(token){
            this.setState({token:token})
            const uid = this.state.uid
            const myFormData = new FormData()
            myFormData.append('token',token)
            myFormData.append('uid',uid)
            myFormData.append('id',uid)

            const config = {
                headers : {'content-type':'multipart/form-data'}
            }
            Axios.post(AppUrl.UserprofileGet,myFormData,config)
                .then(res=>{
                    console.log("Userdata "+res.data)
                    this.setState({account:res.data[0]['account'],payment_type:res.data[0]['payment_type'],name:res.data[0]['name'],email:res.data[0]['email'],phone:res.data[0]['phone'],
                        type:res.data[0]['user_type'],address:res.data[0]['address'],status:res.data[0]['status'],
                        date:res.data[0]['date'], image:res.data[0]['image']})
                })
                .catch(error=>{
                    console.log(error)
                })

            Axios.post(AppUrl.CustomerOrders,myFormData,config)
                .then(res=>{
                    this.setState({records:res.data,loading:false})
                    console.log(res.data+"Orders Get")
                })
                .catch(error=>{
                    console.log(error)
                })


        }else{
            this.props.history.push('login')
        }
    }

    onDelete(e){
        var invoice_no = e.target.name
        const formData = new FormData();
        formData.append('token',this.state.token)
        formData.append('invoice_no',invoice_no)
        Axios.post(AppUrl.DeleteOrders, formData)
            .then(res=>{
                if(res.data.success){
                    this.componentDidMount()
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
            .catch(error=>{
                console.log(error)
            })
    }

    render() {
        return (
            <>
                <Header title={this.state.name+" Profile"}/>

                <div className="content-wrapper">
                    <div className="row m-2  pt-3">
                        <div className="col-md-2 col-12 "></div>
                        {this.state.loading==true?<Loading/>:
                            <div className="col-md-8 col-12">
                                        {this.state.loading==true ? <Loading/> :
                                            <div className="widget-head-color-box navy-bg bg-white p-lg text-center">
                                                {this.state.image ?<img style={{height:'150px',width:'150px'}} src={AppUrl.photoUrl+this.state.image} className="rounded-circle circle-border m-b-md" alt="profile"/>:
                                                    <img style={{height:'150px',width:'150px'}} src={NoImage} className="rounded-circle circle-border m-b-md" alt="profile"/>
                                                }
                                                <div>

                                                </div>
                                            </div>
                                        }
                                        <div className="widget-text-box">
                                            <table className="table table-bordered bg-white text-dark">
                                                {this.state.loading==true?<Loading/>:
                                                    <tbody>
                                                    <tr>
                                                        <td>Full Name</td>
                                                        <td> {this.state.name }</td>
                                                    </tr>
                                                    <tr>
                                                        <td> Mobile </td>
                                                        <td> {this.state.phone} </td>
                                                    </tr>
                                                    <tr>
                                                        <td>Email</td>
                                                        <td colSpan="2"> {this.state.email} </td>
                                                    </tr>

                                                    <tr>
                                                        <td>Account Type</td>
                                                        <td colSpan="2"  >{this.state.type}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Address</td>
                                                        <td colSpan="2" >{this.state.address}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Payment Method</td>
                                                        <td colSpan="2" >{this.state.payment_type}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Account number</td>
                                                        <td colSpan="2" >{this.state.account}</td>
                                                    </tr>
                                                    <tr>
                                                        <td className="mt-1"> </td>
                                                        <td> <Link className="btn btn-dark col-md-5 col-5 mr-1 mt-1" to="/profile" >Manage Profile</Link>
                                                        </td>
                                                    </tr>
                                                    </tbody>
                                                }
                                            </table>

                                </div>
                            </div>
                        }
                        <div className="col-md-2 col-12 "></div>

                        <div className="col-md-12 col-12 bg-white py-3  table-responsive-sm mb-5 mt-2">
                            <h5 className="body-title pl-5">Order History {this.state.name} ({this.state.records.length }) </h5>
                            <ReactDatatable
                                config={this.config}
                                records={this.state.records}
                                columns={this.columns}/>
                        </div>

                    </div>
                    <Footer/>
                </div>

                <SideBar/>
            </>
        );
    }
}

export default CustomerDetails;