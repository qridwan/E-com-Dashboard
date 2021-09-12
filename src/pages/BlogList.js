import React, {Component, Fragment} from 'react';
import Header from "../components/header";
import SideBar from "../components/Sidebar";
import {Link} from "react-router-dom";
import Axios from "axios"
import AppUrl from "../AppUrl/AppUrl";
import ReactDatatable from '@ashvin27/react-datatable';
import NoImage from '../asset/image/noimage.png'
import {toast} from "react-toastify";
import Footer from "../components/Footer";
import Loading from "../components/Loading";
import ReactHtmlParser from 'react-html-parser';


class BlogList extends Component {
    constructor() {
        super();
        this.state = {
            data: [],
            token:'',
            id:'',
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

            {key: "title", text: "Title"},
            {key: "body", text: "Description",
                cell: (record) => {
                    return(
                        <Fragment>
                            { ReactHtmlParser(record.body) }
                        </Fragment>
                    )
                }
            },
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
                                    <Link to={"/blog/edit/"+record.id}  className="btn btn-primary btn-sm col-md-4 col-lg-4 col-sm-6 m-1  ">
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
            Axios.post(AppUrl.BlogList,myFormData,config)
                .then(res=>{
                    this.setState({records:res.data,loading:false})
                    console.log(res.data+"Blog List Data Get")
                })
                .catch(error=>{
                    console.log(error)
                })
        }else{
            this.props.history.push('login')
        }
    }



    onDel(e){
        const id = e.target.name
        const token = this.state.token
        const formData = new FormData()
        formData.append('id',id)
        formData.append('token',token)
        Axios.post(AppUrl.deleteBlog,formData)
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
    onClose(e) {
        this.setState({status: '', id: ''})
    }

    render() {

        return (
            <Fragment>
                <Header title="Blog List"/>
                <div className="content-wrapper">
                    <div className="col-md-4 col-12 p-3">
                        <Link to="/blog/create"
                              className="btn btn-dark btn-sm" style={{width:'120px',marginLeft:'5px'}}>Add New Blog</Link>
                    </div>
                    {this.state.loading==true ? <Loading/> :
                        <div className="row m-3 bg-white pt-3">
                            <p className="body-title">Blog</p>
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

export default BlogList;