import React, {Fragment, useState, useEffect, useContext, useRef} from 'react';
import './payments.scss';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router';
import {Context} from '../../Context/AppContext';
import { Presentation, Transaction, Template } from '../../Services/API/APIS';
import Layout from '../../Containers/Layout/Layout';
import { Backdrop, Loader, SidePanel, Widget, Search } from './../../Components/UI/UiComponents';
import PaymentCategory from './../../Components/Payments/PaymentCategory';
import PaymentPanel from '../../Components/Payments/PaymentPanel';
import PaymentTemplate from './../../Components/Payments/PaymentTemplate';
import SearchMerchants from './../../Components/Payments/SearchMerchants';



const Payments = () => {

    const { state } = useContext(Context);
    const { paymentServices , paymentTemplates } = state;

    const history = useHistory();
    const searchMerchant = useRef();

    const [ isLoading, setIsLoading ] = useState(false);

    const [ services, setServices ] = useState([]);
    const [ merchantServices, setMerchantServices ] = useState([]);
    const [ merchantData, setMerchantData] = useState({});
    const [ paymentStep, setPaymentStep] = useState(0);
    const [ paymentPanelVisible, setPaymentPanelVisible ] = useState(false);
    const [ templates, setTemplates ] = useState([]);
    const [ utilities, setUtilities ] = useState([]);
    const [ searchUtilies, setSearchUtilities ] = useState({data:[], search: false});
    const [ selectAllTemplates, setSelectAllTemplates ] = useState(false);
    


    useEffect(() => {
        let allTemplates  = templates.map(template => {
            template.checked = selectAllTemplates;
            return template;
        });
        setTemplates(allTemplates);
    }, [selectAllTemplates])

    useEffect(() => {
        setTemplates(paymentTemplates);
    }, [paymentTemplates]);

    useEffect(() => {
        setUtilities(paymentServices);
    }, [paymentServices]);

    useEffect(() => {
        
    }, [searchUtilies])



    const getServices = (id) =>{
        Presentation.getPaymentServices(id).then(res => {
            if(res.data.ok) {
                setServices(res.data.data.categories);
                setPaymentPanelVisible(true)
            }
        })
    }

    const getMerchantServices = (data, fromSerach = false) => {
        const { merchant } = data
        //if merchantCode prop is undefind, it means services has children
        if(!merchant.merchantCode && !fromSerach) {
            Presentation.getMetchantServices(merchant.categoryID).then(res => {
                if(res.data.ok) {
                    setMerchantServices(res.data.data.merchants);
                    setPaymentStep(1)
                }
            }).catch(error => {
                console.log(error)
            })
        } else {
            let querryParams = {
                forMerchantCode: merchant.merchantCode,
                forMerchantServiceCode: merchant.merchantServiceCode,
                forOpClassCode: 'B2B.F'
            }

            Presentation.getPaymentDetails(querryParams).then(res => {
                if(res.data.ok) {
                    if(fromSerach) setPaymentPanelVisible(true);
                    setMerchantData({...res.data.data, merchantName: merchant.name, merchantImgUrl: merchant.merchantServiceURL || merchant.imageUrl });
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
        let tempTemplates = templates;
        tempTemplates.map(template => {
            let i = template.findIndex(merchant => merchant.payTempID == id);
            template[i].checked = !template[i].checked;
            console.log( template[i].checked )
            return templates;
        })
        setTemplates(tempTemplates)

        
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

    const searchInUtilities = (value) => {
        if(searchMerchant.current) clearTimeout(searchMerchant.current)
        if(value.length <= 2){
            setSearchUtilities({data: [], search: false });
            
        } else {
            setIsLoading(true)
            setSearchUtilities(prevState => {return {...prevState, search: true} });
            searchMerchant.current = setTimeout(() => {
                Presentation.searchMerchants(value).then(res => {
                    setIsLoading(false);
                    setSearchUtilities(prevState => {return {...prevState, data: [...res.data.data.services]} });
                    console.log(searchUtilies)
                })
            }, 1000);
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
                // merchantData = { merchantData } 
                proceedPayment = { proceedPayment }/>}

        <div style = {{ marginLeft: 200}}>
            <p>WELCOME TO PAYMENTS</p>
            <Widget class = 'Utilities'>
                <div className = 'UtilityHeader'>
                    <span>კატეგორიები</span>
                    <Search  onsearch = { searchInUtilities }/>
                </div>
               {searchUtilies.search? <Fragment >
                   {isLoading? <Loader width = { 100 } heigh = { 100 }/> :
                    searchUtilies.data?.map((merchant, index) =>(
                        <SearchMerchants 
                            key = { index }  
                            merchants = { merchant } 
                            clicked = {() => getMerchantServices({ merchant }, true)}/>))}
                   
                   </Fragment> :
               <Fragment>
                {utilities.map((service, index) => (
                    <PaymentCategory key = { index } services = { service } clicked = {() => getServices(service.categoryID) }/>
                ))}
                </Fragment> }
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
