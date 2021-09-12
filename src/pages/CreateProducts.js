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

class CreateProducts extends Component {
    constructor() {
        super();
        this.state = {
            title:'',category:'',supplier:'',quality:'',storage:'',weight:'',unit:'',packaging:'',available:'',nutritional:'',
            quantity:'',size:'',color:'',des:'',img1:'',img2:'',img3:'',img4:'',img5:'',
            token:'',price:'',p_img:'',p_name:'',p_address:'',brand:'',ing:'',msg:'',
            data:[],
            loading:true
        }
    }

    onBrand(e){
        this.setState({brand:e.target.value})
    }
    onIng(e){
        this.setState({ing:e.target.value})
    }
    onMsg(e){
        this.setState({msg:e.target.value})
    }

    onP_Name(e){
        this.setState({p_name:e.target.value})
    }
    onP_Address(e){
        this.setState({p_address:e.target.value})
    }
    onP_Img(e){
        this.setState({p_img:e.target.files[0]})
    }

    onName(e){
        this.setState({title:e.target.value})
    }
    onPrice(e){
        this.setState({price:e.target.value})
    }
    onSupplier(e){
        this.setState({supplier:e.target.value})
    }
    onQuality(e){
        this.setState({quality:e.target.value})
    }
    onStorage(e){
        this.setState({storage:e.target.value})
    }
    onWeight(e){
        this.setState({weight:e.target.value})
    }
    onUnit(e){
        this.setState({unit:e.target.value})
    }
    onPackaging(e){
        this.setState({packaging:e.target.value})
    }
    onAvailable(e){
        this.setState({available:e.target.value})
    }
    onNutrition(e){
        this.setState({nutritional:e.target.value})
    }
    onQuantity(e){
        this.setState({quantity:e.target.value})
    }
    onSize(e){
        this.setState({size:e.target.value})
    }
    onColor(e){
        this.setState({color:e.target.value})
    }
    onDesc(content, delta, source, editor){
        this.setState({des:editor.getHTML()})
        console.log(editor.getHTML()); // rich text

    }
    onThumbnail(e){
        this.setState({img1:e.target.files[0]})
    }
    onImg2(e){
        this.setState({img2:e.target.files[0]})
    }
    onImg3(e){
        this.setState({img3:e.target.files[0]})
    }
    onImg4(e){
        this.setState({img4:e.target.files[0]})
    }
    onImg5(e){
        this.setState({img5:e.target.files[0]})
    }
    onCategorylist(e){
        this.setState({category:e.target.value})
    }
    componentDidMount() {
        const token = localStorage.admintoken
        if(token){
            this.setState({token:token})
            const formData = new FormData()
            formData.append('token',token)
            Axios.post(AppUrl.allCategory,formData)
                .then(res=>{
                    this.setState({data:res.data,loading:false})
                })
                .catch(error=>{
                    console.log(error)
                })
        }else{
            this.props.history.push('login')
        }
    }

