import React from 'react';
import Button from '../../CostumComponents/Button/Button'
import "./navbar.scss"

const  NavBar = () => {
    return (
        <div className="Navbar">
            <div className="unilogo">
                <img  src="../../../Assets/Images/LandingImg/Unilogo_eng.svg"  alt="unicard-logo"/>
            </div>
            <div style={{display: 'flex', alignItems:'center'}}>
                <Button class="unicard-btn-white">რეგისტრაცია</Button>
                <Button class="unicard-btn">შესვლა</Button>
                <Button class="lang-btn"><img src="../../../Assets/Images/LandingImg/flag_ka.svg" alt="lang-logo" /></Button>
            </div>
        </div>
    )
}

export default NavBar;