import React, {Component} from 'react';
import Axios from "axios";
import AppUrl from "../AppUrl/AppUrl";

class Footer extends Component {
    constructor() {
        super();
        this.state = {token:'',footer:'',
            loading:true
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
            Axios.post(AppUrl.oneSettings,myFormData,config)
                .then(res=>{
                    this.setState({
                        footer:res.data[0]['footer'],
                        loading:false})
                })
                .catch(error=>{
                    console.log(error)
                })
        }
    }
    render() {
        return (
            <div className="col-md-12 col-lg-12 bg-white col-sm-12 footer">
                <p className="text-center "> @ {this.state.footer}</p>
            </div>
        );
    }
}

export default Footer;