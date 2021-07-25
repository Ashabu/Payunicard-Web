import React, { useState, useEffect, Fragment } from 'react';
import './verification.scss';
import { KYC, User } from '../../Services/API/APIS';
import { getKycFullYear } from '../../Services/CommonFunctions';
import PropTypes from 'prop-types';
import { SidePanel, AppInput, Button, RoundCheckmark, Select, SelectList } from '../../Components/UI/UiComponents';
import { SelectCountry, SelectEmploymentStatus, SelectEmploymentStatusType, SelectWorkType, SelectExpectedTurnover } from '../../Components/Selects/index';
import KvalifikaFrame from '../../Components/Kvalifika/KvalifikaFrame';
import PropgreSteps from '../../Components/UI/ProgressSteps/PropgreSteps';






const Verification = (props) => {
    const stepBacks = [0, 4, 6, 8]


    const [step, setStep] = useState(0);
    const [countries, setCountries] = useState([]);
    const [factCity, setFactCity] = useState('');
    const [factAddress, setFactAddress] = useState('');
    const [factPostalCode, setFactPostalCode] = useState('');
    const [cities, setCities] = useState([]);
    const [employmentStatusTypes, setEmploymentStatusTypes] = useState([]);
    const [workTypes, setWorkTypes] = useState([]);
    const [expectedTurnover, setExpectedTurnover] = useState([]);
    const [selectedCountryID, setSelectedCountryID] = useState(null);
    const [selectedCity, setSelectedCity] = useState(null);
    const [employmentStatusCode, setEmploymentStatusCode] = useState(null);
    const [employmentTypeCode, setEmploymentTypeCode] = useState(null);
    const [employer, setEmployer] = useState('');
    const [workPosition, setWorkPosition] = useState('');
    const [expectedTurnoverCode, setExpectedTurnoverCode] = useState(null);
    const [hasUtility, setHasUtility] = useState(false);
    const [hasTransport, setHasTransport] = useState(false);
    const [hasTelecomunication, setHasTelecomunication] = useState(false);
    const [hasInternatiolalTransactions, setHasInternatiolalTransactions] = useState(false);
    const [hasGambling, setHasGambling] = useState(false);
    const [hasOther, setHasOther] = useState(false);
    const [otherDesctiption, setOtherDesctiption] = useState('');
    const [kycFrameUrl, setKycFrameUrl] = useState('');
    const [kycData, setKycData] = useState({
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
        sex: '',
        birthDate: '',
    })
    const [birthCity, setBirthCity] = useState('')
    const [hasSecondaryCitizenship, setHasSecondaryCitizenship] = useState(false);
    const [isAgreedTerms, setIsAgreedTerms] = useState(false);
    const [stepError, setStepError] = useState(false);

    let headerText = 'იდენტიფიკაცია'


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
        }).catch(error => { console.log(error) });
    };

    const getCityList = () => {
        User.GetCityList().then(res => {
            setCities(res.data.data.cities);
        }).catch(error => { console.log(error) });
    };

    const getEmploymentStatusTypeList = () => {
        User.GetCustomerEmploymentStatusTypes().then(res => {
            setEmploymentStatusTypes(res.data.data.statuses);
        }).catch(error => { console.log(error) });
    };

    const getWorkTypeList = () => {
        User.GetCustomerWorkTypes().then(res => {
            setWorkTypes(res.data.data.types);
        }).catch(error => { console.log(error) });
    };

    const getExpextedTurnoverList = () => {
        User.GetCustomerExpectedTurnoverTypes().then(res => {
            setExpectedTurnover(res.data.data.types);
        }).catch(error => { console.log(error) });
    };

    const selectCountry = (element) => {
        setSelectedCountryID(element.countryID);
    };

    const selectCity = (element) => {
        setSelectedCity(element.cityId);
    };

    const selectEmploymentStatus = (element) => {
        console.log(element.employmentStatusCode)
        setEmploymentStatusCode(element.employmentStatusCode);
    };

    const selectWorkType = (element) => {
        setEmploymentTypeCode(element.customerEmploymentTypeCode);
    };

    const selectExpectedTurnover = (element) => {
        setExpectedTurnoverCode(element.expectedTurnoverCode);
    };

    const selectSecondaryCitizenship = (element) => {
        console.log('selectSecondaryCitizenship', element)
    };

    const handleStepBack = () => {

        setStep(step - 1);
    }

    const verificationFlow = () => {
        headerText = 'დამატებითი მონაცემები'
        if (step === 3) {
            costumerRegistration();
            return;
        }
        if (step === 7) {
            finishCostumerRegistration();
            return;
        }
        if (step > 8) return;
        setStep(step + 1);
    }

    const startKycSession = () => {
        KYC.StartKycSession().then(res => {
            console.log(res.data);
            if (res.data.ok) {
                if (res.data.data.skipKycSession === true) {
                    getKycData();
                } else {
                    document.body.style.overflow = 'hidden';
                    setKycFrameUrl(res.data.data.frameUrl);
                }

            }
        }).catch(error => { console.log(error) })
    }

    const getKycData = () => {
        KYC.GetKycData().then(res => {
            console.log('get kyc data ===>', res.data.data.data[0])
            if (res.data.ok) {
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
                setStep(step + 1);
            }
        }).catch(error => { console.log(error) });
    }

    const closeKycSession = (sessionId) => {
        KYC.CloseKycSession(sessionId).then(res => {
            console.log('kyc close session ===>', res.data)
            if (res.data.ok) {
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
                setStep(step + 1);
            } else {

            }

        }).catch(error => { console.log(error) });
    }

    const costumerRegistration = () => {
        let data = {
            isResident: selectedCountryID == 79 ? true : false,
            factCountryID: selectedCountryID,
            factCity,
            factCityID: 0,
            factAddress,
            factPostalCode,
            legalCountryID: selectedCountryID,
            legalCity: factCity,
            legalCityID: 0,
            legalAddress: factAddress,
            legalPostalCode: factPostalCode,
            employmentStatusCode,
            employmentTypeCode,
            employer,
            workPosition,
            expectedTurnoverCode,
            hasUtility,
            hasTransport,
            hasTelecomunication,
            hasInternatiolalTransactions,
            hasGambling,
            hasOther,
            otherDesctiption: '',
            termID: 1
        }

        User.CostumerRegistration(data).then(res => {
            if (stepError) setStepError(false);
            if (res.data.ok) {
                headerText = 'დამატებითი მონაცემები'
                setStep(step + 1);
            } else {
                setStepError(true);
            }
        }).catch(error => { console.log(error); setStepError(true) });
    }

    const finishCostumerRegistration = () => {

        let data = {
            customerSelfContent: kycData.customerSelfContent,
            customerSelfName: kycData.customerSelfName,
            customerSelf: kycData.customerSelf,
            documentType: kycData.documentType === 'ID' ? 'Enum_IDCard' : 'Enum_Passport',
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
            sex: kycData.sex === 'male' ? 1 : 0,
            birthCity,
        }
        if (kycData.documentType === 'ID') {
            data = { ...data, personalID: kycData.personalID };
        } else {
            data = { ...data, passportNumber: kycData.passportNumber };
        };


        User.FinishCostumerRegistration(data).then(res => {
            if (stepError) setStepError(false);
            if (res.data.ok) {
                headerText = 'იდენტიფიკაცია'
                setStep(step + 1);
            } else {
                setStepError(true);
            }
        }).catch(error => { console.log(error); setStepError(true) });
    }






    let VerficationStep = null;

    if (step === 0) {
        VerficationStep = (
            <div className='vf-wrap'>
                <img src='../../Assets/Images/vf-poster.svg' alt='poster' />

                <div className='vf-infotext'>
                    <span>მესამე პირის წარმომადგენელი ხართ?</span>
                    <span>მინდობილობის საფუძველზე შესაძლებელია მესამე პირისთვის უნისაფულის გახსნა</span>
                </div>

                    <div className='vf-infotext'>
                        <span>მესამე პირის წარმომადგენელი ხართ?</span>
                        <span>მინდობილობის საფუძველზე შესაძლებელია მესამე პირისთვის უნისაფულის გახსნა</span>
                    </div>


            </div>
        )
    } else if (step === 1) {
        VerficationStep = (
            <div className='vf-wrap'>
                <span className='step-title'>ჩაწერეთ იურიდიული მისამართი</span>
                <SelectCountry
                    placeholder='აირჩიეთ ქვეყანა'
                    countries={countries}
                    handleSelect={selectCountry} />
                <AppInput
                    style={{ marginBottom: 20 }}
                    labeltitle='ქალაქი/მუნიციპალიტეტი'
                    value={factCity}
                    onChange={e => setFactCity(e.target.value)} />
                <AppInput
                    style={{ marginBottom: 20 }}
                    labeltitle='მისამართი'
                    value={factAddress}
                    onChange={e => setFactAddress(e.target.value)} />
                <AppInput
                    labeltitle='საფოსტო ინდექსი'
                    style={{ marginBottom: 20 }}
                    value={factPostalCode}
                    onChange={e => setFactPostalCode(e.target.value)} />
            </div>
        )
    } else if (step === 2) {
        VerficationStep = (
            <div className='vf-wrap'>
                <span className='step-title'>მიუთითეთ საქმიანობის სფერო</span>
                <SelectEmploymentStatusType
                    placeholder='აირჩიეთ დასაქმების სტატუსი'
                    employmentStatusTypes={employmentStatusTypes}
                    handleSelect={selectEmploymentStatus} />
                {employmentStatusCode === 'Employed' || employmentStatusCode === 'Student' ?
                    <SelectWorkType
                        placeholder='აირჩიეთ საქმიანობის სფერო'
                        workTypes={workTypes}
                        handleSelect={selectWorkType} /> : null}
                {employmentStatusCode === 'Employed' || employmentStatusCode === 'Student' ?
                    <Fragment>
                        <AppInput
                            style={{ marginBottom: 20 }}
                            labeltitle='დამსაქმებელი'
                            value={employer}
                            onChange={e => setEmployer(e.target.value)} />
                        <AppInput
                            style={{ marginBottom: 20 }}
                            labeltitle='დაკავებული თანამდებობდა'
                            value={workPosition}
                            onChange={e => setWorkPosition(e.target.value)} />
                    </Fragment> : null}
            </div>
        )
    } else if (step === 3) {
        VerficationStep = (
            <div className='vf-wrap'>
                <span className='step-title'>მონიშნეთ მოსალოდნელი ბრუნვა 1 წლის განმავლობაში</span>
                <SelectExpectedTurnover
                    placeholder='აირჩიეთ მოსალოდნელი ბრუნვა'
                    expectedTurnover={expectedTurnover}
                    handleSelect={selectExpectedTurnover} />
                <span className='step-title'>მონიშნეთ მოსალოდნელი ტრანზაქციების კატეგორიები</span>
                <RoundCheckmark
                    style={{ marginBottom: 10 }}
                    id='utility'
                    for='utility'
                    labelTitle='კომუნალური და კომუნიკაციები'
                    toggle={() => { setHasUtility(!hasUtility) }}
                    checked={hasUtility} />
                <RoundCheckmark
                    style={{ marginBottom: 10 }}
                    id='transport'
                    for='transport'
                    labelTitle='ტრანსპორტი'
                    toggle={() => { setHasTransport(!hasTransport) }}
                    checked={hasTransport} />
                <RoundCheckmark
                    style={{ marginBottom: 10 }}
                    id='intTransactions'
                    for='intTransactions'
                    labelTitle='საერთაშორისო ტრანზაქციები'
                    toggle={() => { setHasInternatiolalTransactions(!hasInternatiolalTransactions) }}
                    checked={hasInternatiolalTransactions} />
                <RoundCheckmark
                    style={{ marginBottom: 10 }}
                    id='gambling'
                    for='gambling'
                    labelTitle='ტოტალიზატორი, აზარტული ონლაინ თამაშები'
                    toggle={() => { setHasGambling(!hasGambling) }}
                    checked={hasGambling} />
                <RoundCheckmark
                    style={{ marginBottom: 10 }}
                    id='other'
                    for='other'
                    labelTitle='სხვა'
                    toggle={() => { setHasOther(!hasOther) }}
                    checked={hasOther} />
                {hasOther ? <AppInput labeltitle='სხვა...' value={otherDesctiption} onChange={e => setOtherDesctiption(e.target.value)} /> : null}
            </div>
        )
    } else if (step === 4) {
        VerficationStep = (
            <div className='vf-wrap'>
                <span className='ident-title'>გთხოვთ, მოემზადოთ ვიზუალური იდენტიფიკაციისთვის.</span>
                <img src='../../Assets/Images/login_img.svg' alt='' />
                <span className='ident-info'>თქვენ დაგჭირდებათ ვებკამერა და პირადობის დამადასტურებელი დოკუმენტი (პასპორტი ან პირადობის მოწმობა).</span>

            </div>
        )
    } else if (step === 5) {
        VerficationStep = (
            <div className='vf-wrap'>
                <img src='../../Assets/Images/loader.svg' alt='icon' />
                <KvalifikaFrame frameUrl={kycFrameUrl} onStartSession={startKycSession} onCloseSession={closeKycSession} />
            </div>
        )
    } else if (step === 6) {
        VerficationStep = (
            <div className='vf-wrap'>
                <AppInput
                    style={{ marginBottom: 20 }}
                    value={kycData.name}
                    onChange={(e) => setKycData(prevState => { return { ...prevState, name: e.target.value } })}
                    type='text'
                    labeltitle='სახელი' />
                <AppInput
                    style={{ marginBottom: 20 }}
                    value={kycData.surname}
                    onChange={(e) => setKycData(prevState => { return { ...prevState, surname: e.target.value } })}
                    type='text'
                    labeltitle='გვარი' />
                {kycData.documentType === 'ID' ?
                    <AppInput
                        style={{ marginBottom: 20 }}
                        value={kycData.personalID}
                        onChange={(e) => setKycData(prevState => { return { ...prevState, personalID: e.target.value } })}
                        type='numeric'
                        labeltitle='პირადი ნომერი' />
                    :
                    <AppInput
                        style={{ marginBottom: 20 }}
                        value={kycData.passportNumber}
                        onChange={(e) => setKycData(prevState => { return { ...prevState, passportNumber: e.target.value } })}
                        type='text'
                        labeltitle='პასპორტის ნომერი' />}
                <AppInput
                    style={{ marginBottom: 20 }}
                    value={birthCity}
                    onChange={(e) => setBirthCity(e.target.value)}
                    type='text'
                    labeltitle='ქალაქი/დასახლებული პუნქტი' />
                <AppInput
                    style={{ marginBottom: 20 }}
                    value={kycData.birthDate}
                    onChange={(e) => setKycData(prevState => { return { ...prevState, birthDate: e.target.value } })}
                    type='numeric'
                    labeltitle='დაბადების წელი' />
                <AppInput
                    style={{ marginBottom: 20 }}
                    value={kycData.sex}
                    onChange={(e) => setKycData(prevState => { return { ...prevState, sex: e.target.value } })}
                    type='text'
                    labeltitle='სქესი' />
                <SelectCountry
                    placeholder='აირჩიეთ მოქალაქეობა'
                    countries={countries}
                    current={kycData.citizenshipCountryID}
                    handleSelect={selectCountry}
                />
                <div style={{ display: 'flex' }}>
                    <RoundCheckmark
                        style={{ marginBottom: 10 }}
                        id='citizenship'
                        for='citizenship'
                        toggle={() => setHasSecondaryCitizenship(!hasSecondaryCitizenship)} checked={hasSecondaryCitizenship} id='citizenship' for='citizenship' />
                    <span className='step-title' style={{ marginLeft: 10 }}>ორმაგი მოქალაქეობა</span>
                </div>
                {hasSecondaryCitizenship ?
                    <SelectCountry
                        placeholder='აირჩიეთ ქვეყანა'
                        countries={countries}
                        handleSelect={selectSecondaryCitizenship} /> : null}
            </div>
        )
    } else if (step === 7) {
        VerficationStep = (
            <div className='vf-wrap'>
                <span className='step-title'>გადაამოწმეთ პირადი ინფორმაცია</span>
                <div className='check-info'>
                    <span className='info-head'>დოკუმენტის ტიპი:</span>
                    {kycData.documentType === 'ID' ?
                        <Fragment>
                            <span className='info-cont'>პირადობის მოწმობა</span>
                            <span className='info-head'>პირადი ნომერი:</span>
                            <span className='info-cont'>{kycData.personalID}</span>
                        </Fragment> :
                        <Fragment>
                            <span className='info-cont'>პასპორტი</span>
                            <span className='info-head'>პასპორტის ნომერი:</span>
                            <span className='info-cont'>{kycData.passportNumber}</span>
                        </Fragment>
                    }

                    <span>სახელი, გვარი:</span>
                    <span className='info-cont'>{kycData.name} {kycData.surname}</span>
                    <span>დაბადების წელი:</span>
                    <span className='info-cont'>{kycData.birthDate}</span>
                </div>
                <span className='step-title'>ატვირთული დოკუმენტები</span>
                <div className='uploaded-documents'>
                    <img src={kycData.customerSelf} alt='photo' />
                    <img src={kycData.documentFrontSide} alt='photo' />
                    {kycData.documentBackSide ? <img src={kycData.documentBackSide} alt='photo' /> : null}
                </div>
                <div className='agree-terms'>
                    <RoundCheckmark
                        id='isAgree'
                        for='isAgree'
                        toggle={() => setIsAgreedTerms(!isAgreedTerms)}
                        checked={isAgreedTerms}
                    />
                    <a href='' target='_blank'>ვეთანხმები ფეიუნიქარდის მომსახურებით სარგებლობის პირობებს და ფეიუნიქარდის ვებგვერდით სარგებლობის პირობებს</a>
                </div>
            </div>
        )
    } else if (step === 8) {
        VerficationStep = (
            <div className='vf-wrap'>
                <span className='ident-title'>თქვენი მოთხოვნა მიღებულია და მუშავდება</span>
                <img src='../../Assets/Images/success-girl.png' alt='img' />
                <span className='ident-info'>თქვენი მოთხოვნის დაკმაყოფილების შემთხვევაში, მიიღებთ SMS შეტყობინებას არაუგვიანეს 3 სამუშაო დღისა.</span>

            </div>
        )
    }



    return (
        <Fragment>
            {step == 5 ? <KvalifikaFrame frameUrl={kycFrameUrl} onStartSession={startKycSession} onCloseSession={closeKycSession} /> : null}
            <SidePanel
                visible={props.visible}
                closePanel={props.close}
                headerText={headerText}
                stepBack={stepBacks.includes(step) ? false : true}
                onStepBack={handleStepBack}>
                {step !== 0 ? <PropgreSteps stepCount={9} activeStep={step} hasError={stepError} /> : null}
                {VerficationStep}
                {step === 0 ?
                    <div className='vf-buttons'>
                        <Button clicked={() => setStep(1)}>არა</Button>
                        <Button>დიახ</Button>
                    </div> :
                    <Button buttonClass='buttonTest' clicked={verificationFlow}>შემდეგი</Button>}
            </SidePanel>
        </Fragment>
    )
}

Verification.propTypes = {

}

export default Verification

