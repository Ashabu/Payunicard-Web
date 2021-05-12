import React from 'react';

export const contextState = {
    lang: 'geo',
    setLang: (p)=>{
        contextState.lang = p;
    },

    userAccounts: [],
    setUserAccounts: (data) => {
        contextState.userAccounts = data;
    },

    userStatements: [],
    setUserStatements: (data) => {
        contextState.userStatements = data;
    }

}
const GlobalContext = React.createContext({contextState});


export default GlobalContext;