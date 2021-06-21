import React, {useContext, useEffect, useState} from 'react';
import PropTypes, { array } from 'prop-types';
import { Context } from '../../Context/AppContext';
import { Button ,SidePanel } from '../UI/UiComponents';
import { Presentation, Transaction } from '../../Services/API/APIS';
import SelectAccount from '../SelectAccount/SelectAccount';
import PayAllTemplate from './PayAllTemplate';
import PaymentDetails from './PaymentDetails';
import SelectedAccount from './../HOC/SelectedAccount/SelectedAccount';



const PayAllPaymentPanel = (props) => {
    const { state } = useContext(Context);
    const { paymentTemplates } = state;

    const [ selectedAccount, setSelectedAccount] = useState({});
    const [ canPayWithUnicard, setCanPayWithUnicard ] = useState(null);
    const [ templates, setTemplates ] = useState([]);
    const [ amountSum, setAmountSum ] = useState(0);
    const [ commissionSum, setCommissionSum ] = useState(0);
    const [ paymentStep, setPaymentStep] = useState(0);
    


    const [ test, setTest] = useState([]);

    useEffect(() => {
        setTemplates(paymentTemplates)
        ckeckForUniPoints(paymentTemplates)
    }, [paymentTemplates])

   

    const handleEditDebt = (val, i) => {
        templates[i].debt = val;
        setTemplates([...templates]);
        ckeckForUniPoints(templates);
    }

    
    const selectAccount = (account) => {
        setSelectedAccount(account)
    }

    const getPaymentCommision = (data = [], customerAccountType = 0, dueAmount = {a1: [], a2: []}) => {
        let debtArray = [...dueAmount.a1];
        let commissionArray = [...dueAmount.a2];
        
        if(data.length <= 0 ) {
            sumDueAmmount(commissionArray, 'commission');
            sumDueAmmount(debtArray, 'ammount');
            setPaymentStep(1)
            return;
        }
        let curPayment = data.pop()
        let params = {
            ForOpClassCode: curPayment.forOpClassCode,
            ForFundsSPCode: curPayment.forPaySpCode,
            ForMerchantCode: curPayment.merchantCode,
            ForMerchantServiceCode: curPayment.merchantServiceCode,
            InAmount: Math.abs(curPayment.debt),
            ForCustomerType: selectedAccount.customerAccountType
        }

        let payParams = {
            AccountId: selectedAccount.accountId,
            abonentCode: curPayment.abonentCode,
            amount: Math.abs(curPayment.debt),
            bankId: null,
            forFundsSPCode: "UniWallet",
            forMerchantCode: curPayment.merchantCode,
            forMerchantServiceCode:curPayment.merchantServiceCode,
            forOpClassCode: curPayment.forOpClassCode,
            forPaySPCode: curPayment.forPaySpCode,
            payTempID: curPayment.payTempID,
            serviceId: curPayment.debtCode
        }
        
        setTest(prevState => {return [...prevState, {...payParams}]})
       

        Presentation.getPaymentDetails(params).then(res => {
         
            if(res.data.ok) {
                
                let i = templates.findIndex(el => el.payTempID === curPayment.payTempID);
                templates[i].commission = res.data.data.amountFee;
                
                debtArray = [...debtArray, Math.abs(curPayment.debt)];
                commissionArray = [...commissionArray, res.data.data.amountFee ]
                setTemplates([...templates]);
                

                getPaymentCommision(data, customerAccountType, {a1: debtArray, a2: commissionArray});
            }
           
        }).catch((error) =>{ 
            console.log(error); 
            getPaymentCommision(data, customerAccountType, {a1: debtArray, a2: commissionArray}); 
        })
    }

    const sumDueAmmount = (data, type) => {
        let sum = data.reduce((a, b) =>  a+ b)
        if(type === 'commission') {
            setCommissionSum(sum)
        } else {
            setAmountSum(sum)
        }

    }

    const ckeckForUniPoints = (data) => {
        data.every(el => el.canPayWithUniPoints === true)? setCanPayWithUnicard(1) : setCanPayWithUnicard(0);
    }

    const payAllBills = () => {
        Transaction.startPayBatchTransaction(test)
    }
    
    
    let PayAllStep = null;
    
    if(paymentStep === 0) {
        PayAllStep = (
            <div style = {{padding: 20, boxSizing: 'border-box'}}>
                <SelectAccount account = { selectAccount } icon hasUnicard = { canPayWithUnicard }/>  
                <button onClick = {() => getPaymentCommision([...paymentTemplates], 2)}>კომისია</button> 
                {templates?.map((t, i) =>(<PayAllTemplate key ={i} template = { t } editDebt = {(val)=> handleEditDebt(val,i)}/>))}
            </div>
        )
    } else if (paymentStep === 1) {
        PayAllStep = (

            <div style = {{padding: 20, boxSizing: 'border-box'}}>
                <div style = {{background: '#F6F6F6', width: '100%', boxSizing: 'border-box', borderRadius: 7, paddingLeft:10, paddingRight: 10}}>
                    <SelectedAccount selected = { selectedAccount } icon = { true } />
                </div>
              <PaymentDetails data = { templates } commisionAmmount = { commissionSum } debtAmmount = { amountSum }/>  
              <button onClick = { payAllBills }>გადახდა</button>
            </div>

        )
    }


    return (
        <SidePanel visible = {props.payallvisible} closePanel = { props.close } >
            {PayAllStep}
            
        </SidePanel>
    );
}

PayAllPaymentPanel.propTypes = {
    
};


export default PayAllPaymentPanel;