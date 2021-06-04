import React, {useEffect, useState} from 'react';
import './payment.scss';
import PaymentServices from './PaymentServices';
import FillPaymentData from './FillPaymentData';
import { ErrorNotification, SidePanel } from '../UI/UiComponents';

import PropTypes from 'prop-types';




const PaymentPanel = (props) => {
    const {tabvisible, services, merchantservices, merchantdata, step} = props;
    const [ successInfo, setSuccessInfo] = useState({});
    const [ bredCrump, setBredCrump ] = useState([]);
    const [errorArray, setErrorArray] = useState([]);

    useEffect(() => {
        if(services[0]) {
            setBredCrump([services[0]?.name]);
        }
    }, [services] )

    const paymentData = (data) => {
        props.proceedPayment(data.paymentData);
        setSuccessInfo(data.info);
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

    return (
        <SidePanel
            bredcrump = { bredCrump }
            stepBack 
            onStepBack = { handlePaymentStep }
            visible = { tabvisible }
            closePanel = { props.close }
            bredClick = { handleBredCrump }>
                <ErrorNotification errorMessages = {errorArray}/>
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
               </div>

            }
        </SidePanel>
    );
}

PaymentPanel.propTypes = {
    
};

export default PaymentPanel;