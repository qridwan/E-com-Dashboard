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

class Category extends Component {
    constructor() {
        super();
        this.state = {
            data: [],
            parent: [],
            token:'',
            cat_name:'',
            parent_cat:'',
            image:'',
            records: [],
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
            {key: "cat_name", text: "Category Name"},
            {key: "pcategory", text: "Parent Category"},
            {key: "image", text: "Image",
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
                                    <Link to={"/category/update/"+record.id} className="btn btn-primary btn-sm col-md-4 col-lg-4 col-sm-6 m-1  ">
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
            Axios.post(AppUrl.allCategory,myFormData,config)
                .then(res=>{
                    this.setState({records:res.data,loading:false})
                    console.log(res.data+"Category List Get")
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
        Axios.post(AppUrl.PCategoryList,myFormData,config)
            .then(res=>{
                this.setState({data:res.data,loading:false})
                console.log(res.data+"Parent Category List Get")
            })
            .catch(error=>{
                console.log(error)
            })
    }

    onDel(e){
        const cat_id = e.target.name
        const token = this.state.token
        const formData = new FormData()
        formData.append('id',cat_id)
        formData.append('token',token)
        Axios.post(AppUrl.deleteCategory,formData)
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

    onCat(e){
        this.setState({cat_name:e.target.value})
    }
    onParentCat(e){
        this.setState({parent_cat:e.target.value})
    }
    onImage(e){
        this.setState({image:e.target.files[0]})
    }
    onSubmitData(event){
        if(this.state.parent_cat !=""){
            const parent_cat = this.state.parent_cat
            const cat_name = this.state.cat_name
            const image = this.state.image
            const token = this.state.token
            const formData = new FormData()
            formData.append('p_slug',parent_cat)
            formData.append('name',cat_name)
            formData.append('image',image)
            formData.append('token',token)
            Axios.post(AppUrl.createCategory, formData)
                .then(res=>{
                    if(res.data.success){
                        this.componentDidMount()
                        this.setState({cat_name:'',parent_cat:'',image:''})
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
            toast.error("Parent Category is required", {
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

        const pcategory = this.state.data.map(result=>{
            console.log(result)
            return <Fragment>
                <option value={result.slug}>{result.name}</option>
            </Fragment>
        })


        return (
            <Fragment>
                <Header title="Category List"/>
                <div className="content-wrapper">
                        <div className="col-md-4 col-12 p-3">
                            <button type='button' onClick={this.onParentLoad.bind(this)} data-toggle="modal" data-target="#exampleModal" className="btn btn-dark btn-sm" style={{width:'120px',marginLeft:'5px'}}>Add Category</button>
                        </div>
                    <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog"
                         aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                                <div className="modal-body">
                                    <h5 className='text-center'>Create Category </h5>
                                    <br/>
                                    <form onSubmit={this.onSubmitData.bind(this)} >
                                        <div className="form-group row">
                                            <label htmlFor="inputEmail3" className="col-sm-4 col-form-label">Category Name</label>
                                            <div className="col-sm-8">
                                                <input type="text" value={this.state.cat_name} required onChange={this.onCat.bind(this)} className="form-control" id="inputEmail3"/>
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label htmlFor="inputEmail3" className="col-sm-4 col-form-label">Parent Category</label>
                                            <div className="col-sm-8">
                                                <select onChange={this.onParentCat.bind(this)} name='category'
                                                        className="form-control">
                                                    <option selected value=""> Select Parent Category </option>
                                                    {pcategory}
                                                </select>
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label htmlFor="inputEmail3" className="col-sm-4 col-form-label">Image</label>
                                            <div className="col-sm-8">
                                                <input type="file"  onChange={this.onImage.bind(this)}  className="form-control image" id="inputEmail3"/>
                                            </div>
                                        </div>

                                        <div className=" row">
                                            <div className="col-sm-4 col-4">
                                            </div>
                                            <div className="col-sm-4 col-4">
                                                <button type="button" className="btn btn-danger float-right" data-dismiss="modal">Close</button>
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

                    {this.state.loading==true ? <Loading/> :
                        <div className="row m-3 bg-white pt-3">
                            <p className="body-title">Categories</p>
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

export default Category;