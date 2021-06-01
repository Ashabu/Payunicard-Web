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
        let crump;
        if(i === 0){
            debugger
            crump = [ bredCrump[0] ];
        } else {
            crump = bredCrump.slice(0, i + 1);
        }
        setBredCrump(crump);

        props.onPaymentStep(i)

    }

    const handlePaymentStep = () => {
        if(bredCrump.length <= 0) return;
        bredCrump.pop();
        setBredCrump(bredCrump);
        props.onPaymentStep();
        debugger
       
    }

    console.log(bredCrump)


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
                    {services.slice(1).map((s, index) => (<PaymentServices key = {index} services = {s} 
                    clicked ={() => {props.getServices({s}); setBredCrump(prevState => {return [...prevState, s.name]}) }}/>))}
                </div>     
                 :
            step === 1?     
                <div>
                    {merchantservices.map(s => (<PaymentServices key ={ s.merchantServiceID } services  = { s } 
                    clicked ={() => {props.getServices({s}); setBredCrump(prevState => {return [...prevState, s.name]}) }} />))}
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