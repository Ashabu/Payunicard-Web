import './App.scss';
import React, {  useState, useEffect, useContext, useReducer } from 'react';
import Routing from './Routing/Routing';
import Lang from './Services/SetLang';
import {  Context } from './Context/AppContext';






const  App = () => {
  
  const { state, setGlobalValue  } = useContext(Context);
  
  
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeLang, setActiveLang] = useState(Lang.langKey);
  const [, forceUpdate]  = useReducer(x => x + 1, 0);
  
  const langSubscribe = () => Lang.subscribe(activeLang => {
    setActiveLang(activeLang);
    setGlobalValue({activeLang});
    forceUpdate();
  });



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
