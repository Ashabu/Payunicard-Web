import React from 'react';

export const Store = {
    lang: 'geo',
    setLang: (p)=>{
        Store.lang = p;
    },

    userAccounts: [],
    setUserAccounts: (data) => {
        Store.userAccounts = data;
    },

    userStatements: [],
    setUserStatements: (data) => {
        Store.userStatements = data;
    }

}

const GlobalContext = React.createContext({Store});

export const StoreProvider = (props) => {
    return (
        <GlobalContext.Provider value = {Store}>
            {props.children}
        </GlobalContext.Provider>
    )
}

export const StoreConsumer = (props) => {
    return (
        <GlobalContext.Consumer>
            {props.children}
        </GlobalContext.Consumer>
    )
}

