import React, {useState, useEffect} from 'react';
import './verification.scss';
import { User } from '../../Services/API/APIS';
import PropTypes from 'prop-types';
import { SidePanel, Input, Button,  Select, SelectList } from '../../Components/UI/UiComponents';






const Verification = (props) => {

const [ verificationStep, setVerificationStep ] = useState(4);
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

