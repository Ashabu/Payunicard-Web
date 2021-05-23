import React, { useContext } from 'react'
import { Context } from '../Context/AppContext';
import { Route, Switch, Redirect} from 'react-router';
import Landing from '../Containers/Landing/Landing';
import Login from '../Containers/Login/Login';
import UserRegistration from '../Containers/UserRegistration/UserRegistration';
import Dashboard from '../Containers/Dashboard/Dashboard';
import Transaction from '../Containers/Transaction/Transaction';





// const { isUserAuthorized } = state;





const ProtectedRoute = ({component: Component, ...restProps}) => {
    const { setGlobalValue } = useContext(Context);

    const chekIsUserAuthorized = () => { 
        const token = localStorage.getItem('token');
        const refreshToken = localStorage.getItem('refreshToken');
            try {
                 if(!token || !refreshToken) {
                    setGlobalValue({isUserAuthorized: false})
                     return false;
                 } else {
                     debugger
                    setGlobalValue({isUserAuthorized: true})
                 }
            } 
            catch (error) {
                setGlobalValue({isUserAuthorized: false})
                return false;
            }
           
            return true;
    }

    return (
        <Route {...restProps}  render={ (props) =>  chekIsUserAuthorized ? <Component {...props}/> : <Redirect to="/login"/> } /> 
    )
}




const Routing = () => (
    <Switch>
        <Route path = '/' exact component={Landing}/>
        <Route path = '/login' component = {Login}/>
        <Route path = '/register' component = {UserRegistration}/>
        <ProtectedRoute path = '/dashboard' component = {Dashboard}/>
        <ProtectedRoute path = '/transactions' component = {Transaction}/>
    </Switch>
);

export default Routing;
