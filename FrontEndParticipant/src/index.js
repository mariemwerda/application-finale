/*!

=========================================================
* Paper Dashboard React - v1.3.0
=========================================================

* Product Page: https://www.creative-tim.com/product/paper-dashboard-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)

* Licensed under MIT (https://github.com/creativetimofficial/paper-dashboard-react/blob/main/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch,  } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.css";
import "assets/scss/paper-dashboard.scss?v=1.3.0";
import "assets/demo/demo.css";
import "perfect-scrollbar/css/perfect-scrollbar.css";
import 'bootstrap/dist/css/bootstrap.css';


import AdminLayout from "layouts/Admin.js";
import Login from "views/SignIn";
import Signup from "views/SignUp";
import store from './Redux/store';
import { Provider } from 'react-redux';



ReactDOM.render(
  <BrowserRouter>
  <Provider store={store}>

  <Switch>
    
     <Route path="/login" component={Login} />
     <Route path="/signup" component={Signup} />
     <Route path="/" render={(props) => <AdminLayout {...props} />} />
    </Switch>


</Provider>
  </BrowserRouter>,
  document.getElementById("root")
);
