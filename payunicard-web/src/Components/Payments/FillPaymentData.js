import React, {useContext, useState, useRef, Fragment, useEffect} from 'react';
import './payment.scss';
import { Button, AppInput } from '../UI/UiComponents';
import { formatCurrencySymbol } from '../../Services/CommonFunctions';
import { Presentation, Transaction } from '../../Services/API/APIS';
import PropTypes from 'prop-types';
import SelectAccount from '../SelectAccount/SelectAccount';



const  FillPaymentData = (props) => {
    const {
        abonentCode, 
        canPayWithUnipoints,
        debtCode, 
        forFromAccount, 
        forMerchantCode,
        forMerchantServiceCode, 
        forOpClassCode,
        forPaySpCode, 
        forPaySPCode, 
        imageUrl, 
        maxAmount ,
        merchantCode, 
        merchantId,
        merchantImgUrl , 
        merchantName, 
        merchantServiceCode,
        minAmount,
        } = props.merchantdata;
    

    const commisionTimeout = useRef();

    const [ selectedAccount, setSelectedAccount] = useState({});
    const [ AbonentCode, setAbonentCode ] = useState(abonentCode || '');
    const [ debt, setDebt ] = useState('');
    const [ debtCcy, setDebtCcy ] = useState('');
    const [ costumer, setCostumer ] = useState('');
    const [ costumerAddress,  setCostumerAddress ] = useState('');
    const [ amount, setAmount ] = useState('');
    const [ errorMessage, setErrorMessage ] = useState('');
    const [ paymentCommision, setPaymentCommision ] = useState(0);
    const [ totalPaymentAmount, setTotalPaymentAmount ] = useState(0);

    useEffect(() => {
        if(AbonentCode !== '')
            checkCostumerDebt();
        
    }, [])

    useEffect(() => {
        getCostumerCommision();
    }, [amount, selectedAccount.accountNumber]);

    let paymentData = { 
        forMerchantCode: forMerchantCode,
        forMerchantServiceCode: forMerchantServiceCode,
        serviceId: debtCode,
        amount: amount,
        abonentCode: AbonentCode,
        forFundsSPCode: 'UniWallet',
        bankId: null,
        forPaySPCode: forPaySPCode,
        AccountId: selectedAccount.accountId,
        forOpClassCode: forOpClassCode || forPaySpCode,
   }

   

    const templateData = {
        merchantServiceID: merchantId,
        templName: "new string",
        forOpClassCode: forOpClassCode,
        abonentCode: AbonentCode,
        externalAccountId: selectedAccount.accountId,
        amount,
        isFavourite: false
    }

    const checkCostumerDebt = () => {
        let checkDetails = {
            forPaySPCode: forPaySPCode || forPaySpCode,
            forMerchantCode: forMerchantCode || merchantCode,
            forMerchantServiceCode: forMerchantServiceCode || merchantServiceCode,
            serviceId: debtCode,
            abonentCode: AbonentCode
        }


        Presentation.checkCostumerDebt(checkDetails).then(res => {
            if(res.data.Ok) {
                let tempDebtData = res.data.Data.Structures;

                let tempDebt = tempDebtData?.filter(i => i.FieldCode === 'Debt' || i.FieldCode === "FineAmount" || i.FieldCode === "TotalDebt" || i.FieldCode === "Balance");
                if (tempDebt.length) {
                    setDebt(tempDebt[0].Value);
                    
                    setDebtCcy(tempDebt[0].CCY);
                    if (!debtCcy) {
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

        if(commisionTimeout.current)  clearTimeout(commisionTimeout.current);

        let querryParams = {
            forOpClassCode: forOpClassCode,
            forFundsSPCode: 'UniWallet',
            forMerchantCode: forMerchantCode,
            forMerchantServiceCode: forMerchantServiceCode,
            accountNumber: selectedAccount.accountNumber,
            InAmount: amount,
            ForCustomerType: selectedAccount.customerAccountType,
        }
        commisionTimeout.current = setTimeout(() => {
            Presentation.getPaymentDetails(querryParams).then(res => {
                if(res.data.ok) {
                    setPaymentCommision(res.data.data.amountFee)
                    setTotalPaymentAmount(res.data.data.amount)
                }
            })
        }, 1000);   
         
    }

    const selectAccount = (account) => {
        if(Array.isArray(account)){
            account = account[0]
        }
        setSelectedAccount(account);
    }

    const checkPaymentData = () => {
        let data = {
            paymentData, 
            info:{costumer, merchantImgUrl, merchantName }, 
            type: selectedAccount.type === 7? 'Unicard' : undefined
        };
        props.getPaymentData(data);
    }

   

    return (
        <div>
            <div style={{width: '100%', height: '100%', minHeight: 400,  boxSizing: 'border-box', padding: 20}}>
                <div>
                    <p>Please Choose a Card</p>
                    <SelectAccount account = { selectAccount } placeholder = 'Select Account' icon  current = { forFromAccount } hasUnicard = { canPayWithUnipoints }/>
                </div>
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 30}}>
                    <div style={{width: 300}}>
                        <div style = {{display: 'flex'}}>
                            <img style = {{width: 70}} src ={merchantImgUrl || imageUrl} alt = 'merchant logo' />
                            <p>{merchantName}</p>
                        </div>           
                    </div>
                    <div>
                    <Button clicked = {()=> props.getPaymentData({templateData})}>გადახდა</Button>
                    </div>
                    <div style = {{display: 'flex', flexFlow: 'column'}}>
                        <AppInput value = {AbonentCode} onInput = {(e) => setAbonentCode(e.target.value)} />
                        {AbonentCode !== ''? <Button clicked = { checkCostumerDebt }>შემომწმება</Button> : null}
                    </div>
                </div>
                <div className = 'payment-info'>
                    <div>{errorMessage}</div>
                    {debt? <Fragment>
                        <div className = 'd-flex'>
                            <p>დავალიანება:</p>
                            <p>{Number(debt).toFixed(2)} { formatCurrencySymbol(debtCcy)}</p>
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
                            <AppInput value = {amount}  onChange = {(e) => {setAmount(e.target.value); }  }/>
                        </div>
                    </Fragment> : null}
                    {paymentCommision !== null?<Fragment>
                        <div className = 'd-flex'>
                            <p>საკომისიო:</p>
                            <p>{paymentCommision?.toFixed(2)}</p>
                        </div>
                    </Fragment> : null}
                </div>
            </div>
            <hr/>
            <p>{totalPaymentAmount?.toFixed(2)}</p>
            <div className = 'd-flex'>
                <p style = {{marginRight: 10}}>მაქსიმალური თანხა: {maxAmount?.toFixed(2)}</p>
                <p>მინიმალური თანხა: {minAmount?.toFixed(2)}</p>
            </div>
             <Button clicked = { checkPaymentData }>გადახდა</Button>
        </div>
    )
}

FillPaymentData.propTypes = {
    merchantdata: PropTypes.object,
    forMerchantCode: PropTypes.string,
    forMerchantServiceCode: PropTypes.string,
    forOpClassCode: PropTypes.string,
    minAmount: PropTypes.number,
    maxAmount: PropTypes.number,
    selectedAccount: PropTypes.object,
    abonentCode: PropTypes.string,
    debt: PropTypes.string,
    debtCode: PropTypes.string,
    debtCcy: PropTypes.string,
    costumer: PropTypes.string,
    costumerAddress: PropTypes.string,
    amount: PropTypes.string,
    errorMessage: PropTypes.string,
    merchantId: PropTypes.number,
    paymentCommision: PropTypes.number,
    totalPaymentAmount: PropTypes.number,
    userAccounts: PropTypes.array

}

export default FillPaymentData
