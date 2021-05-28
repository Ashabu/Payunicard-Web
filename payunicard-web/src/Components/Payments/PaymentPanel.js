import React, {useState} from 'react';
import './payment.scss';
import PaymentServices from './PaymentServices';
import FillPaymentData from './FillPaymentData';
import { SidePanel } from '../UI/UiComponents';

import PropTypes from 'prop-types';




const PaymentPanel = (props) => {
    const {tabvisible, services, merchantservices, merchantdata, step} = props;
    const [ successInfo, setSuccessInfo] = useState({})
    const mome = (data) => {
        debugger
        props.proceedPayment(data.paymentData)
        setSuccessInfo(data.info)

    }

    return (
        <SidePanel
            stepBack 
            visible = {tabvisible}
            closePanel = {props.close}>
            {step === 0? 
                <div>
                    {services.map((s, index) => (<PaymentServices key = {index} services = {s} clicked ={() => props.getServices({s})}/>))}
                </div>     
                 :
            step === 1?     
                <div>
                    {merchantservices.map(s => (<PaymentServices key ={s.merchantServiceID} services  = {s} clicked ={() => props.getServices({s})} />))}
                </div>
               :
            step === 2?   
               <FillPaymentData merchantdata = {merchantdata} getPaymentData = {mome} />
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