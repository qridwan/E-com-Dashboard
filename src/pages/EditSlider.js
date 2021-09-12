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

class EditSlider extends Component {
    constructor({match}) {
        super();
        this.state = {
            id:match.params.id,
            title:'',
            token:'',
            image:'',
            image2:'',
            loading:true
        }
    }
    componentDidMount() {
        const token = localStorage.admintoken
        if(token){
            this.setState({token:token})
            const myFormData = new FormData()
            const id = this.state.id
            myFormData.append('token',token)
            myFormData.append('id',id)
            const config = {
                headers : {'content-type':'multipart/form-data'}
            }
            Axios.post(AppUrl.oneSlider,myFormData,config)
                .then(res=>{
                    console.log("Userdata "+res.data)
                    this.setState({title:res.data[0]['title'],image:res.data[0]['image'],loading:false})
                })
                .catch(error=>{
                    localStorage.clear()
                    console.log(error)
                })
        }else{
            this.props.history.push('login')
        }
    }
    FormSubmit(event){
        const title = this.state.title
        const image = this.state.image
        const token = this.state.token
        const formData = new FormData()
        formData.append('id',this.state.id)
        formData.append('title',title)
        formData.append('image',image)
        formData.append('token',token)

        Axios.post(AppUrl.updateSlider, formData)
            .then(res=>{
                if(res.data.success){
                    this.props.history.push(`/slider`)
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
        this.setState({title:e.target.value})
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
                <Header title="Update Slider"/>
                <div className="content-wrapper">
                    <div className="row m-3  pt-3">
                        <div className="col-md-2 col-12"></div>
                        <div className="col-md-8 col-12">
                            <div className="col-md-12 uprofile col-12 bg-white py-3 mt-2 table-responsive-sm mb-5 ">
                                <h5 className='text-center'>Edit Slider Image  </h5>
                                <br/>
                                <form onSubmit={this.FormSubmit.bind(this)}>
                                    <div className="form-group row">
                                        <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">Title</label>
                                        <div className="col-sm-10">
                                            <input type="text" required onChange={this.onName.bind(this)} value={this.state.title} className="form-control" id="inputEmail3"/>
                                        </div>
                                    </div>


                                    <div className="form-group row">
                                        <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">Photo</label>
                                        <div className="col-sm-10">
                                            <input type="file" onChange={this.onImage.bind(this)} className="form-control image" id="inputEmail3"/>
                                        </div>
                                    </div>

                                    <div className=" row " >
                                        <div className="col-sm-8">
                                        </div>
                                        <div className="col-sm-4">
                                            <button type="submit" className="btn  btn-dark float-right">Update</button>
                                        </div>
                                    </div>
                                    <div className="col-sm-12">
                                        {this.state.image2?<img id="showImage" style={{height:'200px',width:'250px'}} src={this.state.image2} />:this.state.image ?<img  style={{height:'200px',width:'250px'}} src={AppUrl.photoUrl+this.state.image}/> :
                                            <img style={{height:'200px',width:'250px'}} src={NoImage}/>
                                        }
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

export default EditSlider;