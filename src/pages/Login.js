import React, {Component, Fragment} from 'react';
import {Link,withRouter} from "react-router-dom";
import Axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import AppUrl from "../AppUrl/AppUrl";

class Login extends Component {
    constructor() {
        super();
        this.state={
            phone:'',
            password:''
        }
        this.refreshNow=this.refreshNow.bind(this)
    }
    componentDidMount() {
        if(localStorage.admintoken){
            this.props.history.push(`/`)
        }
    }
    refreshNow(){

    }
    onUsername(e){
        this.setState({phone:e.target.value})
    }
    onPassword(e){
        this.setState({password:e.target.value})
    }
    onSubmitForm(event){

        if(this.state.phone==""){

        }
        if(this.state.password==""){

        }
        let config={
            //headers:{ 'content-type':'multipart/form-data'}
            headers : { 'Content-Type':'application/json'}
        }

        let data = {
            phone:this.state.phone,
            password: this.state.password
        }
        Axios.post(AppUrl.login,data,config)
            .then(res=>{
                if(res.data.success){
                    this.setState({success:res.data.success})
                    localStorage.setItem('admintoken', res.data.token)
                    this.props.history.push(`/`)
                    toast.success(res.data.success, {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });

                }
                if(res.data.error){
                    this.setState({phone:'',password:''})
                    toast.error(res.data.error, {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                }

            })
            .catch(erorr=>{
                console.log(erorr)
            })
        event.preventDefault()
    }

    render() {
        return (
            <Fragment>
                <title>Login Admin</title>
                <div className="" style={{paddingTop:'100px'}}>
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
                    <div className="loginColumns " >
                        <div className="row " >
                            <div className="col-md-2">
                            </div>
                            <div className="col-md-8">

                                <div className="ibox-content">
                                    <h3 className="my-3 ">Login</h3>
                                    <form onSubmit={this.onSubmitForm.bind(this)} className="m-t" role="form" >
                                        <div className="form-group">
                                            <input type="text" onChange={this.onUsername.bind(this)} value={this.state.phone}  className="form-control" placeholder="Enter phone number" required/>

                                        </div>
                                        <div className="form-group">
                                            <input type="password" onChange={this.onPassword.bind(this)} value={this.state.password}  className="form-control" placeholder="Enter password"
                                                   required/>
                                        </div>
                                        <button type="submit" onClick={this.refreshNow} className="btn btn-primary full-width ">Login
                                        </button>

                                    </form>
                                </div>
                            </div>
                            <div className="col-md-2">
                            </div>
                        </div>
                    </div>

                </div>
            </Fragment>
        );
    }
}

export default withRouter(Login);