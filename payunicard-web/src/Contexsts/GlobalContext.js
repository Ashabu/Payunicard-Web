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
    },

    allUserCurrencies: [],
    setAllUserCurrencies: (data) => {
        Store.allUserCurrencies = data;
    }

}

export const GlobalStore = React.createContext({Store});

export const StoreProvider = (props) => {
    return (
        <GlobalStore.Provider value = {Store}>
            {props.children}
        </GlobalStore.Provider>
    )
}



