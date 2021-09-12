import React, {Component, Fragment} from 'react';
import Header from "../components/header";
import SideBar from "../components/Sidebar";
import NoImage from '../asset/image/noimage.png'
import AppUrl from "../AppUrl/AppUrl";
import Axios from 'axios'
import jwt_decode from 'jwt-decode'
import moment from "moment";
import {toast} from "react-toastify";
import Loading from "../components/Loading";
import Footer from "../components/Footer";
class SPMFormView extends Component {
    constructor({match}) {
        super();
        this.state = {
            id:match.params.id,
            name:'',
            phone:'',
            type:'',
            email:'',
            status:'',
            date:'',
            address:'',
            token:'',
            image:'',
            nid1:'',
            nid2:'',
            bank_name:'',
            acc_number:'',
            password:'',
            repassword:'',
            loading:true
        }
    }
    componentDidMount() {
        const token = localStorage.admintoken
        if(token){
            this.setState({token:token})
            const id = this.state.id
            const myFormData = new FormData()
            myFormData.append('token',token)
            myFormData.append('id',id)
            const config = {
                headers : {'content-type':'multipart/form-data'}
            }
            Axios.post(AppUrl.oneSpmform,myFormData,config)
                .then(res=>{
                    console.log("Userdata "+res.data)
                    this.setState({name:res.data[0]['name'],email:res.data[0]['email'],phone:res.data[0]['phone'],
                        type:res.data[0]['user_type'],address:res.data[0]['address'],status:res.data[0]['status'],
                        date:res.data[0]['date'], image:res.data[0]['image'],nid1:res.data[0]['nid1'],nid2:res.data[0]['nid2'],
                        acc_number:res.data[0]['acc_number'],bank_name:res.data[0]['bank_name'],loading:false})
                })
                .catch(error=>{
                    localStorage.clear()
                    console.log(error)
                })
        }else{
            this.props.history.push('login')
        }
    }
    updateFormSubmit(event){
        const id = this.state.id
        const status = this.state.status
        const token = this.state.token
        const formData = new FormData()
        formData.append('id',id)
        formData.append('status',status)
        formData.append('token',token)

        Axios.post(AppUrl.updateSpmform, formData)
            .then(res=>{
                if(res.data.success){
                    this.props.history.push(`/spmform`)
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


    onStatus(e){
        this.setState({status:e.target.value})
    }


    render() {
        return (
            <Fragment>
                <Header title={this.state.name+" View"}/>
                <div className="content-wrapper">
                    <div className="row m-2  pt-3">
                        <div className="col-md-2 col-12 ">
                        </div>
                        {this.state.loading==true?<Loading/>:
                            <div className="col-md-8 col-12">
                                <div className="col-md-12 col-12 uprofile bg-white py-3 mt-2 table-responsive-sm mb-5 ">
                                    <h3 className=''>Service Point Form </h3>
                                    <br/>
                                    <form onSubmit={this.updateFormSubmit.bind(this)}>
                                        <div className="form-group row">
                                            <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">Name</label>
                                            <div className="col-sm-10">
                                                <input type="text" readOnly value={this.state.name} className="form-control" id="inputEmail3"/>
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">Email</label>
                                            <div className="col-sm-10">
                                                <input type="email" readOnly value={this.state.email} className="form-control" id="inputEmail3"/>
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">Phone</label>
                                            <div className="col-sm-10">
                                                <input type="text" readOnly value={this.state.phone}  className="form-control" id="inputEmail3"/>
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">Address</label>
                                            <div className="col-sm-10">
                                                <input type="text" readOnly value={this.state.address} className="form-control" id="inputEmail3"/>
                                            </div>
                                        </div>

                                        <div className="form-group row">
                                            <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">Payment Method</label>
                                            <div className="col-sm-10">
                                                <input type="text" readOnly value={this.state.bank_name} className="form-control" id="inputEmail3"/>
                                            </div>
                                        </div>

                                        <div className="form-group row">
                                            <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">Account number</label>
                                            <div className="col-sm-10">
                                                <input type="text" readOnly value={this.state.acc_number} className="form-control" id="inputEmail3"/>
                                            </div>
                                        </div>

                                        <div className="form-group row">
                                            <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">Status</label>
                                            <div className="col-sm-10">
                                                <select onChange={this.onStatus.bind(this)} className="form-control">
                                                    <option selected>{this.state.status} </option>
                                                    <option value="Verified"> Verified </option>
                                                    <option value="Pending"> Pending </option>
                                                    <option value="Cancel"> Cancel </option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">Created Date</label>
                                            <div className="col-sm-10">
                                                <input type="text" value={moment(this.state.date).format("Do  MMMM YYYY")} className="form-control" id="inputEmail3" readOnly/>
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">Photo</label>
                                            <div className="col-sm-10">
                                                {this.state.image2?<img id="showImage" style={{height:'60px',width:'60'}} src={this.state.image2} />:this.state.image ?<img  style={{height:'160px',width:'200'}} src={AppUrl.photoUrl+this.state.image}/> :
                                                    <img style={{height:'160px',width:'200'}} src={NoImage}/>
                                                }
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">NID Front Side</label>
                                            <div className="col-sm-10">
                                                {this.state.image2?<img id="showImage" style={{height:'60px',width:'60'}} src={this.state.image2} />:this.state.nid1 ?<img  style={{height:'160px',width:'200'}} src={AppUrl.photoUrl+this.state.nid1}/> :
                                                    <img style={{height:'160px',width:'200'}} src={NoImage}/>
                                                }
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">NID Back Side</label>
                                            <div className="col-sm-10">
                                                {this.state.image2?<img id="showImage" style={{height:'60px',width:'60'}} src={this.state.image2} />:this.state.nid1 ?<img  style={{height:'160px',width:'200'}} src={AppUrl.photoUrl+this.state.nid1}/> :
                                                    <img style={{height:'160px',width:'200'}} src={NoImage}/>
                                                }
                                            </div>

                                        </div>


                                        <div className=" row">
                                            <div className="col-sm-8">
                                            </div>
                                            <div className="col-sm-4">
                                                <button type="submit" className="btn  btn-dark float-right">Update</button>
                                            </div>
                                        </div>
                                    </form>
                                </div>

                            </div>
                        }
                        <div className="col-md-2 col-12 ">
                        </div>

                    </div>
                    <Footer/>
                </div>
                <SideBar/>
            </Fragment>
        );
    }
}

export default SPMFormView;