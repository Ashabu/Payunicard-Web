import React, {useContext, useState, useRef, Fragment,useCallback, useEffect} from 'react';
import './payment.scss';
import { Context } from '../../Context/AppContext';
import { Button, Icon, Input, Select, SelectList } from '../UI/UiComponents';
import ComonFn from '../../Services/CommonFunctions';
import { Presentation, Transaction } from '../../Services/API/APIS';
import PropTypes from 'prop-types';



const  FillPaymentData = (props) => {
    const { forMerchantCode, forMerchantServiceCode, forOpClassCode, forPaySPCode, debtCode, minAmount, maxAmount , merchantImgUrl , merchantName} = props.merchantdata;
    console.log(props.merchantdata)

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
    const [ paymentCommision, setPaymentCommision ] = useState(0);
    const [ totalPaymentAmount, setTotalPaymentAmount ] = useState(0);


    const paymentData = { 
        forMerchantCode: forMerchantCode,
        forMerchantServiceCode: forMerchantServiceCode,
        serviceId: debtCode,
        amount: amount,
        abonentCode: abonentCode,
        forFundsSPCode: 'UniWallet',
        bankId: null,
        forPaySPCode: forPaySPCode,
        AccountId: selectedAccount.accountId,
        forOpClassCode: forOpClassCode,
   }

    const checkCostumerDebt = () => {
        let checkDetails = {
            forPaySPCode: forPaySPCode,
            forMerchantCode: forMerchantCode,
            forMerchantServiceCode: forMerchantServiceCode,
            serviceId: debtCode,
            abonentCode: abonentCode
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



    useEffect(() => {
        getCostumerCommision();
    }, [amount, selectedAccount.accountNumber])

    
    return (
        <div>
            <div style={{width: '100%', height: '100%', minHeight: 400,  boxSizing: 'border-box', padding: 20}}>
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
                            clicked={() => { setSelectedAccount(element); setVisible(false)}} >
                                <Icon iconUrl = { ComonFn.setLogoByAccountType(element.type) }/>{ element.accountNumber } 
                        </SelectList>)} 
                        />
                </div>
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 30}}>
                    <div style={{width: 300}}>
                        <div style = {{display: 'flex'}}>
                            <img style = {{width: 70}} src ={merchantImgUrl} alt = 'merchant logo' />
                            <p>{merchantName}</p>
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
                            <p>{Number(debt).toFixed(2)} {ComonFn.formatCurrencySymbol(debtCcy)}</p>
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
                            <Input value = {amount}  onChange = {(e) => {setAmount(e.target.value); }  }/>
                        </div>
                    </Fragment> : null}
                    {paymentCommision !== null?<Fragment>
                        <div className = 'd-flex'>
                            <p>საკომისიო:</p>
                            <p>{paymentCommision.toFixed(2)}</p>
                        </div>
                    </Fragment> : null}
                </div>
            </div>
            <hr/>
            <p>{totalPaymentAmount.toFixed(2)}</p>
            <div className = 'd-flex'>
                <p style = {{marginRight: 10}}>მაქსიმალური თანხა: {maxAmount.toFixed(2)}</p>
                <p>მინიმალური თანხა: {minAmount.toFixed(2)}</p>
            </div>
             <Button clicked = {()=> props.getPaymentData({paymentData, info:{costumer, merchantImgUrl, merchantName }})}>გადახდა</Button>
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
    paymentCommision: PropTypes.number,
    totalPaymentAmount: PropTypes.number,
    userAccounts: PropTypes.array

}

export default FillPaymentData
