import React  from 'react';
import Lang from './Services/SetLang';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import axios from "axios";

import { createProvider, Context } from './Context/AppContext';

const initialState = {
    isUserAuthorized: false,
    activeLang: Lang.langKey,
    paymentTemplates: [],
    transactions: [],
    transactionTemplates: [],
    userAccounts: [],
    userDetails: [],

}


const AppProvider = createProvider(initialState);


const _AuthToken = `Bearer ${localStorage.getItem('token')}`;


axios.defaults.headers['Authorization'] = _AuthToken;
axios.defaults.headers['Content-Type'] = "application/json; charset=utf-8"

axios.interceptors.request.use(requestConfig => {
  
  return requestConfig;
}, error => {
  console.log(error);
  return Promise.reject(error);
});

axios.interceptors.response.use(responseConfing => {
  
  return responseConfing;

}, error => {
  console.log(error)
  return Promise.reject(error);
});




ReactDOM.render(

  <AppProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </AppProvider>
   
  
  ,document.getElementById('root')
);

reportWebVitals();
