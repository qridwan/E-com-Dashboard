import React, {Fragment} from "react";
import  {BrowserRouter } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import AppRouter from "./router/AppRouter";
import '../src/asset/css/style.css'
import 'react-toastify/dist/ReactToastify.css';
import 'react-tabs/style/react-tabs.css';


function App() {
  return (
    <Fragment>
      <BrowserRouter>
        <AppRouter/>
      </BrowserRouter>
    </Fragment>
  );
}

export default App;
