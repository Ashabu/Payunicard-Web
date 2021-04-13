import './App.scss';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Routing from './Routing/Routing';





function App() {

  return (
    <BrowserRouter>
      <div className="App">
        <Routing/>
      </div>
    </BrowserRouter>
  );
}

export default App;
