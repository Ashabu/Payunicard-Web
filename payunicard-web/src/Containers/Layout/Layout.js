import React, { useEffect, useState, useContext } from 'react';
import './layout.scss';
import Header from '../../Components/Navigation/Header/Header';
import Footer from '../../Components/Navigation/Footer/Footer';






const  Layout = (props) =>  {

        return (
            
                <React.Fragment>
                    <Header/>
                        {props.children}
                    <Footer/>
                </React.Fragment>
        );
}

export default Layout;