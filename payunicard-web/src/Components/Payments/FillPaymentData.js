import React, {useContext, useState, useRef, Fragment} from 'react';
import './payment.scss';
import { Context } from '../../Context/AppContext';
import { Button, Icon, Input, Select, SelectList } from '../UI/UiComponents';
import ComonFn from '../../Services/CommonFunctions';
import { Presentation } from '../../Services/API/APIS';
import PropTypes from 'prop-types';



const  FillPaymentData = (props) => {
    const { merchantdata } = props;
    const { forMerchantCode, forMerchantServiceCode, forOpClassCode} = merchantdata;

    const { state } = useContext(Context);
    const { userAccounts } = state;

    const commisionTimeout = useRef();

    const [ selectedAccount, setSelectedAccount] = useState({});
    const [ abonentCode, setAbonentCode ] = useState('');
    const [ debt, setDebt ] = useState('');
    const [ debtCcy, setDebtCcy ] = useState('');
    const [ costumer, setCostumer ] = useState('');
    const [ costumerAddress,  setCostumerAddress ] = useState('');
    const [ amount, setAmount ] = useState('');
    const [ errorMessage, setErrorMessage ] = useState('');
    const [ paymentCommision, setPaymentCommision ] = useState(0.00);


    const checkCostumerDebt = () => {
        let checkDetails = {
            forPaySPCode: merchantdata.forPaySPCode,
            forMerchantCode: merchantdata.forMerchantCode,
            forMerchantServiceCode: merchantdata.forMerchantServiceCode,
            serviceId: merchantdata.debtCode,
            abonentCode: abonentCode
        }

        Presentation.checkCostumerDebt(checkDetails).then(res => {
            if(res.data.Ok) {
                let tempDebtData = res.data.Data.Structures;
                let tempDebt = tempDebtData?.filter(i => i.FieldCode === 'Debt' || i.FieldCode === "FineAmount" || i.FieldCode === "TotalDebt" || i.FieldCode === "Balance");
                if (tempDebt.length) {

                    setDebt(tempDebt[0].Value);
                    setDebtCcy(tempDebt[0].ccy);
                    if (debtCcy) {
                        setDebtCcy("₾");
                    }
                }

                let tempCostumer = tempDebtData?.filter(i => i.FieldCode === 'AbonentName' || i.FieldCode === 'NameAndSurname' || i.FieldCode === "Name" || i.FieldCode === "UserName");
                if (tempCostumer.length) {
                    setCostumer(tempCostumer[0].Value);
                }

                let tempCosumerAddress = tempDebtData?.filter(i => i.FieldCode === 'AbonentAddress' || i.FieldCode === 'Region');
                if (tempCosumerAddress.length !== 0) {
                    setCostumerAddress(tempCosumerAddress[0].Value);
                }

            } else {
                 setErrorMessage(res.data.Errors[0].DisplayText)
            }
        })
    }

    

    const getCostumerCommision = () => {
        if(!amount || !selectedAccount.accountNumber) return;

        let querryParams = {
            forOpClassCode: forOpClassCode,
            forFundsSPCode: 'UniWallet',
            forMerchantCode: forMerchantCode,
            forMerchantServiceCode: forMerchantServiceCode,
            accountNumber: selectedAccount.accountNumber,
            InAmount: amount,
            ForCustomerType: selectedAccount.customerAccountType,
        }

        if(commisionTimeout.current)  clearTimeout(commisionTimeout.current)
            commisionTimeout.current = setTimeout(() => {
                Presentation.getPaymentDetails(querryParams).then(res => {
                    if(res.data.ok) {
                        setPaymentCommision(res.data.data.amountFee.toFixed(2))
                    }
                })
            }, 1000);    
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
                        listClassRow = 'Selected'
                        key={ element.accountNumber } 
                        clicked={() => { setSelectedAccount(element); setVisible(false); getCostumerCommision(); }} >
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
                {debt? <Fragment>
                    <div className = 'd-flex'>
                        <p>დავალიანება:</p>
                        <p>{debt}</p>
                    </div>
                </Fragment> : null}
                {costumer? <Fragment>
                    <div className = 'd-flex'>
                        <p>აბონენტი:</p>
                        <p>{costumer}</p>
                    </div>
                </Fragment> : null}
                {costumerAddress? <Fragment>
                    <div className = 'd-flex'>
                        <p>მისამართი:</p>
                        <p>{costumerAddress}</p>
                    </div>
                </Fragment> : null}
                {debt || costumer ?<Fragment>
                    <div className = 'al-it-center'>
                        <p>თანხის ოდენობა:</p>
                        <Input value = {amount} onInput = {(e) => setAmount(e.target.value) } onChange = {getCostumerCommision()}/>
                    </div>
                </Fragment> : null}
                {paymentCommision ?<Fragment>
                    <div className = 'd-flex'>
                        <p>საკომისიო:</p>
                        <p>{paymentCommision}</p>
                    </div>
                </Fragment> : null}
            </div>
        </div> 
    )
}

FillPaymentData.propTypes = {

}

export default FillPaymentData
