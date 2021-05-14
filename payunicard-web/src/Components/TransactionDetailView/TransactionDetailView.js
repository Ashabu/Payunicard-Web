import React, {Fragment} from 'react';
import './transactionDetailView.scss';
import { TrTypes } from '../../Constants/index';
import ComonFn from '../../Services/CommonFunctions';

import PropTypes from 'prop-types'

const  TransactionDetailView = (props) => {

   const {description, amount, ccy, mccGroupCodeId, mccGroupName, abvrName,  uniBonus, senderMaskedCardNumber, senderaccount, terminal,
          senderBankName, senderBankCode, receivername, receiveraccount, receiverBankName, tranDate, dateCreated, aprCode, 
          tranid,  senderName, opClass, longopid, transactionDate, currency, cardNumber, merchantDescription, terminalNumber } = props.transaction;
    
          let DetailContentId = null;
          let atmCashOut = false;

        if(TrTypes.cardPayment.includes(opClass)) {
            if(terminal === 'A') {
                atmCashOut = true;
            } else {
                atmCashOut = false;
            }
            DetailContentId = 1;
        } else if (TrTypes.utilityPayment.includes(opClass)) {
            atmCashOut = false;
            DetailContentId = 2;
        } else if (TrTypes.transferTr.includes(opClass)){
            atmCashOut = false;
            DetailContentId = 3;
        } else if (!opClass) {
            atmCashOut = false;
            DetailContentId = 4;
        }


    let  CardPayment = null;
    if(DetailContentId === 1) { 
        CardPayment = (
            <div className = 'detail-body'>
                <p style = {{textAlign: 'end'}}>დეტალები </p>
                <p>თანხა</p>
                   <span>{ComonFn.formatNumber(amount)}</span>
                <p>{atmCashOut? 'ბანკომატი': 'მერჩანტი' }</p>
                   <span>{abvrName}</span>
                {uniBonus? <Fragment><p>უნი ქულები</p>
                   <span>{uniBonus} <img src = '../../Assets/Images/unipoint-star.svg' alt = 'icon' /> </span></Fragment> : null}
                <p>ბარათის ნომერი</p>
                   <span>{senderMaskedCardNumber}</span>
                <p>ანგარიშის ნომერი</p>
                   <span>{senderaccount}</span>
                <p>{atmCashOut? 'განაღდების თარიღი' : 'გადახდის თარიღი'}</p>
                   <span>{ComonFn.formatDate(tranDate)}</span>
                <p>გატარების თარიღი</p>
                   <span>{ComonFn.formatDate(dateCreated)}</span>
            </div>)}

     let Transfer = null;
     if(DetailContentId === 3) {
        Transfer = (  
            <div className = 'detail-body'>
                <p style = {{textAlign: 'end'}}>საიდან </p>
                <p>გამგზავნის სახელი</p>
                    <span>{senderName}</span>
                <p>ანგარიშის ნომერი</p>
                    <span>{senderaccount}</span>
                <p>ბანკის კოდი</p>
                    <span>{senderBankName}</span>
                <hr/>
                <p style = {{textAlign: 'end'}}>სად</p>
                <p>მიმღები</p>
                    <span>{receivername}</span>
                <p>ანგარიშის ნომერი</p>
                    <span>{receiveraccount}</span>
                <hr/>
                <p style = {{textAlign: 'end'}}>დეტალები </p>
                <p>თანხა</p>
                    <span>{ComonFn.formatNumber(amount)}</span>
                <p>დანიშნულება</p>
                    <span>{description}</span>
                <p>გადახდის თარიღი</p>
                    <span>{ComonFn.formatDate(tranDate)}</span>
                <p>გატარების თარიღი</p>
                   <span>{ComonFn.formatDate(dateCreated)}</span>
            </div>)}

    let UtilityPayment = null;
    if(DetailContentId === 2) {
        UtilityPayment = (
            <div className = 'detail-body'>
                <p style = {{textAlign: 'end'}}>საიდან </p>
                <p>ბარათის ნომერი</p>
                    <span>{senderMaskedCardNumber}</span>
                <hr/>
                <p style = {{textAlign: 'end'}}>სად</p>
                <p>პროვაიდერის დასახელება</p>
                    <span>ჯეოსელი</span>
                <p>მომხმარებელი</p>
                    <span>558120936</span>
                <hr/>
                <p style = {{textAlign: 'end'}}>დეტალები </p>
                <p>თანხა</p>
                    <span>{ComonFn.formatNumber(amount)}</span>        
            </div>)}

    let HoldedTrasaction = null;
    if(DetailContentId === 4) {
        HoldedTrasaction = (
            <div className = 'detail-body'>
                <p style = {{textAlign: 'end'}}>დეტალები </p>
                <p>თანხა</p>
                   <span>{ComonFn.formatNumber(amount)}</span>
                <p>მერჩანტი</p>
                    <span>{merchantDescription}</span>
               <p>ბარათის ნომერი</p>
                    <span>{cardNumber}</span>
            </div>   
        )}    
    
    return (
        <div className = 'detail-view-wrap' >
            <div className= 'detail-header'>
                <div className='header-left'>
                    <img  src = {DetailContentId !==4? ComonFn.getMccImageUrl(mccGroupCodeId) : '../../Assets/Images/lock-grey.png'} alt = 'icon'/>
                    <p>{mccGroupName}</p>
                </div>
                <div className='header-right'>
                    <p >{abvrName}</p>
                    <p>{ComonFn.formatDate(dateCreated || transactionDate)}</p>
                <div className = 'amount'>
                     <p style = {{color: amount > 0? '#94dd34' : ccy? 'red' : 'grey'}}>{ComonFn.formatNumber(amount)} {ComonFn.formatCurrencySymbol(ccy || currency)}</p> 
                </div>
                </div>
            </div>
            <hr/>
                {CardPayment}
                {Transfer}
                {UtilityPayment}
                {HoldedTrasaction}
            <hr/>
            {DetailContentId !== 4? 
            <div className = 'detail-footer'>
                <p style = {{textAlign: 'end'}}>ტრანზაქციის დეტალები</p>
                <p>ავტორიზაციის კოდი</p>
                    <span>761887</span>
                <p>ტრანზაქციის იდენტიფიკატორი</p>
                    <span>{tranid}</span>  
            </div> : null}
           

        </div>
    );
}

TransactionDetailView.propTypes = {

}


export default TransactionDetailView;