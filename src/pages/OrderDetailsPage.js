import React, {Component, Fragment} from 'react';
import Header from "../components/header";
import Footer from "../components/Footer";
import SideBar from "../components/Sidebar";
import {toast} from "react-toastify";
import AppUrl from "../AppUrl/AppUrl";
import Axios from 'axios'
import jwt_decode from 'jwt-decode'
import Loading from "../components/Loading";
import moment from "moment";

class OrderDetailsPage extends Component {
    constructor({match}) {
        super();
        this.state={
            invoice:match.params.invoice,status:'',payment_type:'',d_schedule:'',amount:'',spm_location:'',d_type:'',
            receiver_name:'',mobile:'',address:'',city:'',customer_note:'',referral_code:'',payment_acc:'',sender_acc:'',
            trx_id:'',date:'',qtn:'',customer_name:'',status_msg:'',spm_id:'',id:'',p_status:'',t_status:'',
            data:[],loading:true,type:''
        }
    }

    componentDidMount() {
        const token = localStorage.admintoken
        if(token){
            const decoded = jwt_decode(token)
            this.setState({token:token,type:decoded.usertype})
            const myFormData = new FormData()
            myFormData.append("invoice",this.state.invoice)
            myFormData.append('token',token)
            const config = {
                headers : {'content-type':'multipart/form-data'}
            }
            Axios.post(AppUrl.OneOrder,myFormData,config)
                .then(res=>{
                    this.setState({data:res.data.products,loading:false})
                    this.setState({payment_type:res.data.billing[0]['payment_type'],status:res.data.billing[0]['status'],d_schedule:res.data.billing[0]['d_schedule']
                        ,amount:res.data.billing[0]['amount'],spm_location:res.data.billing[0]['spm_location'],d_type:res.data.billing[0]['d_type'],
                        receiver_name:res.data.billing[0]['receiver_name'],mobile:res.data.billing[0]['mobile'],address:res.data.billing[0]['address'],
                        city:res.data.billing[0]['city'],customer_note:res.data.billing[0]['customer_note'],referral_code:res.data.billing[0]['referral_code'],
                        payment_acc:res.data.billing[0]['payment_acc'],sender_acc:res.data.billing[0]['sender_acc'],trx_id:res.data.billing[0]['trx_id'],
                        date:res.data.billing[0]['date'],customer_name:res.data.billing[0]['customer_name'],status_msg:res.data.billing[0]['status_msg'],
                        spm_id:res.data.billing[0]['spm_id'],qtn:res.data.billing[0]['qtn'],id:res.data.billing[0]['id'],
                        p_status:res.data.billing[0]['p_status'],t_status:res.data.billing[0]['t_status']
                    })
                    console.log(res.data.products+"Data Get")
                })
                .catch(error=>{
                    console.log(error)
                })
        }
    }

    onStatus(e){
        this.setState({status:e.target.value})
    }
    onStatus_msg(e){
        this.setState({status_msg:e.target.value})
    }

    onPstatus(e){
        this.setState({p_status:e.target.value})
    }
    onTstatus(e){
        this.setState({t_status:e.target.value})
    }

    print(){
        var printContents = document.getElementById('printable').innerHTML;
        var originalContents = document.body.innerHTML;
        document.body.innerHTML = printContents;
        window.print();
        document.body.innerHTML = originalContents;
        window.location.reload()
    }

