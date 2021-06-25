import React, {Fragment, useState, useEffect, useContext, useRef,} from 'react';
import './payments.scss';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router';
import { Context } from '../../Context/AppContext';
import { Presentation, Transaction, Template, User, Otp  } from '../../Services/API/APIS';
import AuthorizedLayout from './../AuthLayout/AuthorizedLayout';
import { Icon, Backdrop, Loader, Widget, Search, SidePanel, OTP } from './../../Components/UI/UiComponents';
import { search } from '../../Services/CommonFunctions';
import PaymentCategory from './../../Components/Payments/PaymentCategory';
import PaymentPanel from '../../Components/Payments/PaymentPanel';
import PaymentTemplate from './../../Components/Payments/PaymentTemplate';
import SearchMerchants from './../../Components/Payments/SearchMerchants';
import TransactionDetail from './../../Components/TransactionDetails/TransactionDetail';
import { handleTransactionDetailView } from '../../Providers/TransactionProvider';
import TransactionDetailView from './../../Components/TransactionDetailView/TransactionDetailView';
import PayAllPaymentPanel from '../../Components/Payments/PayAllPaymentPanel';
import PaymentDetails from '../../Components/Payments/PaymentDetails';
 


const Payments = () => {

    const { state, setGlobalValue  } = useContext(Context);
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
    const [ selectAllTemplates, setSelectAllTemplates ] = useState(true);
    
    //-----------------------------------
    const [ allvisible, setAllVisible ] = useState(false);
    const [ otpWindowVisible, setOtpWindowVisible ] = useState(false);
    const [ otpErrorText, setOtpErrorText ] = useState(null);
    const [ errors, setErrors ] = useState([]);
    const [ paymentType, setPaymentType ] = useState('');



    //-----------------------------------


    useEffect(() => {
        let allTemplates  = templates.map(template => {
            template.checked = selectAllTemplates;
            return template;
        });
        
        setTemplates(allTemplates);
    }, [selectAllTemplates])

    useEffect(() => {
        setUtilities(paymentServices);
    }, [paymentServices]);

    useEffect(() => {
        
    }, [searchUtilies]);

    useEffect(() => {
        setTemplates(paymentTemplates);
        getPaymentStatements();
    }, [paymentTemplates])




    const filteredTemplates = (data) => {
        return  data?.filter(el => el.checked === true && el.debt > 0);
    }
    const checkAllTemplates = () => {
        setSelectAllTemplates(!selectAllTemplates);
    }

    const toggleTemplateCheck = (id) => {
       
        let tempTemplates = templates;
        let i = tempTemplates.findIndex(t => t.payTempID == id);
        tempTemplates[i].checked = !tempTemplates[i].checked;
        // checkForPayAllTemplates(tempTemplates);
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
        let filterKeys  = ['abonentCode', 'templName', 'merchServiceName'];
        let searchInTemplates = search(paymentTemplats, filterKeys, value);
        
        if (value == "") {
            setTemplates(paymentTemplates);
        } else {
            setTemplates([...searchInTemplates]);
        }
    }

    const getPaymentStatements = () => {
        let data = {
            rowCount: 10,
            opClass: 'P2B',
        }
        
        User.GetUserAccountStatements(data).then(res => {
            if(res.data.ok){
                setPaymentStatements(res.data.data.statements)
            }
        }).catch (error => {
            console.log(error)
        })
    }

    const getServices = (id) =>{
        Presentation.getPaymentServices(id).then(res => {
            if(res.data.ok) {
                setServices(res.data.data.categories);
                setPaymentPanelVisible(true);
                setPaymentType('Single');
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
                    if(fromSerach) {
                        setPaymentPanelVisible(true);
                        setPaymentType('Single')
                    }
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
        setPaymentType('')
    } 
    
    const proceedPayment = (data, type) => {
        //აქ მოდის გადახდისთვის დასარეგისტრეირებელი data და ტიპი. 
        if(data.abonentCode === '') {
            setErrors(prevState => { return [...prevState, 'გთხოვთ შეამოწმოთ აბონენტი']});
            return;
        } else if(data.AccountId === undefined) {
            setErrors(prevState => { return [...prevState, 'გთხოვთ აირჩიეთ ანგარიში']});
            return;
        } else if (data.amount === '') {
            setErrors(prevState => { return [...prevState, 'გთხოვთ შეიყვანოთ თანხა']});
            return;
        } else if (data.amount < merchantData.minAmount) {
            setErrors(prevState => { return [...prevState, `მინიმალური გადასახდელი თანხა ${merchantData.minAmount}`]});
            return;
        } else if (data.amount > merchantData.maxAmount) {
            setErrors(prevState => { return [...prevState, `მაქსიმალური გადასახდელი თანხა ${merchantData.maxAmount}`]});
            return;
        } else {
            if(type === 'Unicard') {
                //აქ მოწმდება უნიქარდია თუ არა და შემდეგიძახება გადახდის რეგისტრაციის ფუნქცია.
                let unicardPayData = {
                    unicard: data.AccountId,
                    AccountId: null,
                    forFundsSPCode: 'UNICARD',
    
                }
                setOtpWindowVisible(true);
                Otp.UnicardOtp({card: data.AccountId}).then(res => {
                    if(res.data.ok) {
                        setPaymentData({...data, unicardOtpGuid: res.data.data.otpGuid, ...unicardPayData})
                    }
                })
                return;
    
            } else {
                setPaymentData(data);
                makePayment(data)
            }
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
                })
            }, 1000);
        }
    }

    const getOtpValue = (value) => {
        if(paymentData.length > 1) {
            let tempPaymentData = paymentData.map(el => {
                el.unicardOtp = value;
                return el
            });
            setPaymentData(tempPaymentData);
        } else {
            setPaymentData(prevState => { return {...prevState, unicardOtp: value}});
        }
        
       
    }

    const submitAction = (type) => {
        setOtpErrorText(null);
        //აქ მოწმდება 1 ცალის გადახდაა თუ რამდენიმესი ერთად
        if(type === 'Batch') {
            makeBatchPatment(paymentData);
            return
        } else {
            makePayment(paymentData);
            return;
        }
    }

    const opentTemplateTab = (data) => {
        setMerchantData(data);
        setPaymentStep(2); 
        setPaymentPanelVisible(true);
        setPaymentType('Single')
    }
    
    const payAllBills = (data, type) => {
        if(type === 'Unicard') {
            setOtpWindowVisible(true);
            Otp.UnicardOtp({card: data[0].AccountId}).then(res => {
                if(res.data.ok) {
                    let tempData = [...data].map(el => {
                        el.unicard = el.AccountId;
                        el.AccountId = null;
                        el.forFundsSPCode = 'UNICARD';
                        el.unicardOtpGuid = res.data.data.otpGuid;
                    return el
                })
                    setPaymentData([...tempData])
                }
            })
            return;
        } else {
            setPaymentData(data);
            makeBatchPatment(data);
        }
        
    }

    const makePayment = (data) => {
        Transaction.startPaymentTransaction(data).then(res => {
            if(res.data.ok) {
                if(otpWindowVisible) setOtpWindowVisible(false);
                setPaymentData(prevState => { return{...prevState, longOpID: res.data.data.op_id }})
                setPaymentStep(3);
            } else {
                if(res.data.errors[0].code  === 117) {
                    setOtpErrorText(res.data.errors[0].displayText)
                } else {
                    if(otpWindowVisible) setOtpWindowVisible(false);
                    setErrors(prevState => { return[...prevState, res.data.errors[0].displayText]});
                }
            }
        }).catch(error => {
            setErrors(prevState => { return [...prevState, error]});
            console.log(error)
        });
    } 

    const makeBatchPatment = (data) => {
        Transaction.startPayBatchTransaction(data).then(res => {
            if(res.data.ok) {
                if(otpWindowVisible) setOtpWindowVisible(false);
                console.log(res.data)
            } else {
                if(res.data.errors[0].code  === 117) {
                    setOtpErrorText(res.data.errors[0].displayText)
                } else {
                    if(otpWindowVisible) setOtpWindowVisible(false);
                    setErrors(prevState => { return[...prevState, res.data.errors[0].displayText]});
                    console.log('error', res.data.errors[0].displayText)
                }
            }
        }).catch(error => {
            console.log(error)
        });
    }
    const clearErrorMessages = (error) => {
        let tempErrorArray = errors.filter(el => el !== error);
        setErrors([...tempErrorArray]);
        
    }
    console.log('merchantData' , merchantData)
   

    return (
        <AuthorizedLayout pageName = "ჩემი გადახდები">
            <Backdrop show = { paymentPanelVisible || detailVisible || allvisible } hide = { handlePaymentPanelClose }/>
            <OTP
                otpVisible = { otpWindowVisible } 
                closeOtpWindow = {() => setOtpWindowVisible(false)}
                getOtpValue = { getOtpValue } 
                errorText = { otpErrorText }
                submitAction = {()=> submitAction(paymentType) }/>
                
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
                saveTemplate = { saveUtilityTemplate }
                onClearError = { clearErrorMessages }
                error = { errors }/>}

             <PayAllPaymentPanel 
                checkedTemplates = { filteredTemplates(templates) } 
                payallvisible = { allvisible } 
                close = {() =>setAllVisible(false)} 
                onPayAll = { payAllBills }
                error = { errors }/>   

            <SidePanel
                visible = { detailVisible }
                closePanel = {() => { setDetailVisible(false); history.goBack() }}>
                    <TransactionDetailView transaction = { selectedTransaction }/>
            </SidePanel>    

            <div style = {{ marginLeft: 200}}>
                <p>WELCOME TO PAYMENTS</p>
                
                
                <Widget class = 'Utilities'>
                    <div className = 'UtilityHeader'>
                        <span>კატეგორიები</span>
                        <Search  onsearch = { searchInUtilities }/>
                    </div>
                   {searchUtilies.search? 
                        <Fragment >
                            {isLoading? <Loader width = { 100 } heigh = { 100 }/> :
                             searchUtilies.data?.map((merchant, index) =>(
                                 <SearchMerchants 
                                     key = { index }  
                                     merchants = { merchant } 
                                     clicked = {() => getMerchantServices({ merchant }, true)}/>))}
                       </Fragment> :
                    <Fragment>
                        {utilities.map((service, index) => (
                            <PaymentCategory 
                                key = { index } 
                                services = { service } 
                                clicked = {() => getServices(service.categoryID) }/>
                        ))}
                    </Fragment>}
                </Widget>
                <Widget>
                    <div>
                        <p >გადახდის შაბლონები</p>
                        <Search  onsearch = { searchTemplates }/>
                        <p style = {{cursor: 'pointer'}} onClick = { checkAllTemplates }>ყველას მონიშვნა</p>
                        
                    </div>
                        
                    {templates?.map(payTemplate => (
                        <PaymentTemplate 
                            key = { payTemplate.payTempID } 
                            template = { payTemplate } 
                            onToggle = { toggleTemplateCheck }
                            editName = { editUtilityTemplateName }
                            clicked = { opentTemplateTab }
                            />
                        ))}
                    <button onClick = {()=> {setAllVisible(true); setPaymentType('Batch')}}>გადახდა</button>           
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
        </AuthorizedLayout>
    )
}

Payments.propTypes = {

}

export default Payments
