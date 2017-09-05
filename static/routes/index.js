import "babel-polyfill";

import React from "react";
import { render } from "react-dom";
import { Router, Route, browserHistory } from 'react-router'
import Login from '../src/containers/login'
import Register from '../src/containers/register'
import Home from '../src/containers/home'


render(( 
    <Router history = { browserHistory } >
        <Route path = "/" component = {Login}/>
        <Route path = "/register" component = { Register }/> 
        <Route path = "/home" component = {Home}/>
    </Router>
), document.getElementById('root'))