import React from 'react'
import { Route, Switch} from 'react-router';
import Landing from '../Containers/Landing/Landing';
import Login from '../Containers/Login/Login';
import UserRegistration from '../Containers/UserRegistration/UserRegistration';

const Routing = () => (
    <Switch>
        <Route path = '/' exact component={Landing}/>
        <Route path = '/login' component = {Login}/>
        <Route path = '/register' component = {UserRegistration}/>
    </Switch>
);

export default Routing;
