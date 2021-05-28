import React, {useContext, useState, Fragment} from 'react';
import './payment.scss';
import { Context } from '../../Context/AppContext';
import { Button, Icon, Input, Select, SelectList } from '../UI/UiComponents';
import ComonFn from '../../Services/CommonFunctions';
import {Presentation } from '../../Services/API/APIS';
import PropTypes from 'prop-types';



const  FillPaymentData = (props) => {
    const { state } = useContext(Context);
    const { userAccounts } = state;

    const [ selectedAccount, setSelectedAccount] = useState({});
    const [ abonentCode, setAbonentCode ] = useState('');
    const [ debt, setDebt ] = useState('');
    const [ costumer, setCostumer ] = useState('');
    const [ costumerAddress,  setCostumerAddress] = useState('');
    const [ errorMessage, setErrorMessage ] = useState('')


    const { merchantdata } = props;

    console.log(merchantdata)


    const checkCostumerDebt = () => {
        let checkDetails = {
            forPaySPCode: merchantdata.forPaySPCode,
            forMerchantCode: merchantdata.forMerchantCode,
            forMerchantServiceCode: merchantdata.forMerchantServiceCode,
            serviceId: merchantdata.debtCode,
            abonentCode: abonentCode
        }

        Presentation.checkCostumerDebt(checkDetails).then(res => {
            debugger
            if(res.data.Ok) {
                let tempDebtData = res.data.Data.Structures
                setDebt(tempDebtData[0].Value);
                setCostumer(tempDebtData[1].Value);
                setCostumerAddress(tempDebtData[2].Value);
                
            } else {
                 setErrorMessage(res.data.Errors[0].DisplayText)
            }
        })


    }


    
    
    return (
         <div style={{width: 570, height: '100%', border: '1px solid black', boxSizing: 'border-box', padding: 20}}>
           
            <div>
                <p>Please Choose a Card</p>
                <Select
                        data = { userAccounts } 
                        placeholder = 'Select Account'
                        selected = { selectedAccount.accountNumber }
                        icon = { <Icon iconUrl = { ComonFn.setLogoByAccountType(selectedAccount.type) }/> }
                        display ={(element, setVisible) => (
                        <SelectList  
                            key={ element.accountNumber } 
                            clicked={() => { setSelectedAccount(element); setVisible(false) }} >
                                <Icon iconUrl = { ComonFn.setLogoByAccountType(element.type) }/>{ element.accountNumber } 
                        </SelectList>)} 
                    />
            </div>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 30}}>
                <div style={{width: 300}}>
                    <div style = {{display: 'flex'}}>
                        <img style = {{width: 70}} src ={merchantdata.merchantImgUrl} alt = 'merchant logo' />
                        <p>{merchantdata.merchantName}</p>
                    </div>           
                </div>
                <div style = {{display: 'flex', flexFlow: 'column'}}>
                    <Input value = {abonentCode} onInput = {(e) => setAbonentCode(e.target.value)} />
                    {abonentCode !== ''? <Button clicked = {checkCostumerDebt}>შემომწმება</Button> : null}
                </div>
            </div>
            <div className = 'payment-info'>
                <div>{errorMessage}</div>
                <div className = 'd-flex'>
                    <p>დავალიანება:</p>
                    <p>{debt}</p>
                </div>
                <div className = 'd-flex'>
                    <p>აბონენტი:</p>
                    <p>{costumer}</p>
                </div>
                <div className = 'd-flex'>
                    <p>მისამართი:</p>
                    <p>{costumerAddress}</p>
                </div>
                <div className = 'al-it-center'>
                    <p>თანხის ოდენობა:</p>
                    <Input/>
                </div>
                


            </div>
        </div> 
    )
}

FillPaymentData.propTypes = {

}

export default FillPaymentData
