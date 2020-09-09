import React from 'react';
import { Switch, BrowserRouter } from 'react-router-dom';
import Route from './Route';

import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';

import Home from '../pages/Home';

import EventRegister from '../pages/EventRegister'
 
export default function Routes() {
  return(
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={SignIn} />
        <Route path="/register" exact component={SignUp} />

        <Route path="/home" exact component={Home} isPrivate />

        <Route path="/event/register" exact component={EventRegister} isPrivate />
      </Switch>
    </BrowserRouter>
  );
}