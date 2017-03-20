import React from 'react';
import {Route} from 'react-router';
import Router from 'react-router'
import App from './components/App';
import Dashboard from './components/Dashboard';

import browserHistory from 'react-router';

export default (
 
    <Route component={App}>
      <Route path='/' component={Dashboard} />
      <Route path='/dashboard' component={Dashboard} />
     
    </Route>

);