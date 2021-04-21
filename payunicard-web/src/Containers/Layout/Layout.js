import React, { Component, Fragment } from 'react';
import Navbar from '../../Components/Navigation/Navbar/NavBar';
import Footer from '../../Components/Navigation/Footer/Footer';
import './layout.scss';




class Layout extends Component {
    render() {
        return (
            <Fragment>
             <Navbar/>
             {this.props.children}
             <Footer/>
            </Fragment>
        );
    }
}

export default Layout;