import React from 'react'
import { Route, Switch} from 'react-router';
import Landing from '../Containers/Landing/Landing';
import Login from '../Containers/Login/Login';
import UserRegistration from '../Containers/UserRegistration/UserRegistration';
import Dashboard from '../Containers/Dashboard/Dashboard';

const Routing = () => (
    <Switch>
        <Route path = '/' exact component={Landing}/>
        <Route path = '/login' component = {Login}/>
        <Route path = '/register' component = {UserRegistration}/>
        <Route path = '/dashboard' component = {Dashboard}/>
    </Switch>
);

export default Routing;
