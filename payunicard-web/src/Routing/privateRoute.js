import React from "react"
import { Route, Redirect } from 'react-router-dom';
import { fromEvent } from 'rxjs';

import SimpleRoute from './simpleRoute';

import routingService from './../Services/RoutingService'
import authService from './../Services/AuthService';

//Route is available only when user is authenticated else redirects to login. checks if token is valid
export default class PrivateRoute extends SimpleRoute {
    constructor(props) {
        super(props);
    }

    checkAuth = () => {
        if (!authService.isAuthenticated()) return;
    }

    componentDidUpdate(prevProps) {
        if (this.props.location?.key !== prevProps.location?.key) this.checkAuth();
    }

    componentDidMount() {
        this.tabFocusSubscription = fromEvent(window, 'focus').subscribe(e => {
            if (!authService.isAuthenticated()) window.location.reload();
            else this.checkAuth();
        });
        this.checkAuth();
    }

    componentWillUnmount() {
        if (this.tabFocusSubscription) this.tabFocusSubscription.unsubscribe();
    }

    render() {
        let isAuthenticated = authService.isAuthenticated();

        return (
            isAuthenticated ?
                (<Route {...this.getInjectedProps()} />) :
                (<Redirect to={routingService.routePath('/login')} />)
        );
    }
}