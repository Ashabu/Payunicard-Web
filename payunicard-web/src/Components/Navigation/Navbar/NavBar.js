import React from 'react';
import Button from '../../UI/Button/Button'
import "./navbar.scss"

const  NavBar = () => {
    return (
        <div className="Navbar">
            <div className="unilogo">
                <img  src="../../../Assets/Images/LandingImg/Unilogo_eng.svg"  alt="unicard-logo"/>
            </div>
            <div style={{display: 'flex', alignItems:'center'}}>
                <Button buttonClass="unicard-btn-white">რეგისტრაცია</Button>
                <Button buttonClass="unicard-btn"  >შესვლა</Button>
                <Button buttonClass="lang-btn"><img src="../../../Assets/Images/LandingImg/flag_ka.svg" alt="lang-logo" /></Button>
            </div>
        </div>
    )
}

export default NavBar;