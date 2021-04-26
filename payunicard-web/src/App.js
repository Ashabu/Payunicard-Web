import './App.scss';
import React, { Component } from 'react';

import Routing from './Routing/Routing';
import Language from './Services/SetLang';
import GlobalContext, {contextState} from './Contexsts/GlobalContext';





class App extends Component {
  
  static contextType = GlobalContext;

  state = {
    isLoaded: false,
    activeLang: Language.langKey
  }

  setInit = () => {
    this.setState({isLoaded: true})
  }
  componentDidMount() {
    Language.getLang(Language.langKey, this.setInit);
    this.langSubscribe = Language.subscribe(activeLang => {
      this.setState({activeLang: activeLang });
      contextState.setLang(activeLang);
      this.forceUpdate();
  })
  
  

  }

  componentWillUnmount() {
    this.langSubscribe.unsubscribe();
  }
  
  

  render() {
    console.log(this.state.activeLang)
    if(!this.state.isLoaded) return null
    return (
        <GlobalContext.Provider value={contextState}>
          <div className= "App">
            <Routing/>
          </div>
        </GlobalContext.Provider>  
    );
  }
}

export default App;
