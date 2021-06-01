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
            setBredCrump([services[0]?.name])
        
      }
        //debugger
    }, [services] )

    const paymentData = (data) => {
        props.proceedPayment(data.paymentData)
        setSuccessInfo(data.info)
    }

    const cc = (i) => {
        console.log(i)
        let temp = bredCrump;
        let a
        if(i === 0){
            a = [temp[0]]
        } else {
            a = temp.slice(0, i+1)
        }
        setBredCrump(a)

        props.onPaymentStep(i)

    }

    return (
        <SidePanel
            bredcrump = {bredCrump}
            stepBack 
            onStepBack = { props.onPaymentStep }
            visible = { tabvisible }
            closePanel = { props.close }
            bredClick = { cc }>
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