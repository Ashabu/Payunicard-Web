import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import Lang from '../../../Services/SetLang';
import { Langs } from '../../../Constants/index';
import '../Header/header.scss';
import { Context } from '../../../Context/AppContext';

var langs = []

const  AuthorizedHeader = (props) => {
    

    const { setGlobalValue  } = useContext(Context);

    langs = Object.entries(Langs)
   
    const[currentLang, setCurrentLang] = useState(langs);
    const[userDropDwon, setUserDropDwon] = useState(false);

   

    const onChangeLang = () => {
        setCurrentLang(lang => {
            let nextEl = lang[0];
             lang[0] = lang[1];
             lang[1] = nextEl
            return lang
        });

        Lang.getLang(currentLang[1][1]);
    }
   
    return (
        <header className = 'Header'>
            <div className = 'unilogo'>
                <Link to = '/'>
                    <img  src = {`../../../Assets/Images/LandingImg/Unilogo_${currentLang[1][1]}.svg`}  alt='unicard-logo'/>
                </Link>
                 
            </div>
            <div>
                    <p>{props.pageName}</p>
                </div>   
                <div className = 'Header___authorized'>
                    <div className = 'Header___userinfo' tabIndex ='0' onClick = {() => setUserDropDwon(true)}  onBlur = {() => setUserDropDwon(false)}>
                        <span>a.shaburishvili</span>
                            <img src = '../../../Assets/Images/profile-icon.png' alt = 'prof-icon' />
                        <div>
                            <img src = '../../../Assets/Images/arrow_down.png' alt = 'arrow' />
                        </div>
                        {userDropDwon? <div className = 'Header__profile-dropwdown'>
                            <div>
                                Profile
                            </div>
                            <div onClick = {() =>  setGlobalValue({ isUserAuthorized: false}) }>
                                Logout
                            </div>

                        </div> : null}
                    </div>
                    <div>
                        <img src = '../../../Assets/Images/notification-bell.png' alt = 'icon' />
                    </div>
                    <div className = 'lang-btn'>
                        <img  src = {`../../../Assets/Images/LandingImg/flag_${currentLang[1][1]}.svg`} onClick = {onChangeLang} alt = 'lang-logo' />
                    </div>  
                </div>  
        </header>
    )
}

export default AuthorizedHeader;