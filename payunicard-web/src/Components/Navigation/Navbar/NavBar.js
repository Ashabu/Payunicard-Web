import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../../UI/Button/Button'
import "./navbar.scss"

const  NavBar = () => {
    return (
        <div className="Navbar">
            <div className="unilogo">
                <Link to = '/'>
                    <img  src="../../../Assets/Images/LandingImg/Unilogo_eng.svg"  alt="unicard-logo"/>
                </Link>    
            </div>
            <div style={{display: 'flex', alignItems:'center'}}>
                <Link to = '/register' className="unicard-btn-white">რეგისტრაცია</Link>
                <Link to = '/login' className="unicard-btn"  >შესვლა</Link>
                <Button buttonClass="lang-btn"><img src="../../../Assets/Images/LandingImg/flag_ka.svg" alt="lang-logo" /></Button>
            </div>
        </div>
    )
}

export default NavBar;