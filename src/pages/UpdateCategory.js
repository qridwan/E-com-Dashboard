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
class UpdateCategory extends Component {
    constructor({match}) {
        super();
        this.state = {
            id:match.params.id,
            data: [],
            parent: [],
            token:'',
            cat_name:'',
            parent_cat:'',
            image:'',
            image2:'',
            loading:true
        }
    }
    componentDidMount() {
        const token = localStorage.admintoken
        if(token){
            this.setState({token:token})
            const id = this.state.id
            const myFormData = new FormData()
            myFormData.append('token',token)
            myFormData.append('id',id)
            const config = {
                headers : {'content-type':'multipart/form-data'}
            }
            Axios.post(AppUrl.oneCategory,myFormData,config)
                .then(res=>{
                    this.setState({cat_name:res.data[0]['cat_name'],parent_cat:res.data[0]['p_slug'],image:res.data[0]['image'],loading:false})
                    console.log(res.data+"Parent Category List Get")
                })
                .catch(error=>{
                    console.log(error)
                })
            Axios.post(AppUrl.PCategoryList,myFormData,config)
                .then(res=>{
                    this.setState({data:res.data})
                    console.log(res.data+"Parent Category List Get")
                })
                .catch(error=>{
                    console.log(error)
                })
        }else{
            this.props.history.push('login')
        }
    }
    updateFormSubmit(event){
        const cat_name = this.state.cat_name
        const parent_cat = this.state.parent_cat
        const image = this.state.image
        const id = this.state.id
        const token = this.state.token
        const formData = new FormData()
        formData.append('id',id)
        formData.append('name',cat_name)
        formData.append('p_slug',parent_cat)
        formData.append('image',image)
        formData.append('token',token)

        Axios.post(AppUrl.updateCategory, formData)
            .then(res=>{
                if(res.data.success){
                    this.props.history.push(`/category`)
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


    onCat(e){
        this.setState({cat_name:e.target.value})
    }
    onParentCat(e){
        this.setState({parent_cat:e.target.value})
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
        const pcategory = this.state.data.map(result=>{
            console.log(result)
            return <Fragment>
                {this.state.parent_cat==result.slug ? <option selected value={result.slug}>{result.name}</option> :''}
                <option  value={result.slug}>{result.name}</option>
            </Fragment>
        })
        return (
            <Fragment>
                <Header title="Category Update"/>
                <div className="content-wrapper">
                    <div className="row m-3  pt-3">
                        <div className="col-md-2 col-12"></div>
                        <div className="col-md-8 col-12">
                            <div className="col-md-12 uprofile col-12 bg-white py-3 mt-2 table-responsive-sm mb-5 ">
                                <h5 className='text-center'>Category Update </h5>
                                <br/>
                                {this.state.loading==true?<Loading/>:
                                    <form onSubmit={this.updateFormSubmit.bind(this)}>
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
                                                    {pcategory}
                                                </select>
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label htmlFor="inputEmail3" className="col-sm-4 col-form-label">Image</label>
                                            <div className="col-sm-8">
                                                <input type="file" onChange={this.onImage.bind(this)} className="form-control image" id="inputEmail3"/>
                                            </div>
                                            <div className="col-sm-6">
                                                {this.state.image2?<img id="showImage" style={{height:'100px',width:'100'}} src={this.state.image2} />:this.state.image ?<img  style={{height:'100px',width:'100'}} src={AppUrl.photoUrl+this.state.image}/> :
                                                    <img style={{height:'100px',width:'100'}} src={NoImage}/>
                                                }
                                            </div>
                                        </div>
                                        <div className=" row">
                                            <div className="col-sm-8">
                                            </div>
                                            <div className="col-sm-4">
                                                <button type="submit" className="btn  btn-dark float-right">Update</button>
                                            </div>
                                        </div>
                                    </form>
                                }
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

export default UpdateCategory;