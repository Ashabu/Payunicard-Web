import React, {useEffect, useState} from 'react';
import './payment.scss';
import PaymentServices from './PaymentServices';
import FillPaymentData from './FillPaymentData';
import { ErrorNotification, SidePanel } from '../UI/UiComponents';
import { Template } from '../../Services/API/APIS';

import PropTypes from 'prop-types';




const PaymentPanel = (props) => {
    const {tabvisible, services, merchantservices, merchantdata, step} = props;
    const [ successInfo, setSuccessInfo ] = useState({});
    const [ bredCrump, setBredCrump ] = useState([]);
    const [ errorArray, setErrorArray ] = useState([]);
    const [ templateName, setTemplateName ] = useState('')

   
    useEffect(() => {
        if(services[0]) {
            setBredCrump([services[0]?.name]);
        }
    }, [services] )

    const paymentData = (data) => {
        if(data.error){
            setErrorArray(prevState => { return [...prevState, data.error] } )
            return;
        }
        if(data.templateData) {
            props.saveTemplate(data.templateData)
        } else {
            props.proceedPayment(data.paymentData, data.type);
            setSuccessInfo(data.info);
        }
        
       
    }

    


    const handleBredCrump = (i) => {
        let cIndex = i;
        let crump;

        if(cIndex === 0){
            crump = [ bredCrump[0] ];
        } else {
            crump = bredCrump.slice(0, cIndex + 1);
        }

        setBredCrump(crump);

        if(merchantservices.length <= 0 && i !== 1){
            cIndex = 0;
        } else if(merchantservices.length <= 0 && i === 1) {
            cIndex = 2;
        }
        
        props.onPaymentStep(cIndex)

    }

    const handlePaymentStep = () => {
        if(bredCrump.length <= 0) return; 
        bredCrump.pop();
        setBredCrump(bredCrump);
        props.onPaymentStep();
       
    }
//
console.log('error message', errorArray)

    const clearErrorMessages = (error) => {
        
        let tempErrorArray = errorArray.filter(el => el !== error);
        console.log(tempErrorArray)
       setErrorArray([...tempErrorArray]);
        
    }
    return (
        <SidePanel
        
            bredcrump = { bredCrump }
            stepBack 
            onStepBack = { handlePaymentStep }
            visible = { tabvisible }
            closePanel = { props.close }
            bredClick = { handleBredCrump }
            errorContainer = {  <ErrorNotification errorMessages = { [...errorArray] } onClearError = { clearErrorMessages }/>  }>
                
                
            {step === 0? 
                <div>
                    
                    {services.slice(1).map((merchant, index) => (<PaymentServices key = {index} services = {merchant} 
                    clicked ={() => {props.getServices({merchant}); setBredCrump(prevState => {return [...prevState, merchant.name]}) }}/>))}
                </div>     
                 :
            step === 1?     
                <div>
                    {merchantservices.map(merchant => (<PaymentServices key ={ merchant.merchantServiceID } services  = { merchant } 
                    clicked ={() => {props.getServices({merchant}); setBredCrump(prevState => {return [...prevState, merchant.name]}) }} />))}
                </div>
               :
            step === 2?   
               <FillPaymentData merchantdata = { merchantdata } getPaymentData = { paymentData } />
               :
               <div>
                   <p>გადახდა წარმატებით შესრულდა</p>
                   <button onClick = {props.saveTemplate}>შაბლლონის შენახვა</button>
               </div>

            }
            <button onClick = {() => setErrorArray(prevState => { return [...prevState, 'test error 1']})}>test error 1</button>
            <button onClick = {() => setErrorArray(prevState => { return [...prevState, 'test error 2']})}>test error 2</button>
            <button onClick = {() => setErrorArray(prevState => { return [...prevState, 'test error 3']})}>test error 3</button>
        </SidePanel>
    );
}

PaymentPanel.propTypes = {
    
};

export default PaymentPanel;