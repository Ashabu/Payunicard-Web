import React, {useState, useEffect, Fragment} from 'react';
import './verification.scss';
import { KYC, User } from '../../Services/API/APIS';
import { getKycFullYear } from '../../Services/CommonFunctions';
import PropTypes from 'prop-types';
import { SidePanel, AppInput, Button,  RoundCheckmark, Select, SelectList } from '../../Components/UI/UiComponents';
import KvalifikaFrame from '../../Components/Kvalifika/KvalifikaFrame';






const Verification = (props) => {

const [ verificationStep, setVerificationStep ] = useState(0);
const [ countries, setCountries ] = useState([]);
const [ cities, setCities ] = useState([]);
const [ employmentStatusTypes, setEmploymentStatusTypes ] = useState([])
const [ workTypes, setWorkTypes ] = useState([]);
const [ expectedTurnover, setExpectedTurnover ] = useState([]);
const [ selectedCountry, setSelectedCountry ] = useState(null);
const [ selectedCity, setSelectedCity ] = useState(null);
const [ selectedEmploymentStatus, setSelecteEmploymentStatus ] = useState(null);
const [ selectedWorkTypes, setSelectedWorkTypes ] = useState(null);
const [ selectedTurnover, setSelectedTurnover ] = useState(null);
const [ kycFrameUrl, setKycFrameUrl ] = useState('');
const [ kycData, setKycData ] = useState({
    customerSelfContent: 'Selfie',
    customerSelfName: '',
    customerSelf: '',
    documentType: '',
    documentBackSideContent: 'Back', 
    documentBackSide: '',
    documentBackSideName: '',
    documentFrontSideContent: 'Front',
    documentFrontSide: '',
    documentFrontSideName: '', 
    birthDate: '',
    name: '',
    surname: '',
    personalID: '',
    passportNumber: '',
    birthCityId: 0,
    citizenshipCountryID: null,
    sex: null,
    birthDate: '',
    birthCity: '',
})
const [ hasSecondaryCitizenship, setHasSecondaryCitizenship] = useState(false)





useEffect(() => {
    getCountryList();
    getCityList();
    getEmploymentStatusTypeList();
    getWorkTypeList();
    getExpextedTurnoverList();
}, [])




const getCountryList = () => {
    User.GetCountryList().then(res => {
        setCountries(res.data.data.countries);
    }).catch(error => {console.log(error)});
};

const getCityList = () => {
    User.GetCityList().then(res => {
        setCities(res.data.data.cities);
    }).catch(error => {console.log(error)});
};

const getEmploymentStatusTypeList = () => {
    User.GetCustomerEmploymentStatusTypes().then(res => {
        setEmploymentStatusTypes(res.data.data.statuses);
    }).catch(error => {console.log(error)});
};

const getWorkTypeList = () => {
    User.GetCustomerWorkTypes().then(res => {
        setWorkTypes(res.data.data.types);
    }).catch(error => {console.log(error)});
};

const getExpextedTurnoverList = () => {
    User.GetCustomerExpectedTurnoverTypes().then(res => {
        setExpectedTurnover(res.data.datatypes);
    }).catch(error => {console.log(error)});
}

const startKycSession = () => {
    KYC.StartKycSession().then(res => {
        console.log(res.data);
        if(res.data.ok) {
            if(res.data.data.skipKycSession === true) {
                getKycData();
            } else {
                document.body.style.overflow = 'hidden';
                setKycFrameUrl(res.data.data.frameUrl);
            }
            
        }
    }).catch(error => {console.log(error)})
}

const getKycData = () => {
    KYC.GetKycData().then(res => {
        console.log('get kyc data ===>', res.data.data.data[0])
        if(res.data.ok) {
            const { 
                birthDate, 
                countryID, 
                documentBackSide, 
                documentFrontSide, 
                documentNumber, 
                documetType, 
                firstName, 
                lastName, 
                personalNumber,
                selfImages,
                sex
              } = res.data.data.data[0];

            setKycData({
                    customerSelfContent:  'Selfie',
                    customerSelfName: selfImages?.[0].split('/')[4],
                    customerSelf: selfImages?.[0],
                    documentType: documetType,
                    documentBackSideContent: 'Back', 
                    documentBackSide: documentBackSide,
                    documentBackSideName: documentBackSide?.split('/')[4],
                    documentFrontSideContent: 'Front',
                    documentFrontSide: documentFrontSide,
                    documentFrontSideName: documentFrontSide?.split('/')[4], 
                    name: firstName,
                    surname: lastName,
                    birthCityId: 0,
                    citizenshipCountryID: countryID,
                    sex: sex,
                    birthDate: getKycFullYear(birthDate),
                    personalID: personalNumber,
                    passportNumber: documentNumber
                
            });
            setVerificationStep(verificationStep + 1);
        }
    }).catch(error => {console.log(error)});
}

const closeKycSession = (sessionId) => {
    KYC.CloseKycSession(sessionId).then(res => {
        console.log('kyc close session ===>', res.data)
        if(res.data.ok){
            const { 
                birthDate, 
                countryID,
                documentBackSide, 
                documentFrontSide, 
                documentNumber, 
                documetType, 
                firstName, 
                lastName,
                personalNumber,
                selfImages,
                sex
              } = res.data.data;

              setKycData({
                customerSelfContent: 'Selfie',
                customerSelfName: selfImages?.[0].split('/')[4],
                customerSelf: selfImages?.[0],
                documentType: documetType,
                documentBackSideContent: 'Back', 
                documentBackSide: documentBackSide,
                documentBackSideName: documentBackSide?.split('/')[4],
                documentFrontSideContent: 'Front',
                documentFrontSide: documentFrontSide,
                documentFrontSideName: documentFrontSide?.split('/')[4], 
                name: firstName,
                surname: lastName,
                birthCityId: 0,
                citizenshipCountryID: countryID,
                sex: sex,
                birthDate: getKycFullYear(birthDate),
                personalID: personalNumber,
                passportNumber: documentNumber
            
            });
            setVerificationStep(verificationStep + 1);
        } else {

        }

    }).catch(error => {console.log(error)});
}


const finishCostumerRegistration = () => {

    let data = {
        customerSelfContent: kycData.customerSelfContent,
        customerSelfName: kycData.customerSelfName,
        customerSelf: kycData.customerSelf,
        documentType: kycData.documentType === 'ID'? 'Enum_IDCard' : 'Enum_Passport',
        documentBackSideContent: kycData.documentBackSideContent, 
        documentBackSide: kycData.documentBackSide,
        documentBackSideName: kycData.documentBackSideName,
        documentFrontSideContent: kycData.documentFrontSideContent,
        documentFrontSide: kycData.documentFrontSide,
        documentFrontSideName: kycData.documentFrontSideName, 
        birthDate: `${kycData.birthDate}-01-01`,
        name: kycData.name,
        surname: kycData.surname,
        birthCityId: 0,
        citizenshipCountryID: kycData.citizenshipCountryID,
        sex: kycData.sex === 'male'? 1 : 0,
        birthCity: kycData.birthCity,
    }
    if(kycData.documentType === 'ID') {
        data = {...data, personalID: kycData.personalID};
    } else {
        data = {...data, passportNumber: kycData.passportNumber};
    };


    User.FinishCostumerRegistration(data).then(res => {
        console.log(res.data)
    }).catch(error => {console.log(error)});
}








let VerficationStep = null;

if(verificationStep === 0) {
    VerficationStep = (
        <div className = 'vf-wrap'>
            <img src = '../../Assets/Images/vf-poster.svg' alt = ''/>
            <span>მესამე პირის წარმომადგენელი ხართ?</span>
            <span>მინდობილობის საფუძველზე შესაძლებელია მესამე პირისთვის უნისაფულის გახსნა</span>
            <Button clicked = {()=>setVerificationStep(1)}>არა</Button>
            <Button>დიახ</Button>
        </div>
    )
} else if (verificationStep === 1) {
    VerficationStep = (
        <div className = 'vf-wrap'>
            <span>ჩაწერეთ იურიდიული მისამართი</span>
            <Select
                data = { countries } 
                selected = { selectedCountry?.countryName }
                display ={(element, setVisible) => (
                    <SelectList 
                        key={ element.countryID } 
                        selected = { element } 
                        list
                        clicked={() => { setSelectedCountry(element); setVisible(false);}}>
                            {element.countryName}
                    </SelectList> 
                )}/>
            <AppInput value = '' labeltitle = 'ქალაქი/მუნიციპალიტეტი'/>
            <AppInput value = '' labeltitle = 'მისამართი'/>
            <AppInput value = '' labeltitle = 'საფოსტო ინდექსი'/>
        </div>
    )
} else if (verificationStep === 2) {
    VerficationStep = (
        <div className = 'vf-wrap'>
            <span>მიუთითეთ საქმიანობის სფერო</span>
            <Select
                data = { employmentStatusTypes } 
                selected = { selectedEmploymentStatus?.employmentStatus }
                display ={(element, setVisible) => (
                    <SelectList 
                        key={ element.employmentStatus } 
                        selected = { element } 
                        list
                        clicked={() => { setSelecteEmploymentStatus(element); setVisible(false);}}>
                            {element.employmentStatus}
                    </SelectList> 
                )}/>
             <Select
                data = { workTypes } 
                selected = { selectedWorkTypes?.customerEmploymentType }
                display ={(element, setVisible) => (
                    <SelectList 
                        key={ element.customerEmploymentTypeCode } 
                        selected = { element } 
                        list
                        clicked={() => { setSelectedWorkTypes(element); setVisible(false);}}>
                            {element.customerEmploymentType}
                    </SelectList> 
                )}/>
            <AppInput labeltitle = 'დამსაქმებელი'/>
            <AppInput labeltitle = 'დაკავებული თანამდებობდა'/>    
        </div>
    )
} else if (verificationStep === 3) {
    VerficationStep = (
        <div className = 'vf-wrap'>
        <span>მონიშნეთ მოსალოდნელი ბრუნვა 1 წლის განმავლობაში</span>
         <Select
            data = { workTypes } 
            selected = { selectedWorkTypes?.customerEmploymentType }
            display ={(element, setVisible) => (
                <SelectList 
                    key={ element.customerEmploymentTypeCode } 
                    selected = { element } 
                    list
                    clicked={() => { setSelectedWorkTypes(element); setVisible(false);}}>
                        {element.customerEmploymentType}
                </SelectList> 
            )}/>
        <span>მონიშნეთ მოსალოდნელი ბრუნვა 1 წლის განმავლობაში</span>
        <AppInput type= 'checkbox'   />
        <AppInput type= 'checkbox'   />
        <AppInput type= 'checkbox'   />
        <AppInput type= 'checkbox'   />   
        <AppInput type= 'checkbox'   />
        <AppInput labeltitle = 'სხვა...'/>
    </div>
    )
} else if (verificationStep === 4 ) {
    VerficationStep = (
        <div className = 'vf-wrap'>
            <span>გთხოვთ, მოემზადოთ ვიზუალური იდენტიფიკაციისთვის.</span>
            <img src = '../../Assets/Images/login_img.svg' alt = ''/>

            <span>თქვენ დაგჭირდებათ ვებკამერა და პირადობის დამადასტურებელი დოკუმენტი (პასპორტი ან პირადობის მოწმობა).</span>
        
    </div>
    )
} else if (verificationStep === 5) {
    VerficationStep = (
    <div className = 'vf-wrap'>
        <img src = '../../Assets/Images/loader.svg' alt ='icon' />
            <KvalifikaFrame frameUrl = { kycFrameUrl } onStartSession = { startKycSession } onCloseSession = { closeKycSession }/>
    </div>
    )
} else if (verificationStep === 6) {
    VerficationStep = (
        <div className = 'vf-wrap'>
        <AppInput  
            value = {kycData.name} 
            onChange = {(e) => setKycData(prevState => { return {...prevState,  name: e.target.value}})}
            type = 'text'
            labeltitle = 'სახელი'/>
        <AppInput  
            value = {kycData.surname} 
            onChange = {(e) => setKycData(prevState => { return {...prevState,  surname: e.target.value}})}
            type = 'text'
            labeltitle = 'გვარი'/>
        {kycData.documentType === 'ID'? 
        <AppInput  
            value = {kycData.personalID} 
            onChange = {(e) => setKycData(prevState => { return {...prevState,  personalID: e.target.value}})} 
            type = 'numeric'
            labeltitle = 'პირადი ნომერი'/> 
            : 
        <AppInput  
            value = {kycData.passportNumber} 
            onChange = {(e) => setKycData(prevState => { return {...prevState,  passportNumber: e.target.value}})}
            type = 'text'
            labeltitle = 'პასპორტის ნომერი'/>}
        <AppInput  
            value = {kycData.birthCity} 
            onChange = {(e) => setKycData(prevState => { return {...prevState,  birthCity: e.target.value}})} 
            type = 'text' 
            labeltitle = 'ქალაქი/დასახლებული პუნქტი'/>
        <AppInput  
            value = {kycData.birthDate} 
            onChange = {(e) => setKycData(prevState => { return {...prevState,  birthDate: e.target.value}})} 
            type = 'numeric' 
            labeltitle = 'დაბადების წელი'/>
        <AppInput  
            value = {kycData.sex} 
            onChange = {(e) => setKycData(prevState => { return {...prevState,  sex: e.target.value}})} 
            type = 'text'
            labeltitle = 'სქესი'/>
        <div style = {{display: 'flex'}}>
         <RoundCheckmark checkType = 'checkbox'  toggle = {() => setHasSecondaryCitizenship(!hasSecondaryCitizenship)} checked = { hasSecondaryCitizenship } id= 'citizenship' for = 'citizenship'/>
         <span>ორმაგი მოქალაქეობა</span>
         </div>
         {hasSecondaryCitizenship? 
         <Select
            data = { countries } 
            search
            selected = { selectedCountry?.countryName }
            display ={(element, setVisible) => (
                <SelectList 
                    key={ element.countryID } 
                    selected = { element } 
                    list
                    clicked={() => { setSelectedCountry(element); setVisible(false);}}>
                        {element.countryName}
                </SelectList> 
            )}/>: null }
        </div>
    )
} else if (verificationStep === 7) {
    VerficationStep = (
        <div className = 'vf-wrap'>
            <div >
                <span>გადაამოწმეთ პირადი ინფორმაცია</span>
                <span>დოკუმენტის ტიპი:</span>
                {kycData.documentType === 'ID'? 
                <Fragment>
                    <span>პირადობის მოწმობა</span>
                    <span>პირადი ნომერი:</span>
                    <span>{ kycData.personalNumber}</span>
                </Fragment> : 
                <Fragment>
                    <span>პასპორტი</span>
                    <span>პასპორტის ნომერი:</span>
                    <span>{ kycData.documentNumber}</span>
                </Fragment>
                }

                <span>სახელი, გვარი:</span>
                <span>{ kycData.name } { kycData.surname}</span>
                <span>დაბადების წელი:</span>
                <span>{ kycData.birthDate }</span>
            </div>
            <div>
                <img src = {kycData.customerSelfContent} alt = 'photo'/>
                <img src = {kycData.documentBackSide} alt = 'photo'/>
                <img src = {kycData.documentFrontSide} alt = 'photo'/>
            </div>
            <div>
            <RoundCheckmark 
                checkType = 'checkbox'  
                toggle = {() =>setHasSecondaryCitizenship(!hasSecondaryCitizenship)} 
                checked = { hasSecondaryCitizenship } 
                id= 'isAgree' 
                for = 'isAgree'/>
         <span>ვეთანხმები ფეიუნიქარდის მომსახურებით სარგებლობის პირობებს და ფეიუნიქარდის ვებგვერდით სარგებლობის პირობებს</span>
            </div>
            <Button clicked = {finishCostumerRegistration}>რეგისტრაცია</Button>
        </div> 

        
    )       
}



    return (

        <SidePanel visible = {props.visible}>
            {VerficationStep}
            <Button clicked = {() => setVerificationStep(verificationStep + 1)}>შემდეგი</Button>         
        </SidePanel>
    )
}

Verification.propTypes = {

}

export default Verification

