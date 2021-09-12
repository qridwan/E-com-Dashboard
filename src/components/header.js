import React, {Component, Fragment} from 'react';
import  {withRouter,Link} from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import Axios from "axios";
import AppUrl from "../AppUrl/AppUrl";
import Image from '../asset/image/en.png'
import HeaderMini from './HeaderMini';

class Header extends Component {

    constructor() {
        super();
        this.state={
            SideNavState:"sideNavClose",
            ContentOverState:"ContentOverlayClose"
        }
    }

    componentDidMount() {
        const token = localStorage.admintoken
        if(token){
            const myFormData = new FormData()
            myFormData.append('token',token)
            const config = {
                headers : {'content-type':'multipart/form-data'}
            }
            Axios.post(AppUrl.profile,myFormData,config)
                .then(res=>{
                    console.log("Userdata Header "+res.data)
                    if(res.data.error=="Invalid"){
                        localStorage.removeItem('admintoken')
                    }
                })
                .catch(error=>{
                    //localStorage.removeItem('admintoken')
                    console.log(error)
                })
        }else{
            this.props.history.push('/login')
        }
    }


    logOut(e) {
        e.preventDefault()
        localStorage.removeItem('admintoken')
        this.props.history.push(`/login`)
        toast.success('Successfully Logout', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }

    MenuBarClickHandler=()=>{
        this.SideNavOpenClose();
    }

    ContentOverlayClickHandler=()=>{
        this.SideNavOpenClose();
    }



    SideNavOpenClose=()=>{
        let SideNavState= this.state.SideNavState;
        let ContentOverState= this.state.ContentOverState;
        if(SideNavState==="sideNavOpen"){
            this.setState({SideNavState:"sideNavClose",ContentOverState:"ContentOverlayClose"})
        }
        else{
            this.setState({SideNavState:"sideNavOpen",ContentOverState:"ContentOverlayOpen"})
        }
    }

    render() {
        return (
            <Fragment>
                <title>{this.props.title}</title>
                <HeaderMini/>
                <div className="wrapper">
                        <nav className=" main-header navbar navbar-expand navbar-white navbar-light ">
                            <ul className="navbar-nav">
                                <li className="nav-item">
                                    <a  className="nav-link" data-widget="pushmenu" href="#" role="button"><i
                                        className="fas fa-bars"></i></a>
                                </li>
                            </ul>
                            <ul className="navbar-nav ml-auto">
                                <li className="nav-item dropdown">
                                    <a className="nav-link" data-toggle="dropdown" >
                                        <img src={Image}/> English
                                    </a>
                                </li>
                                <li className="nav-item dropdown">
                                    <a className="nav-link" data-toggle="dropdown" >
                                        <i className="far fa-bell"></i>
                                    </a>
                                </li>
                                <li className="nav-item dropdown">
                                    <a className="nav-link" data-toggle="dropdown" >
                                        <i className="far fa-user "></i>
                                    </a>
                                    <div className="dropdown-menu dropdown-menu-lg dropdown-menu-right" style={{padding:'20px'}}>
                                        <li className="nav-item dropdown">
                                            <Link to='/profile' className="nav-link"  >
                                                <i className="fa fa-user" ></i> Profile
                                            </Link>
                                        </li>
                                        <li className="nav-item dropdown">
                                            <Link className="nav-link"  onClick={this.logOut.bind(this)} >
                                                <i className="fa fa-sign-out-alt" ></i> Logout
                                            </Link>
                                        </li>
                                    </div>
                                </li>
                            </ul>
                        </nav>

                        <ToastContainer
                            position="top-right"
                            autoClose={5000}
                            hideProgressBar
                            newestOnTop={false}
                            closeOnClick
                            rtl={false}
                            pauseOnFocusLoss
                            draggable
                            pauseOnHover
                        />
                    </div>

            </Fragment>
        );
    }
}

export default withRouter(Header);