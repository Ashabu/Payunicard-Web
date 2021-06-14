import React, { useState, useContext, useEffect } from 'react';
import './selectAccount.scss';
import { Context } from '../../Context/AppContext';
import { Select } from '../UI/UiComponents';
import PropTypes from 'prop-types';
import SelectedAccount from './../HOC/SelectedAccount/SelectedAccount';



const SelectAccount = (props) => {
    const { state } = useContext(Context);
    const { userAccounts } = state;

    const { placeholder, current, hasUnicard } = props;

    const [ selectedAccount, setSelectedAccount] = useState(null);
    const [ UserAccounts, setUserAccounts ] = useState([])

    const setAccount = (data) => {
        props.account(data)
    }

    const currentAccount = (id) => {
        let temUserAccounts = userAccounts;
        let currentAccount = temUserAccounts.filter(acc => acc.accountId == id);
        setSelectedAccount(currentAccount[0]);

    }

    useEffect(() => {
        if(current) {
            currentAccount(current);
        }
    }, [current]) 

    useEffect(() => {
        if(hasUnicard === 0) {
            let tempAccounts = userAccounts.filter(acc => acc.type !==7)
            setUserAccounts([...tempAccounts])
        } else {
            
            setUserAccounts([...userAccounts])
            debugger
        }
       
        
    }, [])
    
    return (
        <Select
            data = { UserAccounts } 
            selected = { selectedAccount? 
                <SelectedAccount 
                    selected = { selectedAccount } 
                    icon = { props.icon } 
                    orderCard = {props.orderCard} /> : <div style={{padding: 10}}>{ placeholder }</div>  
                }
            display ={(element, setVisible) => (
                <SelectedAccount 
                    key={ element.accountNumber } 
                    selected = { element } 
                    icon = { props.icon } 
                    orderCard = {props.orderCard} 
                    list 
                    clicked={() => { setSelectedAccount(element); setVisible(false); setAccount(element)}}/>
                )} 
            />
    )
}

SelectAccount.propTypes = {

}   

export default SelectAccount