    FormSubmit(event){

        if(this.state.category==""){
            toast.error("Category is required", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }else if (this.state.img1==""){
            toast.error("Thumbnail is required", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }else{
            const formData = new FormData()
            formData.append('p_name',this.state.p_name)
            formData.append('p_address',this.state.p_address)
            formData.append('p_img',this.state.p_img)
            formData.append('brand',this.state.brand)
            formData.append('ing',this.state.ing)
            formData.append('msg',this.state.msg)

            formData.append('title',this.state.title)
            formData.append('price',this.state.price)
            formData.append('category',this.state.category)
            formData.append('supplier',this.state.supplier)
            formData.append('quality',this.state.quality)
            formData.append('storage',this.state.storage)
            formData.append('weight',this.state.weight)
            formData.append('unit',this.state.unit)
            formData.append('packaging',this.state.packaging)
            formData.append('available',this.state.available)
            formData.append('nutritional',this.state.nutritional)
            formData.append('quantity',this.state.quantity)
            formData.append('size',this.state.size)
            formData.append('color',this.state.color)
            formData.append('des',this.state.des)
            formData.append('img1',this.state.img1)
            formData.append('img2',this.state.img2)
            formData.append('img3',this.state.img3)
            formData.append('img4',this.state.img4)
            formData.append('img5',this.state.img5)
            formData.append('token',this.state.token)

            Axios.post(AppUrl.createProducts, formData)
                .then(res=>{
                    if(res.data.success){
                        this.props.history.push(`/products`)
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
        }

        event.preventDefault()

    }





    render() {

        const categorylist = this.state.data.map(result=>{
            console.log(result)
            return <Fragment>
                <option value={result.id}>{result.cat_name}</option>
            </Fragment>
        })

        return (
            <Fragment>
                <Header title="Create Product"/>
                <div className="content-wrapper">
                    <div className="row m-3  pt-3">
                        <div className="col-md-2 col-12"></div>
                        <div className="col-md-8 col-12">
                            <div className="col-md-12 uprofile col-12 bg-white py-3 mt-2 table-responsive-sm mb-5 ">
                                <h5 className='text-center'>Create Product </h5>
                                <br/>
                                <form onSubmit={this.FormSubmit.bind(this)}>
                                    <div className="form-group row">
                                        <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">Product Name</label>
                                        <div className="col-sm-10">
                                            <input type="text" required onChange={this.onName.bind(this)} value={this.state.title} className="form-control" id="inputEmail3"/>
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">Produced in</label>
                                        <div className="col-sm-10">
                                            <input type="text" required onChange={this.onSupplier.bind(this)} value={this.state.supplier} className="form-control" id="inputEmail3"/>
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">Producer Name</label>
                                        <div className="col-sm-10">
                                            <input type="text" required onChange={this.onP_Name.bind(this)} value={this.state.p_name} className="form-control" id="inputEmail3"/>
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">Producer Address</label>
                                        <div className="col-sm-10">
                                            <input type="text" required onChange={this.onP_Address.bind(this)} value={this.state.p_address} className="form-control" id="inputEmail3"/>
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">Price</label>
                                        <div className="col-sm-10">
                                            <input type="text" required onChange={this.onPrice.bind(this)} value={this.state.price} className="form-control" id="inputEmail3"/>
                                        </div>
                                    </div>


                                    <div className="form-group row">
                                        <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">Quality Certification</label>
                                        <div className="col-sm-10">
                                            <input type="text"  onChange={this.onQuality.bind(this)} value={this.state.quality} className="form-control" id="inputEmail3"/>
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">Storage Condition</label>
                                        <div className="col-sm-10">
                                            <input type="text"  onChange={this.onStorage.bind(this)} value={this.state.storage} className="form-control" id="inputEmail3"/>
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">Weight</label>
                                        <div className="col-sm-10">
                                            <input type="text"  onChange={this.onWeight.bind(this)} value={this.state.weight} className="form-control" id="inputEmail3"/>
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">Packaging Uint</label>
                                        <div className="col-sm-10">
                                            <input type="text"  onChange={this.onUnit.bind(this)} value={this.state.unit} className="form-control" id="inputEmail3"/>
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">Packaging </label>
                                        <div className="col-sm-10">
                                            <input type="text"  onChange={this.onPackaging.bind(this)} value={this.state.packaging} className="form-control" id="inputEmail3"/>
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">Availability</label>
                                        <div className="col-sm-10">
                                            <input type="text"  onChange={this.onAvailable.bind(this)} value={this.state.available} className="form-control" id="inputEmail3"/>
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">Nutritional Information</label>
                                        <div className="col-sm-10">
                                            <input type="text"  onChange={this.onNutrition.bind(this)} value={this.state.nutritional} className="form-control" id="inputEmail3"/>
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <label htmlFor="inputEmail3" className="col-sm-2 col-form-label"> Quantity</label>
                                        <div className="col-sm-10">
                                            <input type="text"  onChange={this.onQuantity.bind(this)} value={this.state.quantity} className="form-control" id="inputEmail3"/>
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">Size</label>
                                        <div className="col-sm-10">
                                            <input type="text"  onChange={this.onSize.bind(this)} value={this.state.size} className="form-control" id="inputEmail3"/>
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">Colour</label>
                                        <div className="col-sm-10">
                                            <input type="text"  onChange={this.onColor.bind(this)} value={this.state.color} className="form-control" id="inputEmail3"/>
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">Brand</label>
                                        <div className="col-sm-10">
                                            <input type="text"  onChange={this.onBrand.bind(this)} value={this.state.brand} className="form-control" id="inputEmail3"/>
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">Ingredients</label>
                                        <div className="col-sm-10">
                                            <input type="text"  onChange={this.onIng.bind(this)} value={this.state.ing} className="form-control" id="inputEmail3"/>
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">Massage from Company</label>
                                        <div className="col-sm-10">
                                            <input type="text"  onChange={this.onMsg.bind(this)} value={this.state.msg} className="form-control" id="inputEmail3"/>
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">Category </label>
                                        <div className="col-sm-10">
                                            <select onChange={this.onCategorylist.bind(this)}
                                                    className="form-control">
                                                <option selected > Select Category </option>
                                                {categorylist}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="form-group row " style={{height:'200px', marginBottom:'100px'}}>
                                        <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">Description</label>
                                        <div className="col-sm-10">
                                            <ReactQuill value={this.state.des}
                                                        className="h-100" theme={'snow'}  onChange={this.onDesc.bind(this)} />
                                        </div>
                                    </div>


                                    <div className="form-group row">
                                        <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">Thumbnail</label>
                                        <div className="col-sm-10">
                                            <input type="file" onChange={this.onThumbnail.bind(this)} className="form-control image" id="inputEmail3"/>
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">Producer Image</label>
                                        <div className="col-sm-10">
                                            <input type="file" onChange={this.onP_Img.bind(this)} className="form-control image" id="inputEmail3"/>
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <label htmlFor="inputEmail3" className="col-sm-2 col-form-label"> Image</label>
                                        <div className="col-sm-10">
                                            <input type="file" onChange={this.onImg2.bind(this)} className="form-control image" id="inputEmail3"/>
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <label htmlFor="inputEmail3" className="col-sm-2 col-form-label"> Image</label>
                                        <div className="col-sm-10">
                                            <input type="file" onChange={this.onImg3.bind(this)} className="form-control image" id="inputEmail3"/>
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label htmlFor="inputEmail3" className="col-sm-2 col-form-label"> Image</label>
                                        <div className="col-sm-10">
                                            <input type="file" onChange={this.onImg4.bind(this)} className="form-control image" id="inputEmail3"/>
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label htmlFor="inputEmail3" className="col-sm-2 col-form-label"> Image</label>
                                        <div className="col-sm-10">
                                            <input type="file" onChange={this.onImg5.bind(this)} className="form-control image" id="inputEmail3"/>
                                        </div>
                                    </div>


                                    <div className=" row " >
                                        <div className="col-sm-8">
                                        </div>
                                        <div className="col-sm-4">
                                            <button type="submit" className="btn  btn-dark float-right">Submit</button>
                                        </div>
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

export default CreateProducts;