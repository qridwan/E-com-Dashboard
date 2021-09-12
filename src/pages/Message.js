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
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import ClientMessage from "./ClientMessage";
import ReviewMessage from "./ReviewMessage";
import moment from "moment";

class Message extends Component {
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
            {key: "name", text: "Name"},
            {key: "type", text: "User Role"},
            {key: "title", text: "Subject"},
            {key: "body", text: "Description",
                cell: (record) => {
                    return(
                        <Fragment>
                            { ReactHtmlParser(record.body) }
                        </Fragment>
                    )
                }
            },
            {key: "date", text: "Created Date",
                cell: record => {
                    return(
                        <Fragment>
                            {moment(record.date).format("Do  MMMM YYYY")}
                        </Fragment>
                    )
                }
            },
            {key: "action", text: "Action",
                cell: record => {
                    return (
                        <Fragment>
                            <div className="row">
                                <div className="col-md-12 col-sm-12 col-lg-12">
                                    <Link to={"/message/edit/"+record.id}  className="btn btn-primary btn-sm col-md-4 col-lg-4 col-sm-6 m-1  ">
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
            Axios.post(AppUrl.MessageList,myFormData,config)
                .then(res=>{
                    this.setState({records:res.data,loading:false})
                    console.log(res.data+"Message List Data Get")
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
        Axios.post(AppUrl.deleteMessage,formData)
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
                <Header title="Message List"/>
                <div className="content-wrapper">
                    <Tabs >

                        <div className="col-md-12 col-12 mr-5 bg-white">
                            <TabList>
                                <Tab>Message </Tab>
                                <Tab>Support Message</Tab>
                                <Tab> Review Message</Tab>
                            </TabList>
                        </div>
                        <TabPanel>
                            <div className="col-md-4 col-12 p-3">
                                <Link to="/message/create"
                                      className="btn btn-dark btn-sm" style={{width:'120px',marginLeft:'5px'}}>Add Message</Link>
                            </div>
                            {this.state.loading==true ? <Loading/> :
                                <div className="row m-3 bg-white pt-3">
                                    <p className="body-title">Notification Message</p>
                                    <div className="col-md-12 col-12 bg-white py-3 mt-2 table-responsive-sm mb-5 ">
                                        <ReactDatatable
                                            config={this.config}
                                            records={this.state.records}
                                            columns={this.columns}/>
                                    </div>
                                </div>
                            }
                        </TabPanel>
                        <TabPanel>
                            <ClientMessage/>
                        </TabPanel>
                        <TabPanel>
                            <ReviewMessage/>
                        </TabPanel>
                    </Tabs>


                    <Footer/>
                </div>
                <SideBar/>
            </Fragment>
        );
    }
}

export default Message;