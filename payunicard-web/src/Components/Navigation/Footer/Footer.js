import React from 'react';
import './footer.scss'
import { Link } from 'react-router-dom';
import Lang from '../../../Services/SetLang';

const Footer = () => {
    return (
            <footer>
                <div className = 'footer-center'>
                    <div className = 'first-container'>
                        <div className = 'footer-head'>
                            <div className = 'head-content'>
                                <span><b>სასარგებლო</b> არასაბანკო  <br/> ფინანსური ოპერააციები</span>
                            </div>
                        </div>
                        <div className = 'partners'>
                            <div className = 'partner-logos'>
                                    <img src = '../../../Assets/Images/LandingImg/visa-logo.svg' alt='visa' />
                                <div className = 'wall'>
                                </div>
                                
                                    <img src = '../../../Assets/Images/LandingImg/unicard_geo.svg' alt='visa' />
                                <div className = 'wall'>    
                                </div>
                                    <img src = '../../../Assets/Images/LandingImg/mc-logo.svg' alt='visa' />
                            </div>
                        </div>    
                    </div>
                    <div className = 'second-container'>
                        <div className = 'left-content'>
                            <span>{Lang.tr('footer.individuals')}</span>
                            <ul>
                                <li><Link to = '' >{Lang.tr('footer.tariffs')}</Link></li>
                                <li><Link to = '' >{Lang.tr('footer.comparePlan')}</Link></li>
                                <li><Link to = '' >{Lang.tr('footer.transfers')}</Link></li>
                                <li><Link to = '' >{Lang.tr('footer.paymentCards')}</Link></li>
                                <li><Link to = '' >{Lang.tr('footer.eWallet')}</Link></li>
                                <li><Link to = '' >{Lang.tr('footer.utilityBills')}</Link></li>
                                <li><Link to = '' >{Lang.tr('footer.bonusCards')}</Link></li>
                            </ul>
                        </div>
                        <div className='right-content'>
                            <span>{Lang.tr('footer.generalInfo')}</span>
                            <ul>
                                <li><Link to = '' >{Lang.tr('footer.aboutUs')}</Link></li>
                                <li><Link to = '' >{Lang.tr('footer.termsOfUse')}</Link></li>
                                <li><Link to = '' >{Lang.tr('footer.faq')}</Link></li>
                                <li><Link to = '' >{Lang.tr('footer.webTermsOfUse')}</Link></li>
                            </ul>
                        </div>
                        <div className='appstore-logos'>
                            <img src = '../../../Assets/Images/LandingImg/GooglePlay.png'  alt='google-play' />
                            <img src = '../../../Assets/Images/LandingImg/AppStore.png'  alt='app-store' />
                        </div>
                    </div>
                    
                </div>  
                <div className='third-container'>
                        <span>©2020 შპს „ფეი უნიქარდი”</span>
                        <div className='contact'>
                            <span>კონტაქტი</span>
                            <div className='social-btns' >
                                <a href = 'https://www.facebook.com/payunicard' target = '_blank' rel="noreferrer">
                                    <span className = 'btn fa'><img src = '../../../Assets/Images/fb-icon.png' alt = 'fb-icon'/></span>
                                </a>
                                <a href = 'https://www.linkedin.com/company/payunicard' target = '_blank' rel="noreferrer">
                                    <span className = 'btn'><img src = '../../../Assets/Images/in-icon.png' alt = 'in-icon' /></span>
                                </a>
                                {/* <a className='btn facebook' href='https://www.facebook.com/payunicard' target='_blank' rel='noreferrer'><i className='fa fa-facebook'></i></a>
                                <a className='btn linkedin' href='https://www.linkedin.com/company/payunicard' target='_blank'  rel='noreferrer'><i className='fa fa-linkedin'></i></a> */}
                            </div>
                        </div>
                    </div>  
            </footer>
    );
};

export default Footer;