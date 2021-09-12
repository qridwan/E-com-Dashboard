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

class EditSettings extends Component {
    constructor() {
        super();
        this.state = {
            id:'',h_customer:'',h_spm:'',h_supplier:'',products:'',	our_spm:'',category:'',
            h_delivery:'',refund:'',privacy:'',termscon:'',footer:'',heading:'',update_info:'',overview:'',opportonity:'',
            loading:true
        }
    }

    componentDidMount() {
        const token = localStorage.admintoken
        if(token){
            this.setState({token:token})
            const myFormData = new FormData()
            myFormData.append('id',this.state.id)
            myFormData.append('token',token)
            const config = {
                headers : {'content-type':'multipart/form-data'}
            }

            Axios.post(AppUrl.oneSettings,myFormData,config)
                .then(res=>{
                    this.setState({h_customer:res.data[0]['h_customer'],h_spm:res.data[0]['h_spm'],h_supplier:res.data[0]['h_supplier'],
                        products:res.data[0]['products'],category:res.data[0]['category'],our_spm:res.data[0]['our_spm'],
                        h_delivery:res.data[0]['h_delivery'],refund:res.data[0]['refund'],privacy:res.data[0]['privacy'],termscon:res.data[0]['terms'],
                        overview:res.data[0]['overview'],update_info:res.data[0]['update_info'],footer:res.data[0]['footer'],opportonity:res.data[0]['opportonity'],
                        heading:res.data[0]['heading'],loading:false})
                })
                .catch(error=>{
                    console.log(error)
                })
        }else{
            this.props.history.push('login')
        }
    }
    FormSubmit(event){
        const token = this.state.token
        const formData = new FormData()
        formData.append('h_customer',this.state.h_customer)
        formData.append('h_supplier',this.state.h_supplier)
        formData.append('h_spm',this.state.h_spm)
        formData.append('products',this.state.products)
        formData.append('category',this.state.category)
        formData.append('our_spm',this.state.our_spm)
        formData.append('h_delivery',this.state.h_delivery)
        formData.append('refund',this.state.refund)
        formData.append('privacy',this.state.privacy)
        formData.append('terms',this.state.termscon)
        formData.append('footer',this.state.footer)
        formData.append('heading',this.state.heading)
        formData.append('overview',this.state.overview)
        formData.append('update_info',this.state.update_info)
        formData.append('opportonity',this.state.opportonity)
        formData.append('token',token)

        Axios.post(AppUrl.updateSettings, formData)
            .then(res=>{
                if(res.data.success){
                    this.props.history.push(`/settings`)
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

    onOverview(content, delta, source, editor){
        this.setState({overview:editor.getHTML()})

    }
    onUpdate_info(content, delta, source, editor){
        this.setState({update_info:editor.getHTML()})

    }
    onOpportonity(content, delta, source, editor){
        this.setState({opportonity:editor.getHTML()})

    }
    onPrivacy(content, delta, source, editor){
        this.setState({privacy:editor.getHTML()})

    }

    onRefund(content, delta, source, editor){
        this.setState({refund:editor.getHTML()})

    }

    onTermsCondition(content, delta, source, editor){
        this.setState({termscon:editor.getHTML()})

    }

    onCutomer(e){
        this.setState({h_customer:e.target.value})
    }
    onSpm(e){
        this.setState({h_spm:e.target.value})
    }
    onSupplier(e){
        this.setState({h_supplier:e.target.value})
    }
    onProducts(e){
        this.setState({products:e.target.value})
    }
    onOur_spm(e){
        this.setState({our_spm:e.target.value})
    }
    onCategory(e){
        this.setState({category:e.target.value})
    }
    onDelivery(e){
        this.setState({h_delivery:e.target.value})
    }

    onFooter(e){
        this.setState({footer:e.target.value})
    }
    onHeading(e){
        this.setState({heading:e.target.value})
    }

    render() {


        return (
            <Fragment>
                <Header title="Edit settings"/>
                <div className="content-wrapper">
                    <div className="row m-3  pt-3">
                        <div className="col-md-2 col-12"></div>
                        <div className="col-md-8 col-12">
                            <div className="col-md-12 uprofile col-12 bg-white py-3 mt-2 table-responsive-sm mb-5 ">
                                <h5 className='text-center'>Edit Settings  </h5>
                                <br/>
                                {this.state.loading==true ? <Loading/> :
                                    <form onSubmit={this.FormSubmit.bind(this)}>

                                        <div className="form-group row">
                                            <label htmlFor="inputEmail3" className="col-sm-2 col-form-label"> Happy Customer </label>
                                            <div className="col-sm-10">
                                                <input type="text" required  value={this.state.h_customer} onChange={this.onCutomer.bind(this)} className="form-control" id="inputEmail3"/>
                                            </div>
                                        </div>

                                        <div className="form-group row">
                                            <label htmlFor="inputEmail3" className="col-sm-2 col-form-label"> Happy SPM </label>
                                            <div className="col-sm-10">
                                                <input type="text" required  value={this.state.h_spm} onChange={this.onSpm.bind(this)} className="form-control" id="inputEmail3"/>
                                            </div>
                                        </div>

                                        <div className="form-group row">
                                            <label htmlFor="inputEmail3" className="col-sm-2 col-form-label"> Happy Supplier </label>
                                            <div className="col-sm-10">
                                                <input type="text" required  value={this.state.h_supplier} onChange={this.onSupplier.bind(this)} className="form-control" id="inputEmail3"/>
                                            </div>
                                        </div>

                                        <div className="form-group row">
                                            <label htmlFor="inputEmail3" className="col-sm-2 col-form-label"> Products </label>
                                            <div className="col-sm-10">
                                                <input type="text" required  value={this.state.products} onChange={this.onProducts.bind(this)} className="form-control" id="inputEmail3"/>
                                            </div>
                                        </div>

                                        <div className="form-group row">
                                            <label htmlFor="inputEmail3" className="col-sm-2 col-form-label"> Category </label>
                                            <div className="col-sm-10">
                                                <input type="text"  required value={this.state.category} onChange={this.onCategory.bind(this)} className="form-control" id="inputEmail3"/>
                                            </div>
                                        </div>


                                        <div className="form-group row">
                                            <label htmlFor="inputEmail3" className="col-sm-2 col-form-label"> Our Service Point </label>
                                            <div className="col-sm-10">
                                                <input type="text" required  value={this.state.our_spm} onChange={this.onOur_spm.bind(this)} className="form-control" id="inputEmail3"/>
                                            </div>
                                        </div>

                                        <div className="form-group row">
                                            <label htmlFor="inputEmail3" className="col-sm-2 col-form-label"> Happy Delivery </label>
                                            <div className="col-sm-10">
                                                <input type="text"  required value={this.state.h_delivery} onChange={this.onDelivery.bind(this)} className="form-control" id="inputEmail3"/>
                                            </div>
                                        </div>

                                        <div className="form-group row">
                                            <label htmlFor="inputEmail3" className="col-sm-2 col-form-label"> Footer Credit </label>
                                            <div className="col-sm-10">
                                                <input type="text"  required value={this.state.footer} onChange={this.onFooter.bind(this)} className="form-control" id="inputEmail3"/>
                                            </div>
                                        </div>

                                        <div className="form-group row">
                                            <label htmlFor="inputEmail3" className="col-sm-2 col-form-label"> Home Page Heading </label>
                                            <div className="col-sm-10">
                                                <input type="text"  required value={this.state.heading} onChange={this.onHeading.bind(this)} className="form-control" id="inputEmail3"/>
                                            </div>
                                        </div>

                                        <div className="form-group row " style={{ marginBottom:'120px'}}>
                                            <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">Guideline Information</label>
                                            <div className="col-sm-10">
                                                <ReactQuill value={this.state.update_info}
                                                            className="h-100" theme={'snow'}  onChange={this.onUpdate_info.bind(this)} />
                                            </div>
                                        </div>

                                        <div className="form-group row " style={{ marginBottom:'120px'}}>
                                            <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">Buy & Earn Opportonity</label>
                                            <div className="col-sm-10">
                                                <ReactQuill value={this.state.opportonity}
                                                            className="h-100" theme={'snow'}  onChange={this.onOpportonity.bind(this)} />
                                            </div>
                                        </div>

                                        <div className="form-group row " style={{ marginBottom:'120px'}}>
                                            <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">Overview</label>
                                            <div className="col-sm-10">
                                                <ReactQuill value={this.state.overview}
                                                            className="h-100" theme={'snow'}  onChange={this.onOverview.bind(this)} />
                                            </div>
                                        </div>

                                        <div className="form-group row " style={{ marginBottom:'120px'}}>
                                            <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">Refund Policy</label>
                                            <div className="col-sm-10">
                                                <ReactQuill value={this.state.refund}
                                                            className="h-100" theme={'snow'}  onChange={this.onRefund.bind(this)} />
                                            </div>
                                        </div>


                                        <div className="form-group row " style={{ marginBottom:'120px'}}>
                                            <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">Privacy Policy</label>
                                            <div className="col-sm-10">
                                                <ReactQuill value={this.state.privacy}
                                                            className="h-100" theme={'snow'}  onChange={this.onPrivacy.bind(this)} />
                                            </div>
                                        </div>

                                        <div className="form-group row " style={{ marginBottom:'120px'}}>
                                            <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">Terms Conditions</label>
                                            <div className="col-sm-10">
                                                <ReactQuill value={this.state.termscon}
                                                            className="h-100" theme={'snow'}  onChange={this.onTermsCondition.bind(this)} />
                                            </div>
                                        </div>


                                        <div className=" row " >
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

export default EditSettings;