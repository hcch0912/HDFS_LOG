import React from 'react';
import {Route} from 'react-router';
import Router from 'react-router'
import App from './components/App';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import browserHistory from 'react-router';

export default (
 
    <Route component={App}>
      <Route path='/' component={Login} />
      <Route path = '/login' component = {Login} />
      <Route path='/dashboard' component={Dashboard} />
      
    </Route>

);