import React, {useContext, useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import { Context } from '../../Context/AppContext';
import { Button ,SidePanel } from '../UI/UiComponents';
import { Presentation } from '../../Services/API/APIS';
import SelectAccount from '../SelectAccount/SelectAccount';
import PayAllTemplate from './PayAllTemplate';

const PayAllPaymentPanel = (props) => {
    const { state } = useContext(Context);
    const { paymentTemplates } = state

    const [ templates, setTemplates ] = useState([]);
    const [ paymentStep, setPaymentStep] = useState(0);

    useEffect(() => {
        setTemplates(paymentTemplates)
    }, [paymentTemplates])

    const handleEditDebt = (val, i) => {
        templates[i].debt = val;
        setTemplates([...templates])
    }

    const getPaymentCommision = (data = [], customerAccountType = 2) => {
        if(data.length <= 0 ) {
            return;
        }

        let curPayment = data.pop()

        let params = {
            ForOpClassCode: curPayment.forOpClassCode,
            ForFundsSPCode: curPayment.forPaySpCode,
            ForMerchantCode: curPayment.merchantCode,
            ForMerchantServiceCode: curPayment.merchantServiceCode,
            InAmount: Math.abs(curPayment.debt),
            ForCustomerType: customerAccountType
        }

        Presentation.getPaymentDetails(params).then(res => {
            if(res.data.ok) {
                let i = templates.findIndex(el => el.payTempID === curPayment.payTempID);
                debugger
                templates[i].commission = res.data.data.amountFee;
                
                setTemplates([...templates]);

                getPaymentCommision(data, customerAccountType);
            }

           
        }).catch((error) =>{ 
            console.log(error); 
            getPaymentCommision(data, customerAccountType); 
        })

        console.log(templates)
    }
    






    return (
        <SidePanel visible = {props.payallvisible}>
            <div style = {{padding: 20, boxSizing: 'border-box'}}>
             <SelectAccount/>  
             <button onClick = {() => getPaymentCommision(paymentTemplates, 2)}>კომისია</button> 
             {templates?.map((t, i) =>(<PayAllTemplate key ={i} template = { t } editDebt = {(val)=> handleEditDebt(val,i)}/>))}
            </div>
            <div>

            </div>
            
        </SidePanel>
    );
}

PayAllPaymentPanel.propTypes = {
    
};


export default PayAllPaymentPanel;