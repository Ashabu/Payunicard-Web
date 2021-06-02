import React, {useState, useEffect, useContext} from 'react';
import './payments.scss';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router';
import {Context} from '../../Context/AppContext';
import { Presentation, Transaction } from '../../Services/API/APIS';
import Layout from '../../Containers/Layout/Layout';
import { Backdrop, SidePanel } from './../../Components/UI/UiComponents';
import PaymentCategory from './../../Components/Payments/PaymentCategory';
import PaymentPanel from '../../Components/Payments/PaymentPanel';



const Payments = () => {

    const { state } = useContext(Context);
    const { paymentServices } = state;

    const history = useHistory();

    const [ services, setServices ] = useState([]);
    const [ merchantServices, setMerchantServices ] = useState([]);
    const [ merchantData, setMerchantData] = useState({});
    const [ paymentStep, setPaymentStep] = useState(0);
    const [ paymentPanelVisible, setPaymentPanelVisible ] = useState(false)


    const getServices = (id) =>{
        Presentation.getPaymentServices(id).then(res => {
            if(res.data.ok) {
                setServices(res.data.data.categories);
                setPaymentPanelVisible(true)
            }
        })
    }

    const getMerchantServices = (data) => {
        const { s } = data
        //if merchantCode prop is undefind, it means services has children
        if(!s.merchantCode) {
            Presentation.getMetchantServices(s.categoryID).then(res => {
                console.log(res.data)
                if(res.data.ok) {
                    setMerchantServices(res.data.data.merchants);
                    setPaymentStep(1)
                }
            }).catch(error => {
                console.log(error)
            })
        } else {
            let querryParams = {
                forMerchantCode: s.merchantCode,
                forMerchantServiceCode: s.merchantServiceCode,
                forOpClassCode: 'B2B.F'
            }

            Presentation.getPaymentDetails(querryParams).then(res => {
                if(res.data.ok) {
                    setMerchantData({...res.data.data, merchantName: s.name, merchantImgUrl: s.merchantServiceURL || s.imageUrl });
                    setPaymentStep(2)
                }
            }).catch(error => {
                console.log(error)
            })
        }
        
    }

    const handlePaymentStep = (i) => {
        if(paymentStep === 0) return;
        if(i !== undefined) {
            setPaymentStep(i);
            return
        }
        if(merchantServices.length <= 0) {
            
            setPaymentStep(0);
        } else {
            setPaymentStep(paymentStep - 1);
        }
        
    }
//უნდა გავანულო merchantServices 0 სტეპზე გადმოსვლისას 
    const handlePaymentPanelClose = () => {
        setPaymentPanelVisible(false);
        setPaymentStep(0);
        setServices([]);
        setMerchantServices([]);
    } 

    const proceedPayment = (paymentData) => {
        Transaction.startPaymentTransaction(paymentData).then(res => {
            if(res.data.ok) {
                setPaymentStep(3);
            }
        })

    }

    // console.log('paymentStep ==>',paymentStep, 'services ==>', services, 'merchantServices ==>', merchantServices)


    useEffect(() => {
    }, [])

    return (
        <Layout>
            <Backdrop show = {paymentPanelVisible} hide = { handlePaymentPanelClose }/>

            {services && <PaymentPanel 
                tabvisible = {paymentPanelVisible}
                close = { handlePaymentPanelClose }
                step = { paymentStep }
                onPaymentStep = { handlePaymentStep }
                services = { services } 
                merchantservices = { merchantServices } 
                merchantdata = { merchantData } 
                getServices = { getMerchantServices }
                merchantData = { merchantData } 
                proceedPayment = { proceedPayment }/>}

        <div style = {{height: 1000, overflow: 'scroll', marginLeft: 200}}>
            <p>WELCOME TO PAYMENTS</p>
            <div style = {{display: 'flex'}}>
                {paymentServices.map((service, index) => (
                    <PaymentCategory key = {index} services = {service} clicked = {() => getServices(service.categoryID) }/>
                ))}
            </div>
        </div>
        </Layout>
    )
}

Payments.propTypes = {

}

export default Payments
