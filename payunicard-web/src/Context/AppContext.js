import React, { useState } from 'react';

const Context = React.createContext();


const createProvider = (initialState = {}) => (props) => { 
    const [appState, setAppstate] = useState(initialState);

    const setGlobalValue = (key, value) => {
        setAppstate(prevState =>({
            ...prevState,
            [key] : value
        }));
    }
        return <Context.Provider
            value = {{
                state: appState,
                setGlobalValue
            }}
            >
                { props.children }
            </Context.Provider>
    
    

}


export { createProvider, Context };




