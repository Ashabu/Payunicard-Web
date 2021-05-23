import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import Lang from '../../../Services/SetLang';
import { Langs } from '../../../Constants/index';
import './header.scss';
import { Context } from '../../../Context/AppContext';

var langs = []

const  Header = (props) => {
    
    const history = useHistory();

    const { state, setGlobalValue  } = useContext(Context);
    const { isUserAuthorized } = state;

    langs = Object.entries(Langs)
   
    const[currentLang, setCurrentLang] = useState(langs);
    const[userDropDwon, setUserDropDwon] = useState(false);

    useEffect(() => {
        
    }, [isUserAuthorized])

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
        <div className = 'Header'>
            <div className = 'unilogo'>
                <Link to = '/'>
                    <img  src = {`../../../Assets/Images/LandingImg/Unilogo_${currentLang[1][1]}.svg`}  alt='unicard-logo'/>
                </Link>    
            </div>
            {isUserAuthorized ? 
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
                            <div onClick = {() => { setGlobalValue({ isUserAuthorized: false}); history.push('/'); localStorage.removeItem('token')}}>
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
                </div> :
                <div className = 'Header__buttons'>
                <div className = 'auth-links'>
                    <Link to = '/register' className = 'unicard-btn white'>{Lang.tr('auth.signUp')}</Link>
                    <Link to = '/login' className = 'unicard-btn green'>{Lang.tr('auth.signIn')}</Link>
                </div>
                <div className = 'lang-btn'>
                    <img  src = {`../../../Assets/Images/LandingImg/flag_${currentLang[1][1]}.svg`} onClick = {onChangeLang} alt = 'lang-logo' />
                </div>    
            </div> }
        </div>
    )
}

export default Header;