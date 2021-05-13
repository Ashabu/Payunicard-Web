import React, {useState} from 'react';
import './transactionDetailView.scss';
import PropTypes from 'prop-types'

const  TransactionDetailView = (props) => {
    const [amount, setAmount ] = useState(-10.32)
    return (
        <div className = 'detail-view-wrap' style = {{width: 570, border: '2px solid red', height: 950}}>

        <div className= 'detail-header'>
            <div className='header-left'>
                <img  src = '../../Assets/Images/MccCodeImg/კომუნალურები.png' alt = 'icon'/>
                <p>mcc კოდის აღწერა</p>
            </div>
            <div className='header-right'>
                <p >მერჩანტის სახელი</p>
                <p>09.05.2021 17:34</p>
            <div className = 'amount'>
                 <p style = {{color: amount < 0? 'red' : 'green'}}>{amount} ₾</p> 
            </div>
            </div>
        </div>
        </div>
    );
}

TransactionDetailView.propTypes = {

}


export default TransactionDetailView;