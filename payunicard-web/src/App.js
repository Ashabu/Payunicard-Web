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
  
  //set Application language
  const langSubscribe = () => Lang.subscribe(activeLang => {
    setActiveLang(activeLang);
    setGlobalValue({activeLang});
    forceUpdate();
  });

  
  useEffect(() => {
    Lang.getLang(Lang.langKey, setIsLoaded(true));
    langSubscribe();
    return () => langSubscribe.unsubscribe();
  }, [])


  const [isInterceptorLoaded, setIsInterceptorLoaded] = useState(true)

  useEffect(() => {
    setIsInterceptorLoaded(true)
    AuthInterceptorSubscription.current = AuthService.registerAuthInterceptor(logOut);

    setIsInterceptorLoaded(false)

    return () => {
      AuthInterceptorSubscription.current.unsubscribe();
    }
  }, [])


//checking if user session is out 
  useEffect(() => {
    if(AuthService.isAuthenticated()) {
      setGlobalValue({isUserAuthorized: true})
    } else {
      setGlobalValue({isUserAuthorized: false})
    }
  }, [])


// logout user 
  const logOut = () => {
    history.replace({pathname: '/login'})
  }

  useEffect(() => {
    if(!isUserAuthorized && isLoaded){
      AuthService.SignOut();
      logOut();
    }
  }, [isUserAuthorized, isLoaded])


if(isInterceptorLoaded) return null;


  
  return( 
  <div className= "App">
   <Routing/>
  </div> 
  )
}

export default App;
