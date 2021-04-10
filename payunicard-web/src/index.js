import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import axios from "axios";



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
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
