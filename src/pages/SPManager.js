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

class SPManager extends Component {
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
            {key: "name", text: "Name"},
            {key: "email", text: "Email"},
            {key: "phone", text: "Mobile"},
            {key: "user_type", text: "Role"},
            {key: "status", text: "Status",
                cell: (record) => {
                    return(
                        <Fragment>
                            { record.status == "Verified" ? <p className="btn-sm btn-success">{record.status}</p>:<p className="btn-sm btn-danger">{record.status}</p>}
                        </Fragment>
                    )
                }
            },
            {key: "address", text: "Address"},
            {key: "img", text: "Image",
                cell: record => {
                    return(
                        <Fragment>
                            {record.image?<img className="img-responsive" style={{height:'40px',width:'60px'}} src={AppUrl.photoUrl+record.image} />
                                :<img className="img-responsive" style={{height:'40px',width:'60px'}} src={NoImage} />}
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
                                    <Link to={"/spm/details/"+record.id} className="btn btn-primary btn-sm col-md-11 col-11 m-1  ">
                                        Details
                                    </Link>
                                    <Link to={"/profile/"+record.id} className="btn btn-primary btn-sm col-md-5  col-5 m-1  ">
                                        <i className="fa fa-edit"></i>
                                    </Link>

                                    <button
                                        onClick={this.onDel.bind(this)}  name={record.id} className="btn btn-danger btn-sm  col-5 col-md-5 m-1  ">
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
            Axios.post(AppUrl.spmList,myFormData,config)
                .then(res=>{
                    this.setState({records:res.data,loading:false})
                    console.log(res.data+"Data Get")
                })
                .catch(error=>{
                    console.log(error)
                })
        }else{
            this.props.history.push('login')
        }
    }

    onDel(e){
        const user_id = e.target.name
        const token = this.state.token
        const formData = new FormData()
        formData.append('uid',user_id)
        formData.append('token',token)
        Axios.post(AppUrl.DeleteUser,formData)
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
                <Header title="Service Point List"/>
                <div className="content-wrapper">
                    {this.state.loading==true ? <Loading/> :
                        <div className="row m-3 bg-white pt-3">
                            <p className="body-title">Service Point Manager</p>
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

export default SPManager;