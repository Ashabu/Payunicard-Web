import React  from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createProvider } from './Context/AppContext';
import { initialState } from './InitialState';




const AppProvider = createProvider(initialState);




ReactDOM.render(

  <AppProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </AppProvider>
   
  
  ,document.getElementById('root')
);

reportWebVitals();
