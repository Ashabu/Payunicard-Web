import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import Lang from '../../../Services/SetLang';
import { Langs } from '../../../Constants/index';
import './header.scss';
import { Context } from '../../../Context/AppContext';

var langs = []

const  Header = (props) => {
    

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
        <div className = 'Header'>
            <div className = 'unilogo'>
                <Link to = '/'>
                    <img  src = {`../../../Assets/Images/LandingImg/Unilogo_${currentLang[1][1]}.svg`}  alt='unicard-logo'/>
                </Link>    
            </div>
          
                <div className = 'Header__buttons'>
                <div className = 'auth-links'>
                    <Link to = '/register' className = 'unicard-btn white'>{Lang.tr('auth.signUp')}</Link>
                    <Link to = '/login' className = 'unicard-btn green'>{Lang.tr('auth.signIn')}</Link>
                </div>
                <div className = 'lang-btn'>
                    <img  src = {`../../../Assets/Images/LandingImg/flag_${currentLang[1][1]}.svg`} onClick = {onChangeLang} alt = 'lang-logo' />
                </div>    
            </div> 
        </div>
    )
}

export default Header;