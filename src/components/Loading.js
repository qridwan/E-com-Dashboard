import React, {Component} from 'react';
import LoadingImage from '../asset/image/loader.svg'
class Loading extends Component {
    render() {
        return (
            <div className="col-md-12 col-lg-12  col-sm-12 ">
                 <div className="row">
                     <div className="col-md-4"></div>
                     <div className="col-md-4 col-12">
                         <img className="text-center col-12 p-3" style={{height:'150px',width:'150px'}} src={LoadingImage}/>
                     </div>
                     <div className="col-md-4"></div>
                 </div>
            </div>
        );
    }
}

export default Loading;