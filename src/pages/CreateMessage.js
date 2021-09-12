import React, {Component, Fragment} from 'react';
import Header from "../components/header";
import SideBar from "../components/Sidebar";
import AppUrl from "../AppUrl/AppUrl";
import Axios from 'axios'
import {toast} from "react-toastify";
import Footer from "../components/Footer";
import ReactQuill from 'react-quill';
import Select from 'react-select'

class CreateMessage extends Component {
    constructor() {
        super();
        this.state = {
            title:'',
            des:'',
            uid:'',
            uname:'',
            token:'',
            spm:[],
            type:'',
            customer:[],
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
            Axios.post(AppUrl.spmList,myFormData,config)
                .then(res=>{
                    this.setState({spm:res.data,loading:false})
                    console.log(res.data+"SPM List Get")
                })
                .catch(error=>{
                    console.log(error)
                })
            Axios.post(AppUrl.customerList,myFormData,config)
                .then(res=>{
                    this.setState({customer:res.data,loading:false})
                    console.log(res.data+"Customer List Get")
                })
                .catch(error=>{
                    console.log(error)
                })
        }else{
            this.props.history.push('login')
        }
    }
    FormSubmit(event){
        const title = this.state.title
        const body = this.state.des
        const uid = this.state.uid
        const token = this.state.token
        const formData = new FormData()
        formData.append('title',title)
        formData.append('body',body)
        formData.append('uid',uid)
        formData.append('token',token)

        if(this.state.uid !=""){
            Axios.post(AppUrl.createMessage, formData)
                .then(res=>{
                    if(res.data.success){
                        this.props.history.push(`/message`)
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
        }else{
            toast.error("Select Any Receiver Name This name is required", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }

        event.preventDefault()

    }

    onName(e){
        const uid = e.target.value
        const myFormData = new FormData()
        myFormData.append('token',this.state.token)
        myFormData.append('uid',uid)
        const config = {
            headers : {'content-type':'multipart/form-data'}
        }
        Axios.post(AppUrl.UserprofileGet,myFormData,config)
            .then(res=>{
                console.log("Userdata "+res.data)
                this.setState({uname:res.data[0]['name'], type:res.data[0]['user_type'],loading:false})
            })
            .catch(error=>{
                localStorage.clear()
                console.log(error)
            })
        this.setState({uid:e.target.value})
    }

    onTitle(e){
        this.setState({title:e.target.value})
    }

    onDesc(content, delta, source, editor){
        this.setState({des:editor.getHTML()})
        console.log(editor.getHTML()); // rich text

    }




    render() {
        const spmlist = this.state.spm.map(result=>{
            console.log(result)
            return <Fragment>
                <option value={result.id}>{result.name}</option>
            </Fragment>
        })

        const customerlist = this.state.customer.map(result=>{
            console.log(result)
            return <Fragment>
                <option value={result.id}>{result.name}</option>
            </Fragment>
        })

        const users = this.state.customer.map(result=>(
            [{value:result.id,label:result.name}]
        ))



        return (
            <Fragment>
                <Header title="Create New Message"/>
                <div className="content-wrapper">
                    <div className="row m-3  pt-3">
                        <div className="col-md-2 col-12"></div>
                        <div className="col-md-8 col-12">
                            <div className="col-md-12 uprofile col-12 bg-white py-3 mt-2 table-responsive-sm mb-5 ">
                                <h5 className='text-center'>New Message  </h5>
                                <br/>
                                <form onSubmit={this.FormSubmit.bind(this)}>

                                    <div className="form-group row">
                                        <label htmlFor="inputEmail3" className="col-sm-2 col-form-label"> SPM List </label>
                                        <div className="col-sm-10">
                                            <select onChange={this.onName.bind(this)}
                                                className="form-control">
                                                <option selected value=""> Select From SPM </option>
                                                {spmlist}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label htmlFor="inputEmail3" className="col-sm-2 col-form-label"> Customer List </label>
                                        <div className="col-sm-10">
                                            <select  onChange={this.onName.bind(this)}
                                                className="form-control">
                                                <option selected value=""> Select From Customer </option>
                                                {customerlist}
                                            </select>

                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <label htmlFor="inputEmail3" className="col-sm-2 col-form-label"> Name </label>
                                        <div className="col-sm-10">
                                            <input type="text" readOnly  value={this.state.uname} className="form-control" id="inputEmail3"/>
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label htmlFor="inputEmail3" className="col-sm-2 col-form-label"> User Role </label>
                                        <div className="col-sm-10">
                                            <input type="text"  readOnly  value={this.state.type} className="form-control" id="inputEmail3"/>
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">Subject</label>
                                        <div className="col-sm-10">
                                            <input type="text" required onChange={this.onTitle.bind(this)} value={this.state.title} className="form-control" id="inputEmail3"/>
                                        </div>
                                    </div>

                                    <div className="form-group row " style={{ marginBottom:'120px'}}>
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

export default CreateMessage;