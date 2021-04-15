import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Language from '../../../Services/SetLang';
import { Lang } from '../../../Constants/index';
import Button from '../../UI/Button/Button';
import './navbar.scss'

var langs = []

const  NavBar = () => {
    langs = Object.entries(Lang)
    // useEffect(() => {
    //     console.log(Language.translate)
    // },[Language.translate])
    const[currentLang, setCurrentLang] = useState(langs);

    const onChangeLang = () => {
        setCurrentLang(lang => {
            let nextEl = lang[0];
             lang[0] = lang[1];
             lang[1] = nextEl
            return lang
        });
        
        Language.getLang(currentLang[1][1])
        console.log(currentLang[1][1])
    }
   
    return (
        <div className='Navbar'>
            <div className='unilogo'>
                <Link to = '/'>
                    <img  src='../../../Assets/Images/LandingImg/Unilogo_eng.svg'  alt='unicard-logo'/>
                </Link>    
            </div>
            <div style={{display: 'flex', alignItems:'center'}}>
                <Link to = '/register' className = 'unicard-btn white'>{Language.tr('auth.signUp')}</Link>
                <Link to = '/login' className = 'unicard-btn green'>{Language.tr('auth.signIn')}</Link>
                <Button clicked={onChangeLang}
                buttonClass = 'lang-btn'><img src = {`../../../Assets/Images/LandingImg/flag_${currentLang[1][1]}.svg`} alt = 'lang-logo' /></Button>
            </div>
        </div>
    )
}

export default NavBar;