    onFormsubmit(event){
        const formData = new FormData();
        formData.append('token',this.state.token)
        formData.append('id',this.state.id)
        formData.append('status',this.state.status)
        formData.append('p_status',this.state.p_status)
        formData.append('t_status',this.state.t_status)
        formData.append('referral_code',this.state.referral_code)
        formData.append('mobile',this.state.mobile)
        formData.append('invoice',this.state.invoice)
        formData.append('name',this.state.customer_name)
        formData.append('status_msg',this.state.status_msg)
        Axios.post(AppUrl.UpdateOrders, formData)
            .then(res=>{
                if(res.data.success){
                    this.props.history.push("/orders")
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
        event.preventDefault()
    }
    render() {
        const pdata = this.state.data.map((res,key)=>{
            return(
                <tr>
                    <th scope="row">{key+1}</th>
                    <td>{res.title}</td>
                    <td> <img style={{height:'40px'}} src={AppUrl.photoUrl+res.p_img} alt={res.title}/> </td>
                    <td>৳ {res.product_price}</td>
                    <td> {res.product_qtn}</td>
                    <td> ৳ {res.product_price * res.product_qtn }</td>
                </tr>
            )
        })
        return (
            <Fragment>
                <Header title="Order Details"/>
                <div className="content-wrapper">
                    {this.state.loading == true ? <Loading/> :

                        <div className="row p-2 m-2" id="printable">
                            <h3>Order Details</h3>
                            <div className="col-md-12">
                                <div className="row  mb-2">
                                    <div className="bg-white col-md-6 p-2 col-6">
                                        <p> Order #{this.state.invoice} </p>
                                        <p> Placed on {moment(this.state.date).format("Do  MMMM YYYY")} </p>
                                    </div>
                                    <div className="bg-white col-md-5 p-2 col-6">
                                        <h3 className="float-right pt-2">Total : ৳ {this.state.amount} + Delivery charge</h3>
                                    </div>
                                </div>

                                <div className="row  mb-2 ">
                                    <div className="col-md-5 mb-2 pr-2 p-2 pl-2 col-12 bg-white " >
                                        <h5 className=""> Billing Address</h5>
                                        <p>Receiver Name : {this.state.receiver_name} </p>
                                        <p>City : {this.state.city} </p>
                                        <p> Address : {this.state.address} </p>
                                        <p>Mobile No : {this.state.mobile} </p>
                                        <h5 className="mt-1"> Transaction Information</h5>
                                        <p>Payment Type : {this.state.payment_type} </p>
                                        <p>Payment Account : {this.state.payment_acc} </p>
                                        <p>Sender Account : {this.state.sender_acc} </p>
                                        <p>Trx ID : {this.state.trx_id} </p>
                                    </div>

                                    <div className="col-md-6 pl-2 p-2 mb-2  col-12 bg-white">
                                        <h5> Billing Details</h5>
                                        <p>Customer name : {this.state.customer_name}</p>
                                        <p>SPM Location : {this.state.spm_location}</p>
                                        <p>Delivery Schedule : {this.state.d_schedule}</p>
                                        <p>Delivery Type : {this.state.d_type}</p>
                                        <p>Customer Note : {this.state.customer_note}</p>
                                        <p>Buy & Earn Code : {this.state.referral_code}</p>
                                        <p>Quantity : {this.state.qtn}</p>
                                    </div>
                                </div>

                                <div className="row  mb-2">
                                    <div className="bg-white col-md-11 p-2 col-12">
                                        <h3>Billing Product Informaion </h3>
                                        <table className="table table-bordered table-responsive-sm ">
                                            <thead>
                                            <tr>
                                                <th scope="col">SL</th>
                                                <th scope="col">Product Name</th>
                                                <th scope="col">Image</th>
                                                <th scope="col">Price</th>
                                                <th scope="col">Qtn</th>
                                                <th scope="col">Total</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {pdata}
                                            </tbody>
                                        </table>
                                        <h5 className="float-right pt-2">Total Amount : ৳ {this.state.amount} + Delivery charge </h5>
                                    </div>
                                    <div className='col-md-12 ' style={{ padding:'50px'}}>
                                                <button type='reset' className='btn btn-danger border '
                                                >Cancel </button>
                                                <button className='btn bg-info border '
                                                        onClick={this.print.bind(this)}><i className='fa fa-print text-white'></i> </button>
                                            </div>
                                </div>

                                    <div className="row  mb-2">
                                        <div className="bg-white col-md-11 p-5 p-2 col-12">
                                            <h3 className="text-center mb-5"> Status Update </h3>
                                            <form onSubmit={this.onFormsubmit.bind(this)}>
                                            <div className="form-group row">
                                                    <label htmlFor="inputEmail3" className="col-sm-3 col-form-label">Order status</label>
                                                    <div className="col-sm-9">
                                                        <select onChange={this.onStatus.bind(this)}  className="form-control">
                                                            <option selected value={this.state.status}> {this.state.status} </option>
                                                            <option value="Accepted"> Accepted </option>
                                                            <option value="Delivered"> Delivered </option>
                                                            <option value="Cancelled"> Cancelled </option>
                                                            <option value="Pending"> Pending </option>
                                                        </select>
                                                    </div>
                                                </div>

                                                <div className="form-group row">
                                                    <label htmlFor="inputEmail3" className="col-sm-3 col-form-label">Tracking status</label>
                                                    <div className="col-sm-9">
                                                        <select onChange={this.onTstatus.bind(this)}  className="form-control">
                                                            <option selected value={this.state.t_status}> {this.state.t_status} </option>
                                                            <option value="In the street"> In the street </option>
                                                            <option value="Order processing now"> Order processing now </option>
                                                            <option value="Delivered"> Delivered </option>
                                                            <option value="Accepted"> Accepted </option>
                                                            <option value="Cancelled"> Cancelled </option>
                                                            <option value="Pending"> Pending </option>
                                                        </select>
                                                    </div>
                                                </div>

                                                <div className="form-group row">
                                                    <label htmlFor="inputEmail3" className="col-sm-3 col-form-label">Payment status</label>
                                                    <div className="col-sm-9">
                                                        <select onChange={this.onPstatus.bind(this)}  className="form-control">
                                                            <option selected value={this.state.p_status}> {this.state.p_status} </option>
                                                            <option value="Paid"> Paid </option>
                                                            <option value="Due"> Due </option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="form-group row">
                                                    <label htmlFor="inputEmail3" className="col-sm-3 col-form-label">Message</label>
                                                    <div className="col-sm-9">
                                                        <input type="text" onChange={this.onStatus_msg.bind(this)} value={this.state.status_msg} className="form-control" id="inputEmail3"/>
                                                    </div>
                                                </div>
                                                <div className=" row">
                                                    <div className="col-sm-6">
                                                    </div>
                                                    <div className="col-sm-6">
                                                        <button type="submit" className="btn  btn-dark float-right"> Update </button>
                                                    </div>
                                                </div>
                                            </form>
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

export default OrderDetailsPage;