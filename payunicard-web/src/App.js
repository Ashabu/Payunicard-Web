import './App.scss';
import React, { Component } from 'react';
import Routing from './Routing/Routing';
import Language from './Services/SetLang';
import { StoreProvider, Store, GlobalStore} from './Contexsts/GlobalContext';





class App extends Component {
  
  static contextType = GlobalStore;

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
      Store.setLang(activeLang);
      this.forceUpdate();
  })
  
  

  }

  componentWillUnmount() {
    this.langSubscribe.unsubscribe();
  }
  
  

  render() {
    if(!this.state.isLoaded) return null
    return (
        <StoreProvider value={Store}>
          <div className= "App">
            <Routing/>
          </div>
        </StoreProvider>  
    );
  }
}

export default App;
