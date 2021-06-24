import React, { useContext } from 'react'
import { Context } from '../Context/AppContext';
import { Route, Switch, Redirect} from 'react-router';
import Landing from '../Containers/Landing/Landing';
import Login from '../Containers/Login/Login';
import UserRegistration from '../Containers/UserRegistration/UserRegistration';
import Dashboard from '../Containers/Dashboard/Dashboard';
import Transaction from '../Containers/Transaction/Transaction';
import Payments from './../Containers/Payments/Payments';
import Transfers from './../Containers/Transfers/Transfers';
import AuthService from './../Services/AuthService';
import PrivateRoute from './privateRoute';
import NotAuthRoute from './NotAuthRoute';
import MyProducts from '../Containers/MyProducts/MyProducts';





// const { isUserAuthorized } = state;





// const ProtectedRoute = ({component: Component, ...restProps}) => {
//     const { setGlobalValue } = useContext(Context);

//     const chekIsUserAuthorized = () => { 
//         const isAuth = AuthService.isAuthenticated();
//             try {
//                  if(!isAuth) {
//                     setGlobalValue({isUserAuthorized: false})
//                      return false;
//                  } else {
                     
//                     setGlobalValue({isUserAuthorized: true})
//                  }
//             } 
//             catch (error) {
//                 setGlobalValue({isUserAuthorized: false})
//                 return false;
//             }
           
//             return true;
//     }

//     return (
//         <Route {...restProps}  render={ (props) =>  chekIsUserAuthorized ? <Component {...props}/> : <Redirect to="/login"/> } /> 
//     )
// }




const Routing = () => (
    <Switch>
        <NotAuthRoute path = '/' exact component={Landing}/>
        <NotAuthRoute path = '/login' component = {Login}/>
        <NotAuthRoute path = '/register' component = {UserRegistration}/>
        <PrivateRoute path = '/dashboard' component = {Dashboard}/>
        <PrivateRoute path = '/transactions' component = {Transaction}/>
        <PrivateRoute path = '/myproducts' component = {MyProducts}/>
        <PrivateRoute path = '/payments' component = {Payments}/>
        <PrivateRoute path = '/transfers' component = {Transfers}/>

    </Switch>
);

export default Routing;
