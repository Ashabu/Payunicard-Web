import React, {Fragment, useEffect } from 'react';
import './userBalance.scss';
import Widget from './../HOC/Widget';


const  UserBalance = (props) => {
    useEffect(() => {
    }, [props.userBalance])
    const { balance, ccy, points } = props.userBalance;


    return (
        <Widget class = 'userBalance'>
           {balance? 
           <Fragment>
                <div className = 'userBalance__balance'>
                   <p>ხელმისაწვდომი თანხა</p>
                   <p>{balance}{ccy}</p>
                </div>
                <div className = 'userBalance__balance'>
                    <p>უნიქულები</p>
                    <p>{points} <img src= '../../Assets/Images/unipoint-star.svg' alt = 'icon' /> </p>
                </div>
            </Fragment> : <img style = {{width: 50, margin: 'auto'}}src = '../../Assets/Images/loader.svg' alt = 'loader' />}         
        </Widget>
    );
}

export default UserBalance;