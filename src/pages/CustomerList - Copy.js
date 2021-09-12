import React, {Component, Fragment} from 'react';
import Header from "../components/header";
import SideBar from "../components/Sidebar";
import Logo from '../asset/image/logo.png'
import {Link} from "react-router-dom";
import jwt_decode from 'jwt-decode'
import Axios from "axios"
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import AppUrl from "../AppUrl/AppUrl";



class CustomerList extends Component {
    constructor() {
        super();
        this.state = {
            data: [],
            token:'',
            uid:'',
            loading:true
        }
        this.imgCellFormat = this.imgCellFormat.bind(this)
        this.actionCellFormat = this.actionCellFormat.bind(this)
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
            Axios.post(AppUrl.alluser,myFormData,config)
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

    imgCellFormat(cell,row){
        return(
            <img style={{height:'50px'}} src={cell}/>
        )
    }

    actionCellFormat(cell,row){
        return(
            <Fragment>
                <Link to={"/"+cell} className="btn btn-primary btn-sm col-md-3 m-1 col-6">
                    <i className="fa fa-edit"></i>
                </Link>
                <Link to={"/"+cell} className="btn btn-primary btn-sm col-md-3 m-1 col-6 ">
                    <i className="fa fa-key"></i>
                </Link>
                <button
                    onClick={this.onDel.bind(this)}  name={cell} className="btn btn-danger btn-sm col-md-3 m-1 col-6 ">
                    <i className="fa fa-trash"></i>
                </button>
            </Fragment>
        )
    }
    onDel(e) {
        const user_id = e.target.name
        alert(user_id)
    }
    render() {
        const data = [{"id":10,"name":"ansarul","roll":101},
            {"id":1,"name":"arif","roll":102,"img":Logo},
            {"id":2,"name":"abdullah","roll":103,"img":Logo},
            {"id":3,"name":"ansarul","roll":104,"img":"https://bestsolution.me/static/images/xdyaCgUhM24BzA.jpg"},
            {"id":4,"name":"arif","roll":105,"img":"https://bestsolution.me/static/images/xdyaCgUhM24BzA.jpg"},
            {"id":1,"name":"arif","roll":106,"img":Logo},
            {"id":2,"name":"abdullah","roll":107,"img":Logo},
            {"id":3,"name":"ansarul","roll":108,"img":"https://bestsolution.me/static/images/xdyaCgUhM24BzA.jpg"},
            {"id":4,"name":"arif","roll":109,"img":"https://bestsolution.me/static/images/xdyaCgUhM24BzA.jpg"},
            {"id":1,"name":"arif","roll":110,"img":Logo},
            {"id":2,"name":"abdullah","roll":111,"img":Logo},
            {"id":3,"name":"ansarul","roll":112,"img":"https://bestsolution.me/static/images/xdyaCgUhM24BzA.jpg"},
            {"id":4,"name":"arif","roll":113,"img":"https://bestsolution.me/static/images/xdyaCgUhM24BzA.jpg"},
        ];

        const columns = [
            {dataField: 'name', text: 'Full Name'},
            {dataField: 'roll', text: 'Roll Name'},
            {dataField: 'img', text: 'Image',formatter:this.imgCellFormat},
            {dataField: 'id', text: 'Action',formatter:this.actionCellFormat}

        ];


        return (
            <Fragment>
                <Header title="Customer List"/>
                <div className="content-wrapper">
                    <div className="content-header">
                        <div className="container-fluid">
                            <div className="row mb-2">
                                <div className="col-sm-6">
                                    <h1 className="m-0">Customer List</h1>
                                </div>
                                <div className="col-sm-6">
                                    <ol className="breadcrumb float-sm-right">
                                        <li className="breadcrumb-item"><a >Home</a></li>
                                        <li className="breadcrumb-item active">Dashboard</li>
                                    </ol>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/*<BootstrapTable keyField='id' data={ data } columns={ columns } pagination={ paginationFactory() } /> */}

                    <div className="row p-3 bg-white pt-3">
                        <div className="col-md-12 col-12 ">
                            <BootstrapTable keyField="id" data={ data } columns={ columns } pagination={ paginationFactory() } />
                        </div>
                    </div>
                </div>
                <SideBar/>
            </Fragment>
        );
    }
}

export default CustomerList;