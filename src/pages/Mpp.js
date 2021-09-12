import React, {Component, Fragment} from 'react';
import {Link} from "react-router-dom";
import Axios from "axios"
import AppUrl from "../AppUrl/AppUrl";
import ReactDatatable from '@ashvin27/react-datatable';
import NoImage from '../asset/image/noimage.png'
import {toast} from "react-toastify";
import Loading from "../components/Loading";
import ReactHtmlParser from 'react-html-parser';
import moment from "moment";

class Mpp extends Component {
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
            {key: "title", text: "Product Name"},
            {key: "cat_name", text: "Category"},
            {key: "p_name", text: "Producer Name"},
            {key: "des", text: "Description",
                cell: (record) => {
                    return(
                        <Fragment>
                            { ReactHtmlParser(record.des) }
                        </Fragment>
                    )
                }
            },
            {key: "img1", text: "Thumbnail",
                cell: record => {
                    return(
                        <Fragment>
                            {record.img1?<img className="img-responsive" style={{height:'40px',width:'60px'}} src={AppUrl.photoUrl+record.img1} />
                                :<img className="img-responsive" style={{height:'40px',width:'60px'}} src={NoImage} />}
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
                            <div className="row" style={{width:'130px'}}>
                                <div className="col-md-12 col-sm-12 col-lg-12">
                                    <Link to={"/products/edit/"+record.id}  className="btn btn-primary btn-sm col-md-4 col-lg-4 col-sm-6 m-1  ">
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
            Axios.post(AppUrl.productsListMpp,myFormData,config)
                .then(res=>{
                    this.setState({records:res.data,loading:false})
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
        Axios.post(AppUrl.deleteProducts,formData)
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
        if(this.state.loading==true){
            return (
                <Loading/>
            )
        }else{
            return (
                <Fragment>
                    <div className="row m-3 bg-white pt-3">
                        <p className="body-title">Most Popular Products</p>
                        <div className="col-md-12 col-12 bg-white py-3 mt-2 table-responsive-sm mb-5 ">
                            <ReactDatatable
                                config={this.config}
                                records={this.state.records}
                                columns={this.columns}/>
                        </div>
                    </div>
                </Fragment>
            );
        }
    }
}

export default Mpp;