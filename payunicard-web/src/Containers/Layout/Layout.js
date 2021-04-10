import React, { Component } from 'react';
import Navbar from '../../Components/Navigation/Navbar/NavBar';
import Footer from '../../Components/Navigation/Footer/Footer';
import './layout.scss';




class Layout extends Component {
    render() {
        return (
            <div>
             <Navbar/>
             {this.props.children}
             <Footer/>
            </div>
        );
    }
}

export default Layout;