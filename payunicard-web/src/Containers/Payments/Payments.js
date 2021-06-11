import React, {Fragment, useState, useEffect, useContext, useRef,} from 'react';
import './payments.scss';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router';
import { Context } from '../../Context/AppContext';
import { Presentation, Transaction, Template, User } from '../../Services/API/APIS';
import Layout from '../../Containers/Layout/Layout';
import { Icon, Backdrop, Loader, Widget, Search, SidePanel } from './../../Components/UI/UiComponents';
import ComonFn from '../../Services/CommonFunctions';
import PaymentCategory from './../../Components/Payments/PaymentCategory';
import PaymentPanel from '../../Components/Payments/PaymentPanel';
import PaymentTemplate from './../../Components/Payments/PaymentTemplate';
import SearchMerchants from './../../Components/Payments/SearchMerchants';
import TransactionDetail from './../../Components/TransactionDetails/TransactionDetail';
import {handleTransactionDetailView } from '../../Providers/TransactionProvider';
import TransactionDetailView from './../../Components/TransactionDetailView/TransactionDetailView';
import PayAllTemplate from './../../Components/Payments/PayAllTemplate';




const Payments = () => {

    const { state } = useContext(Context);
    const { paymentServices , paymentTemplates } = state;

    const history = useHistory();

    const navigate = (id) => {
        history.push({pathname: `/payments/TransactionDetail?tranId=${id}`});
    };

    const searchMerchant = useRef();

    const [ isLoading, setIsLoading ] = useState(false);

    const [ paymentStatements, setPaymentStatements ] = useState([]);
    const [ selectedTransaction, setSelectedTransaction ] = useState({});
    const [ detailVisible, setDetailVisible ] = useState(false) 

    const [ services, setServices ] = useState([]);
    const [ merchantServices, setMerchantServices ] = useState([]);
    const [ merchantData, setMerchantData] = useState({});
    const [ paymentStep, setPaymentStep] = useState(0);
    const [ paymentPanelVisible, setPaymentPanelVisible ] = useState(false);
    
    const [ templates, setTemplates ] = useState([]);
    const [ paymentData, setPaymentData ] = useState(null);
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
        
    }, [searchUtilies]);

    useEffect(() => {
        getPaymentStatements();
    }, [paymentTemplates])

    const getPaymentStatements = () => {
        let data = {
            rowCount: 10,
            opClass: 'P2B',
        }
        
        User.GetUserAccountStatements(data).then(res => {
            if(res.data.ok){
                setPaymentStatements(res.data.data.statements)
            }
            console.log(res.data)
        }).catch (error => {
            console.log(error)
        })
    }


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

    const proceedPayment = (data) => {
        setPaymentData(data);
        
        Transaction.startPaymentTransaction(data).then(res => {
            if(res.data.ok) {
                setPaymentData(prevState => { return{...prevState, longOpID: res.data.data.op_id }})
                setPaymentStep(3);
                
            }
        })

    }

    const checkAllTemplates = () => {
        setSelectAllTemplates(!selectAllTemplates);
    }

    const toggleTemplateCheck = (id) => {
        let tempTemplates = templates;
        let i = tempTemplates.findIndex(merchant => merchant.payTempID == id);
        tempTemplates[i].checked = !tempTemplates[i].checked
        setTemplates([...tempTemplates]);
    }

    const saveUtilityTemplate = (data) => {
        //const { abonentCode, AccountId, Amount, forFundsSPCode, forMerchantCode, forMerchantServiceCode, forOpClassCode, forPaySPCode, longOpID, serviceId } = paymentData;
        
        let templateData = {}
        if(data) {
            templateData = data
        } else {
            const { longOpID } = paymentData;
            templateData = {
                longOpID,
                templName: 'axali shabloni',
            }
        }
        Template.addUtilityTemplate(templateData).then(res => {
            if(res.data.ok) {
                Template.getUtilityTemplates().then(res => {
                    if(res.data.ok) {
                        let paymentTemplates = res.data.data.templates;
                        paymentTemplates.map(t => {
                            t.checked = false;
                            return t
                        })
                        setGlobalValue({paymentTemplates})
                        
                    }
                })
            }
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

    

    const opentTemplateTab = (data) => {
        setMerchantData(data);
        setPaymentStep(2); 
        setPaymentPanelVisible(true);
    }


    return (
        <Layout>
            <Backdrop show = { paymentPanelVisible || detailVisible } hide = { handlePaymentPanelClose }/>

            {services && <PaymentPanel 
                tabvisible = { paymentPanelVisible }
                close = { handlePaymentPanelClose }
                step = { paymentStep }
                onPaymentStep = { handlePaymentStep }
                services = { services } 
                merchantservices = { merchantServices } 
                merchantdata = { merchantData } 
                getServices = { getMerchantServices }
                proceedPayment = { proceedPayment }
                saveTemplate = { saveUtilityTemplate }/>}

            <SidePanel
                    visible = { detailVisible }
                    closePanel = {() => { setDetailVisible(false); history.goBack() }}>
                        <TransactionDetailView transaction = { selectedTransaction }/>
                    </SidePanel>    

        <div style = {{ marginLeft: 200}}>
            <p>WELCOME TO PAYMENTS</p>
            
            {templates.map(payTemplate => (
                <PayAllTemplate 
                    key = { payTemplate.payTempID } 
                    template = { payTemplate } 
                    />
                ))} 
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
                    editName = { editUtilityTemplateName }
                    clicked = {opentTemplateTab}
                    />
                ))}           
            </Widget>
            <Widget>
                <div>
                    <p>ბოლო ტრანზაქციები</p>
                </div>
                {paymentStatements.map((transaction, index) => (
                    <TransactionDetail key = { index } 
                    transaction = { transaction }
                    clicked = {() =>   {handleTransactionDetailView(transaction, setSelectedTransaction, navigate); setDetailVisible(true)}}/>
                ))}
            </Widget>
        </div>
        </Layout>
    )
}

Payments.propTypes = {

}

export default Payments
