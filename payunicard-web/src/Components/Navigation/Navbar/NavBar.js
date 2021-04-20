import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Lang from '../../../Services/SetLang';
import { Langs } from '../../../Constants/index';
import Button from '../../UI/Button/Button';
import './navbar.scss'

var langs = []

const  NavBar = () => {
    langs = Object.entries(Langs)
    // useEffect(() => {
    //     console.log(Lang.translate)
    // },[Lang.translate])
    const[currentLang, setCurrentLang] = useState(langs);

    const onChangeLang = () => {
        setCurrentLang(lang => {
            let nextEl = lang[0];
             lang[0] = lang[1];
             lang[1] = nextEl
            return lang
        });
        
        Lang.getLang(currentLang[1][1])
    }
   
    return (
        <div className='Navbar'>
            <div className='unilogo'>
                <Link to = '/'>
                    <img  src='../../../Assets/Images/LandingImg/Unilogo_eng.svg'  alt='unicard-logo'/>
                </Link>    
            </div>
            <div style={{display: 'flex', alignItems:'center'}}>
                <div className = 'auth-links'>
                    <Link to = '/register' className = 'unicard-btn white'>{Lang.tr('auth.signUp')}</Link>
                    <Link to = '/login' className = 'unicard-btn green'>{Lang.tr('auth.signIn')}</Link>
                </div>    
                <img className = 'lang-btn' src = {`../../../Assets/Images/LandingImg/flag_${currentLang[1][1]}.svg`} onClick = {onChangeLang} alt = 'lang-logo' />
            </div>
        </div>
    )
}

export default NavBar;