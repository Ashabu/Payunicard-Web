import React, {useState, useEffect, useContext} from 'react';
import { useHistory } from 'react-router';
import {Context} from '../../Context/AppContext';
import PropTypes from 'prop-types';
import {Presentation} from '../../Services/API/APIS';
import Layout from '../../Containers/Layout/Layout';
import { Backdrop, SidePanel } from './../../Components/UI/UiComponents';
import PaymentCategory from './../../Components/Payments/PaymentCategory';
import PaymentServices from '../../Components/Payments/PaymentServices';
import FillPaymentData from '../../Components/Payments/FillPaymentData';




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

    const getMerchantServices = (service) => {
        if(!service.merchantCode) {
            Presentation.getMetchantServices(service.categoryID).then(res => {
                console.log(res.data)
                if(res.data.ok) {
                    setMerchantServices(res.data.data.merchants)
                }
            }).catch(error => {
                console.log(error)
            })
        } else {
            Presentation.getPaymentDetails(service.merchantCode, service.merchantServiceCode).then(res => {
                if(res.data.ok) {
                    setMerchantData({...res.data.data, merchantName: service.name, merchantImgUrl: service.merchantServiceURL })
                }
            }).catch(error => {
                console.log(error)
            })
        }
        setPaymentStep(1)
    }

    useEffect(() => {
    }, [])
    return (
        <Layout>
            <Backdrop show = {paymentPanelVisible} hide = {() => { setPaymentPanelVisible(false)}}/>
           

<SidePanel
    stepBack 
    visible = {paymentPanelVisible}
    closePanel = {()=> {setPaymentPanelVisible(false)}}>
        {paymentStep === 0? 
        <div>
            {services.map((service, index) => (<PaymentServices key = {index} services = {service} clicked ={() => getMerchantServices(service)}/>))}
        </div>     
         :
         <div>
            {merchantServices.map(service => (<PaymentServices key ={service.merchantServiceID} services  = {service} clicked ={() => getMerchantServices(service)}/>))}
            </div>
               
        }

            </SidePanel>
        

        <div style = {{height: 1000, overflow: 'scroll', marginLeft: 200}}>
            <p>WELCOME TO PAYMENTS</p>
            <div style = {{display: 'flex'}}>
                {paymentServices.map((service, index) => (
                    <PaymentCategory key = {index} services = {service} clicked = {() => getServices(service.categoryID) }/>
                ))}
            </div>
            
             <FillPaymentData merchantdata = { merchantData } />       
            
        </div>
        
        </Layout>
    )
}

Payments.propTypes = {

}

export default Payments
