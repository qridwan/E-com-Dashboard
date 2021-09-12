import React, {Component, Fragment} from 'react';
import Header from "../components/header";
import SideBar from "../components/Sidebar";
import AppUrl from "../AppUrl/AppUrl";
import Axios from 'axios'
import jwt_decode from 'jwt-decode'
import {toast} from "react-toastify";
import Loading from "../components/Loading";
import Footer from "../components/Footer";


class EditReferralSystem extends Component {
    constructor({match}) {
        super();
        this.state = {
            id:match.params.id,
            amount:'',
            rank_name:'',
            rank_limit:'',
            rank_expire:'',
            rank_code:'',
            loading:true
        }
    }

    componentDidMount() {
        const token = localStorage.admintoken
        if(token){
            this.setState({token:token})
            const myFormData = new FormData()
            const id = this.state.id
            myFormData.append('token',token)
            myFormData.append('id',id)
            const config = {
                headers : {'content-type':'multipart/form-data'}
            }
            Axios.post(AppUrl.ReferralSystemOne,myFormData,config)
                .then(res=>{
                    console.log("Referral "+res.data)
                    this.setState({rank_name:res.data[0]['rank_name'],rank_limit:res.data[0]['rank_limit'],rank_code:res.data[0]['rank_code'],
                        rank_expire:res.data[0]['rank_expire'],amount:res.data[0]['amount'],loading:false})
                })
                .catch(error=>{
                    console.log(error)
                })
        }
    }

    FormSubmit(event){
        const token = this.state.token
        const formData = new FormData()
        formData.append('id',this.state.id)
        formData.append('amount',this.state.amount)
        formData.append('rank_name',this.state.rank_name)
        formData.append('rank_limit',this.state.rank_limit)
        formData.append('rank_expire',this.state.rank_expire)
        formData.append('rank_code',this.state.rank_code)
        formData.append('token',token)

        Axios.post(AppUrl.ReferralSystemUpdate, formData)
            .then(res=>{
                if(res.data.success){
                    this.props.history.push(`/referral`)
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



    onRankName(e){
        this.setState({rank_name:e.target.value})
    }
    onRankAmount(e){
        this.setState({amount:e.target.value})
    }
    onRankLimit(e){
        this.setState({rank_limit:e.target.value})
    }
    onRankExpire(e){
        this.setState({rank_expire:e.target.value})
    }
    onRankCode(e){
        this.setState({rank_code:e.target.value})
    }


    render() {
        return (
            <Fragment>
                <Header title="Edit Referral Rank System "/>
                <div className="content-wrapper">
                    <div className="row m-3  pt-3">
                        <div className="col-md-2 col-12"></div>
                        <div className="col-md-8 col-12">
                            <div className="col-md-12 uprofile col-12 bg-white py-3 mt-2 table-responsive-sm mb-5 ">
                                <h5 className='text-center'>Edit Referral Rank System  </h5>
                                <br/>
                                {this.state.loading==true ? <Loading/> :
                                    <form onSubmit={this.FormSubmit.bind(this)}>
                                        <div className="form-group row">
                                            <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">Rank Name</label>
                                            <div className="col-sm-10">
                                                <input type="text" required onChange={this.onRankName.bind(this)} value={this.state.rank_name} className="form-control" id="inputEmail3"/>
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">Rank Using Limit</label>
                                            <div className="col-sm-10">
                                                <input type="text" required onChange={this.onRankLimit.bind(this)} value={this.state.rank_limit} className="form-control" id="inputEmail3"/>
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">Rank Expire Days</label>
                                            <div className="col-sm-10">
                                                <input type="text" required onChange={this.onRankExpire.bind(this)} value={this.state.rank_expire} className="form-control" id="inputEmail3"/>
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">Shopping amount</label>
                                            <div className="col-sm-10">
                                                <input type="text" required onChange={this.onRankAmount.bind(this)} value={this.state.amount} className="form-control" id="inputEmail3"/>
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">Buy & Earn Code</label>
                                            <div className="col-sm-10">
                                                <input type="text"  onChange={this.onRankCode.bind(this)} value={this.state.rank_code} className="form-control" id="inputEmail3"/>
                                            </div>
                                        </div>
                                        <div className=" row mt-2" >
                                            <div className="col-sm-8">
                                            </div>
                                            <div className="col-sm-4">
                                                <button type="submit" className="btn  btn-dark float-right">Update</button>
                                            </div>
                                        </div>
                                    </form>
                                }
                            </div>


                        </div>
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

export default EditReferralSystem;