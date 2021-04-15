import './App.scss';
import React, { Component } from 'react';

import Routing from './Routing/Routing';
import Language from './Services/SetLang';





class App extends Component {
  
  state = {
    isLoaded: false
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
        
          <div className= "App">
            <Routing/>
          </div>
    );
  }
}

export default App;
