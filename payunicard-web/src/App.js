import './App.scss';
import React, { Component } from 'react';

import Routing from './Routing/Routing';
import Language from './Services/SetLang';
import LangContext from './Contexsts/lang-context';





class App extends Component {
  
  state = {
    isLoaded: false,
    activeLang: Language.langKey
  }

  setInit = () => {
    this.setState({isLoaded: true})
  }
  componentDidMount() {
    Language.getLang(Language.langKey, this.setInit);
    this.langSubscribe = Language.subscribe(_ => {
      this.forceUpdate();
  })
      

  }

  componentWillUnmount() {
    this.langSubscribe.unsubscribe();
  }


  render() {
    if(!this.state.isLoaded) return null
    return (
        <LangContext.Provider value={{lang: this.state.activeLang}}>
          <div className= "App">
            <Routing/>
          </div>
        </LangContext.Provider>  
    );
  }
}

export default App;
