import React, {Component, Fragment} from 'react';
import Axios from "axios";
import AppUrl from "../AppUrl/AppUrl";
import {toast} from "react-toastify";
import Header from "../components/header";
import Footer from "../components/Footer";
import SideBar from "../components/Sidebar";
import Loading from "../components/Loading";

class EditCustomerReferral extends Component {
    constructor({match}) {
        super();
        this.state = {
            amount:'', rank_name:'', rank_limit:'', rank_expire:'', rank_code:'', customer_id:'',customer:[],rankList:[],
            rid:match.params.id,customer_name:'', token:'', loading:true
        }
    }

    componentDidMount() {
        const token = localStorage.admintoken
        if(token){
            this.setState({token:token})
            const myFormData = new FormData()
            myFormData.append('token',token)
            myFormData.append('id',this.state.rid)
            const config = {
                headers : {'content-type':'multipart/form-data'}
            }

            Axios.post(AppUrl.customerList,myFormData,config)
                .then(res=>{
                    this.setState({customer:res.data,loading:false})
                    console.log(res.data+"Customer List Get")
                })
                .catch(error=>{
                    console.log(error)
                })
            Axios.post(AppUrl.ReferralSystemList,myFormData,config)
                .then(res=>{
                    this.setState({rankList:res.data})
                    console.log(res.data+"Rank List Get")
                })
                .catch(error=>{
                    console.log(error)
                })

            Axios.post(AppUrl.ReferralCustomerOne,myFormData,config)
                .then(res=>{
                    console.log("Referral "+res.data)
                    this.setState({rank_name:res.data[0]['rank_name'],rank_limit:res.data[0]['rank_limit'],
                        rank_expire:res.data[0]['rank_expire'],customer_id:res.data[0]['customer_id'],rank_code:res.data[0]['rank_code'],
                        customer_name:res.data[0]['name']})
                })
                .catch(error=>{
                    console.log(error)
                })

        }
    }
    FormSubmit(event){
        const token = this.state.token
        const formData = new FormData()
        formData.append('id',this.state.rid)
        formData.append('customer_id',this.state.customer_id)
        formData.append('rank_name',this.state.rank_name)
        formData.append('rank_limit',this.state.rank_limit)
        formData.append('rank_expire',this.state.rank_expire)
        formData.append('rank_code',this.state.rank_code)
        formData.append('token',token)
        if(this.state.customer_id==''){
            toast.error(" Customer name is required", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }else if(this.state.rank_name==""){
            toast.error("Rank name is required", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }else{
            Axios.post(AppUrl.ReferralCustomerUpdate, formData)
                .then(res=>{
                    if(res.data.success){
                        this.props.history.push(`/referral/customer`)
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

        event.preventDefault()

    }



    onName(e){
        this.setState({customer_id:e.target.value})
    }

    onRank(e){
        var id = e.target.value
        const myFormData = new FormData()
        myFormData.append('token',this.state.token)
        myFormData.append('id',id)
        const config = {
            headers : {'content-type':'multipart/form-data'}
        }
        Axios.post(AppUrl.ReferralSystemOne,myFormData,config)
            .then(res=>{
                console.log("Referral "+res.data)
                this.setState({rank_name:res.data[0]['rank_name'],rank_limit:res.data[0]['rank_limit'],
                    rank_expire:res.data[0]['rank_expire'],loading:false})
                var rand =  Math.floor(Math.random() * 100000)
                this.setState({rank_code:rand})
            })
            .catch(error=>{
                console.log(error)
            })
    }


    render() {


        return (
            <Fragment>
                <Header title="Referral Customer update"/>
                <div className="content-wrapper">
                    <div className="row m-3  pt-3">
                        <div className="col-md-2 col-12"></div>
                        <div className="col-md-8 col-12">
                            <div className="col-md-12 uprofile col-12 bg-white py-3 mt-2 table-responsive-sm mb-5 ">
                                <h5 className='text-center'>Edit Referral Customer  </h5>
                                <br/>
                                {this.state.loading==true ? <Loading/> :
                                    <form onSubmit={this.FormSubmit.bind(this)}>
                                        <div className="form-group row">
                                            <label htmlFor="inputEmail3" className="col-sm-2 col-form-label"> Customer  </label>
                                            <div className="col-sm-10">
                                                <select onChange={this.onName.bind(this)}
                                                        className="form-control">
                                                    <option selected value={this.state.customer_id}> {this.state.customer_name} </option>
                                                    {this.state.customer.map(result=>(
                                                        <Fragment>
                                                            <option value={result.id}>{result.name}</option>
                                                        </Fragment>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">Rank</label>
                                            <div className="col-sm-10">
                                                <select onChange={this.onRank.bind(this)}
                                                        className="form-control">
                                                    <option selected value={this.state.id}> {this.state.rank_name} </option>
                                                    {this.state.rankList.map(result=>(
                                                        <Fragment>
                                                            <option value={result.id}>{result.rank_name}</option>
                                                        </Fragment>
                                                    ))}
                                                </select>
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

export default EditCustomerReferral;