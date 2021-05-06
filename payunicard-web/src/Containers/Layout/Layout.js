import React, { Component, Fragment } from 'react';
import Header from '../../Components/Navigation/Header/Header';
import Footer from '../../Components/Navigation/Footer/Footer';
import './layout.scss';




class Layout extends Component {
    render() {
        return (
            <Fragment>
             <Header/>
             {this.props.children}
             <Footer/>
            </Fragment>
        );
    }
}

export default Layout;