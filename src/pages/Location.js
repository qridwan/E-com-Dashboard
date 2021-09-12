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

class Location extends Component {
    constructor() {
        super();
        this.state = {
            data: [],
            parent: [],
            token:'',
            location:'',
            address:'',
            spm:'',
            spm_name:'',
            id:'',
            records: [],
            loading:true,
            loading2:true
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
            {key: "location", text: "City Name"},
            {key: "address", text: "SPM Location"},
            {key: "spm_name", text: "SPM Name"},
            {key: "phone", text: "SPM Phone"},
            {key: "image", text: "SPM Photo",
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
                            <div className="row">
                                <div className="col-md-12 col-sm-12 col-lg-12">
                                    <button onClick={this.onEdit.bind(this)} name={record.id} data-toggle="modal" data-target="#exampleModalEdit" className="btn btn-primary btn-sm col-md-4 col-lg-4 col-sm-6 m-1  ">
                                        <i className="fa fa-edit"></i>
                                    </button>
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
            Axios.post(AppUrl.locationList,myFormData,config)
                .then(res=>{
                    this.setState({records:res.data,loading:false})
                    console.log(res.data+"Location List Get")
                })
                .catch(error=>{
                    console.log(error)
                })

        }else{
            this.props.history.push('login')
        }
    }

    onParentLoad(e){
        const myFormData = new FormData()
        myFormData.append('token',this.state.token)
        const config = {
            headers : {'content-type':'multipart/form-data'}
        }
        Axios.post(AppUrl.spmList,myFormData,config)
            .then(res=>{
                this.setState({data:res.data,loading:false})
                console.log(res.data+"SPM List Get")
            })
            .catch(error=>{
                console.log(error)
            })
    }

    onEdit(e){
        const id = e.target.name
        const token = this.state.token
        const formData = new FormData()
        formData.append('id',id)
        formData.append('token',token)
        Axios.post(AppUrl.oneLocation,formData)
            .then(res=>{
                this.componentDidMount()
                this.setState({id:res.data[0]['id'],spm:res.data[0]['spm_id'],spm_name:res.data[0]['spm_name'],
                    address:res.data[0]['address'],location:res.data[0]['location'],loading2:false})

            })
            .catch(err=>{
                console.log(err)
            })
        Axios.post(AppUrl.spmList,formData)
            .then(res=>{
                this.setState({data:res.data,loading:false})
                console.log(res.data+"SPM List Get")
            })
            .catch(error=>{
                console.log(error)
            })
    }

    onDel(e){
        const id = e.target.name
        const token = this.state.token
        const formData = new FormData()
        formData.append('id',id)
        formData.append('token',token)
        Axios.post(AppUrl.deleteLocation,formData)
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

    onLocation(e){
        this.setState({location:e.target.value})
    }
    onAddress(e){
        this.setState({address:e.target.value})
    }
    onSpm(e){
        this.setState({spm:e.target.value})
    }
    onSubmitData(event){
        if(this.state.spm !=""){
            const location = this.state.location
            const address = this.state.address
            const spm = this.state.spm
            const token = this.state.token
            const formData = new FormData()
            formData.append('spm_id',spm)
            formData.append('address',address)
            formData.append('location',location)
            formData.append('token',token)
            Axios.post(AppUrl.createLocation, formData)
                .then(res=>{
                    if(res.data.success){
                        this.componentDidMount()
                        this.setState({location:'',address:'',spm:'',spm_name:'',id:''})
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
            toast.error("Service Point Manager is required", {
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

    onClose(e){
        this.setState({location:'',address:'',spm:'',spm_name:'',id:'',loading2:true})
    }
    onUpdateData(event){
        if(this.state.spm !=""){
            const id = this.state.id
            const location = this.state.location
            const address = this.state.address
            const spm = this.state.spm
            const token = this.state.token
            const formData = new FormData()
            formData.append('id',id)
            formData.append('spm_id',spm)
            formData.append('address',address)
            formData.append('location',location)
            formData.append('token',token)
            Axios.post(AppUrl.updateLocation, formData)
                .then(res=>{
                    if(res.data.success){
                        this.componentDidMount()
                        this.setState({location:'',address:'',spm:'',spm_name:'',id:''})
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
            toast.error("Service Point Manager is required", {
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



    render() {

        const spmlist = this.state.data.map(result=>{
            console.log(result)
            return <Fragment>
                <option value={result.id}>{result.name}</option>
            </Fragment>
        })


        return (
            <Fragment>
                <Header title="SPM Location List"/>
                <div className="content-wrapper">
                    <div className="col-md-4 col-12 p-3">
                        <button type='button' onClick={this.onParentLoad.bind(this)} data-toggle="modal" data-target="#exampleModal"
                                className="btn btn-dark btn-sm" style={{width:'120px',marginLeft:'5px'}}>Add Location</button>
                    </div>
                    <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog"
                         aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                                <div className="modal-body">
                                    <h5 className='text-center'>Create Location </h5>
                                    <br/>
                                    <form onSubmit={this.onSubmitData.bind(this)} >
                                        <div className="form-group row">
                                            <label htmlFor="inputEmail3" className="col-sm-4 col-form-label">City Name</label>
                                            <div className="col-sm-8">
                                        
                                                               <select onChange={this.onLocation.bind(this)}
                                                                className="form-control">
                                                            <option selected value=""> Choose your City </option>
                                                            <option value="Dhaka"> Dhaka  </option>
                                                            <option value="Rajshahi"> Rajshahi  </option>
                                                            <option value="Khulna"> Khulna  </option>
                                                            <option value="Chittagong"> Chittagong  </option>
                                                            <option value="Rangpur"> Rangpur  </option>
                                                            <option value="Sylhet"> Sylhet  </option>
                                                            <option value="Barisal"> Barisal  </option>
                                                            <option value="Mymensignh"> Mymensignh  </option>
                                                        </select>
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label htmlFor="inputEmail3" className="col-sm-4 col-form-label"> Address </label>
                                            <div className="col-sm-8">
                                                <input type="text" value={this.state.address} required onChange={this.onAddress.bind(this)}  className="form-control " id="inputEmail3"/>
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label htmlFor="inputEmail3" className="col-sm-4 col-form-label">Service Point Manager </label>
                                            <div className="col-sm-8">
                                                <select onChange={this.onSpm.bind(this)}
                                                        className="form-control">
                                                    <option selected value=""> Select SPM </option>
                                                    {spmlist}
                                                </select>
                                            </div>
                                        </div>

                                        <div className=" row">
                                            <div className="col-sm-4 col-4">
                                            </div>
                                            <div className="col-sm-4 col-4">
                                                <button type="button" onClick={this.onClose.bind(this)} className="btn btn-danger float-right" data-dismiss="modal">Close</button>
                                            </div>
                                            <div className="col-sm-4 col-4">
                                                <button type="submit" className="btn  btn-dark float-right"> Submit </button>
                                            </div>

                                        </div>
                                    </form>

                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="modal fade" id="exampleModalEdit" tabIndex="-1" role="dialog"
                         aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                                <div className="modal-body">
                                    <h5 className='text-center'>Edit Location </h5>
                                    <br/>

                                    {this.state.loading2==true?<Loading/>:
                                        <form onSubmit={this.onUpdateData.bind(this)} >
                                            <div className="form-group row">
                                                <label htmlFor="inputEmail3" className="col-sm-4 col-form-label">City Name</label>
                                                <div className="col-sm-8">
                                                    <input type="text" value={this.state.location} required onChange={this.onLocation.bind(this)} className="form-control" id="inputEmail3"/>
                                                </div>
                                            </div>
                                            <div className="form-group row">
                                                <label htmlFor="inputEmail3" className="col-sm-4 col-form-label"> Address </label>
                                                <div className="col-sm-8">
                                                    <input type="text" value={this.state.address} required onChange={this.onAddress.bind(this)}  className="form-control " id="inputEmail3"/>
                                                </div>
                                            </div>
                                            <div className="form-group row">
                                                <label htmlFor="inputEmail3" className="col-sm-4 col-form-label">Service Point Manager </label>
                                                <div className="col-sm-8">
                                                    <select onChange={this.onSpm.bind(this)}
                                                            className="form-control">
                                                        <option selected value=""> {this.state.spm_name} </option>
                                                        {spmlist}
                                                    </select>
                                                </div>
                                            </div>

                                            <div className=" row">
                                                <div className="col-sm-4 col-4">
                                                </div>
                                                <div className="col-sm-4 col-4">
                                                    <button type="button" onClick={this.onClose.bind(this)} className="btn btn-danger float-right" data-dismiss="modal">Close</button>
                                                </div>
                                                <div className="col-sm-4 col-4">
                                                    <button type="submit" className="btn  btn-dark float-right"> Update </button>
                                                </div>

                                            </div>
                                        </form>
                                    }

                                </div>
                            </div>
                        </div>
                    </div>
                    {this.state.loading==true ? <Loading/> :
                        <div className="row m-3 bg-white pt-3">
                            <p className="body-title">SPM Location</p>
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

export default Location;