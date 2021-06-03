import React, {useState, useEffect, useContext} from 'react';
import './payments.scss';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router';
import {Context} from '../../Context/AppContext';
import { Presentation, Transaction, Template } from '../../Services/API/APIS';
import Layout from '../../Containers/Layout/Layout';
import { Backdrop, SidePanel, Widget, Search } from './../../Components/UI/UiComponents';
import PaymentCategory from './../../Components/Payments/PaymentCategory';
import PaymentPanel from '../../Components/Payments/PaymentPanel';
import PaymentTemplate from './../../Components/Payments/PaymentTemplate';



const Payments = () => {

    const { state } = useContext(Context);
    const { paymentServices , paymentTemplates } = state;

    const history = useHistory();

    const [ services, setServices ] = useState([]);
    const [ merchantServices, setMerchantServices ] = useState([]);
    const [ merchantData, setMerchantData] = useState({});
    const [ paymentStep, setPaymentStep] = useState(0);
    const [ paymentPanelVisible, setPaymentPanelVisible ] = useState(false);
    const [ templates, setTemplates ] = useState([]);
    const [ selectAllTemplates, setSelectAllTemplates ] = useState(false);
    


    useEffect(() => {
        let allTemplates  = paymentTemplates.map(template => {
            template.checked = selectAllTemplates;
            return template;
        });
        setTemplates(allTemplates);
    }, [selectAllTemplates])

    useEffect(() => {
        setTemplates(paymentTemplates);
    }, [paymentTemplates]);



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
            if(i === 0) {
                setMerchantServices([]);
            }
            setPaymentStep(i);
            return
        }

        if(merchantServices.length <= 0) {
            setPaymentStep(0);
        } else {
            setPaymentStep(paymentStep - 1);
            if(paymentStep === 1) {
                setMerchantServices([]);
            }
        }
    }

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

    const checkAllTemplates = () => {
        setSelectAllTemplates(!selectAllTemplates);
    }

    const toggleTemplateCheck = (id) => {
            
        setTemplates(templates => {
            let i = templates.findIndex(s => s.payTempID == id);
            templates[i].checked = !templates[i].checked;
            console.log( templates[i].checked )
            return [...templates];
        })

        
    }
    
    const editUtilityTemplateName = (data) => {
        Template.editUtilityTemplate(data).then(res => {
            console.log(res)
        })
    }

    const searchTemplates = (value) => {
        let paymentTemplats = paymentTemplates;
        let searchInTemplates = [...paymentTemplats].filter(t => {
            return t.abonentCode?.toLowerCase().match(value.toLowerCase()) || t.templName?.toLowerCase().match(value.toLowerCase()) || t.merchServiceName.toLowerCase().match(value.toLowerCase()) ; 
        })
        if (value == "") {
            setTemplates(paymentTemplates);
        } else {
            setTemplates(searchInTemplates);
        }
    }




    return (
        <Layout>
            <Backdrop show = { paymentPanelVisible } hide = { handlePaymentPanelClose }/>

            {services && <PaymentPanel 
                tabvisible = { paymentPanelVisible }
                close = { handlePaymentPanelClose }
                step = { paymentStep }
                onPaymentStep = { handlePaymentStep }
                services = { services } 
                merchantservices = { merchantServices } 
                merchantdata = { merchantData } 
                getServices = { getMerchantServices }
                merchantData = { merchantData } 
                proceedPayment = { proceedPayment }/>}

        <div style = {{ marginLeft: 200}}>
            <p>WELCOME TO PAYMENTS</p>
            <Widget class = 'Utilities'>
                {paymentServices.map((service, index) => (
                    <PaymentCategory key = { index } services = { service } clicked = {() => getServices(service.categoryID) }/>
                ))}
            </Widget>
            <Widget>
                <div>
                    <p>გადახდის შაბლონები</p>
                    <Search  onsearch = { searchTemplates }/>
                    <p onClick = { checkAllTemplates }>ყველას მონიშვნა</p>
                </div>
                
             {templates.map(payTemplate => (
                <PaymentTemplate 
                    key = { payTemplate.payTempID } 
                    template = { payTemplate } 
                    toggle = { toggleTemplateCheck }
                    editName = { editUtilityTemplateName }/>
                ))}           
            </Widget>
        </div>
        </Layout>
    )
}

Payments.propTypes = {

}

export default Payments
