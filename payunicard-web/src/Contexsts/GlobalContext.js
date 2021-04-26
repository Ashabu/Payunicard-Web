import React from 'react';

export const contextState = {
    lang: 'geo',
    setLang: (p)=>{
        contextState.lang = p;
    },

    userAccounts: [],
    setUserAccounts: (res) => {
        contextState.userAccounts = res;
    }
}
const GlobalContext = React.createContext({contextState});

export default GlobalContext;