import React, {Component, Fragment} from 'react';
import Header from "../components/header";
import SideBar from "../components/Sidebar";
import NoImage from '../asset/image/noimage.png'
import AppUrl from "../AppUrl/AppUrl";
import Axios from 'axios'
import jwt_decode from 'jwt-decode'
import {toast} from "react-toastify";
import Loading from "../components/Loading";
import Footer from "../components/Footer";
import ReactQuill, { Quill, Mixin, Toolbar } from 'react-quill';

class BankView extends Component {
    constructor() {
        super();
        this.state = {
            bank:'',
            acc:'',
            des:'',
            image:'',
            image2:'',
            token:'',
            loading:true
        }
    }
    componentDidMount() {
        const token = localStorage.admintoken
        if(token){
            this.setState({token:token})

        }else{
            // this.props.history.push('login')
            this.props.history.push('payment/create')
        }
    }
    FormSubmit(event){
        const bank = this.state.bank
        const acc = this.state.acc
        const des = this.state.des
        const img = this.state.image
        const token = this.state.token
        const formData = new FormData()
        formData.append('bank',bank)
        formData.append('acc',acc)
        formData.append('des',des)
        formData.append('img',img)
        formData.append('token',token)

        Axios.post(AppUrl.createPayment, formData)
            .then(res=>{
                if(res.data.success){
                    this.props.history.push(`/payment`)
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



    onName(e){
        this.setState({bank:e.target.value})
    }
    onAcc(e){
        this.setState({acc:e.target.value})
    }
    onDesc(content, delta, source, editor){
        this.setState({des:editor.getHTML()})
        console.log(editor.getHTML()); // rich text

    }
    onImage(e){
        this.setState({image:e.target.files[0]})
        var file = e.target.files[0];
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = function (e) {
            this.setState({
                image2: [reader.result]
            })
        }.bind(this);
    }


    render() {
        return (
            <Fragment>
                <Header title="Bank account create"/>
                <div className="content-wrapper">
                    <div className="row m-3  pt-3">
                        <div className="col-md-2 col-12"></div>
                        <div className="col-md-8 col-12">
                            <div className="col-md-12 uprofile col-12 bg-white py-3 mt-2 table-responsive-sm mb-5 ">
                                <h5 className='text-center'>Bank Account  </h5>
                                <br/>
                                    <form onSubmit={this.FormSubmit.bind(this)}>
                                        <div className="form-group row">
                                            <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">Bank Name</label>
                                            <div className="col-sm-10">
                                                <input type="text" required onChange={this.onName.bind(this)} value={this.state.bank} className="form-control" id="inputEmail3"/>
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">Account</label>
                                            <div className="col-sm-10">
                                                <input type="text" required value={this.state.acc} onChange={this.onAcc.bind(this)} className="form-control" id="inputEmail3"/>
                                            </div>
                                        </div>
                                        
                                        <div className="form-group row">
                                            <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">Photo</label>
                                            <div className="col-sm-10">
                                                <input type="file" onChange={this.onImage.bind(this)} className="form-control image" id="inputEmail3"/>
                                            </div>
                                        </div>
                                        <div className="form-group row " style={{height:'200px', marginBottom:'120px'}}>
                                            <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">Description</label>
                                            <div className="col-sm-10">
                                                <ReactQuill value={this.state.des}
                                                           className="h-100" theme={'snow'}  onChange={this.onDesc.bind(this)} />
                                            </div>
                                        </div>

                                        <div className=" row " >
                                            <div className="col-sm-8">
                                            </div>
                                            <div className="col-sm-4">
                                                <button type="submit" className="btn  btn-dark float-right">Submit</button>
                                            </div>
                                        </div>
                                    </form>
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

export default BankView;