import React from 'react';
import { Switch, BrowserRouter } from 'react-router-dom';
import Route from './Route';

import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';

import Home from '../pages/Home';
import Profile from '../pages/Profile';
import MyCreatedEvents from '../pages/MyCreatedEvents';
import MySubscriptions from '../pages/MySubscriptions';
import EditEvent from '../pages/EditEvent';
import EventRegister from '../pages/EventRegister'
 
export default function Routes() {
  return(
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={SignIn} />
        <Route path="/register" exact component={SignUp} />

        <Route path="/home" exact component={Home} isPrivate />
        <Route path="/profile" exact component={Profile} isPrivate />

        <Route path="/event/register" exact component={EventRegister} isPrivate />
        <Route path="/event/myEvents" exact component={MyCreatedEvents} isPrivate />
        <Route path="/event/MySubscriptions" exact component={MySubscriptions} isPrivate />
        <Route path="/event/myEvents/:id" exact component={EditEvent} isPrivate />

      </Switch>
    </BrowserRouter>
  );
}