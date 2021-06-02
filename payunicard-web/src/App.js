import './App.scss';
import React, {  useState, useEffect, useContext, useReducer, useRef } from 'react';
import Routing from './Routing/Routing';
import Lang from './Services/SetLang';
import {  Context } from './Context/AppContext';
import { useHistory } from "react-router";
import AuthService from './Services/AuthService';




const  App = () => {
  
  const { state, setGlobalValue  } = useContext(Context);
  const { isUserAuthorized } = state;
  
  const AuthInterceptorSubscription = useRef();
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeLang, setActiveLang] = useState(Lang.langKey);
  const [, forceUpdate]  = useReducer(x => x + 1, 0);
  const history = useHistory() 
  
  const langSubscribe = () => Lang.subscribe(activeLang => {
    setActiveLang(activeLang);
    setGlobalValue({activeLang});
    forceUpdate();
  });

  const logOut = () => {
    history.replace({pathname: '/login'})
  }

useEffect(() => {
  AuthInterceptorSubscription.current = AuthService.registerAuthInterceptor(logOut);

  return () => {
    AuthInterceptorSubscription.current.unsubscribe();
  }
}, [])

useEffect(() => {
  if(AuthService.isAuthenticated()) {
    setGlobalValue({isUserAuthorized: true})
  } else {
    setGlobalValue({isUserAuthorized: false})
  }
}, [])

useEffect(() => {
  Lang.getLang(Lang.langKey, setIsLoaded(true));
  langSubscribe();
  return () => langSubscribe.unsubscribe();
// eslint-disable-next-line react-hooks/exhaustive-deps
}, [])


  
    return( 
    <div className= "App">
     <Routing/>
    </div> 
    )
}

export default App;
