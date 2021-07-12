import React, {useState, useEffect, Fragment} from 'react';
import './verification.scss';
import { KYC, User } from '../../Services/API/APIS';
import { getKycFullYear } from '../../Services/CommonFunctions';
import PropTypes from 'prop-types';
import { SidePanel, Input, Button,  Select, SelectList } from '../../Components/UI/UiComponents';
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
    
})





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

const getKycData = (sessionId) => {
    KYC.GetKycData(sessionId).then(res => {
        console.log('get kyc data ===>', res.data.data.data[0])
        if(res.data.ok) {
            const { birthDate, 
                countryID, 
                countryName, 
                documentBackSide, 
                documentFrontSide, 
                documentNumber, 
                documetType, 
                firstName, 
                lastName, 
                nationality, 
                personalNumber,
                selfImages,
                sex
              } = res.data.data.data[0];
    
              let qwerty = getKycFullYear(birthDate);

              console.log(qwerty)
              debugger
              
        }
    }).catch(error => {console.log(error)});
}

const closeKycSession = (sessionId) => {
    KYC.CloseKycSession(sessionId).then(res => {
        console.log('kyc close session ===>', res.data)
        if(res.data.ok){
        const { birthDate, 
            countryID, 
            countryName, 
            documentBackSide, 
            documentFrontSide, 
            documentNumber, 
            documetType, 
            firstName, 
            lastName, 
            nationality, 
            personalNumber,
            selfImages,
            sex
          } = res.data.data;
          debugger

          let qwerty = getFullYear(birthDate);
          console.log(qwerty)
        } else {

        }

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
            <Input placeholder = 'ქალაქი/მუნიციპალიტეტი'/>
            <Input placeholder = 'მისამართი'/>
            <Input placeholder = 'საფოსტო ინდექსი'/>
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
            <Input placeholder = 'დამსაქმებელი'/>
            <Input placeholder = 'დაკავებული თანამდებობდა'/>    
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
        <Input type= 'checkbox'   />
        <Input type= 'checkbox'   />
        <Input type= 'checkbox'   />
        <Input type= 'checkbox'   />   
        <Input type= 'checkbox'   />
        <Input placeholder = 'სხვა...'/>
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
} else if (verificationStep > 5) {
    VerficationStep = (
        <span>........................</span>
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

