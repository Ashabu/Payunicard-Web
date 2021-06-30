import React, { useState } from 'react';

const Context = React.createContext();


const createProvider = (initialState = {}) => (props) => { 
    const [appState, setAppstate] = useState(initialState);

    const setGlobalValue = (updatedValue) => {
        console.log('setGlobalValue =>', updatedValue)
        setAppstate(prevState =>({
            ...prevState,
            ...updatedValue
            
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




