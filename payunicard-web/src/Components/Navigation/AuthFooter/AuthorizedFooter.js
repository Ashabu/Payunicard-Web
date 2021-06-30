import React, { useContext, useEffect } from 'react';
import '../Footer/footer.scss';
import { Link } from 'react-router-dom';
import Lang from '../../../Services/SetLang';
import { Context } from '../../../Context/AppContext';

const AuthorizedFooter = () => {

    const { state } = useContext(Context);
    const { activeLang } = state;

    useEffect(() => {
        
    }, [activeLang])
    
    return (
            <footer>
                <div style= {{display: 'flex', justifyContent:'space-between', minHeight: 100, alignItems: 'center'}}>
                    <div className = 'auth-rightside' style = {{display: 'flex'}}>
                        <ul>
                            <li><Link to = '' >{Lang.tr('footer.tariffs')}</Link></li>
                            <li><Link to = '' >{Lang.tr('footer.comparePlan')}</Link></li>
                            <li><Link to = '' >{Lang.tr('footer.transfers')}</Link></li>
                            <li><Link to = '' >{Lang.tr('footer.paymentCards')}</Link></li>
                        </ul>
                        <ul>
                            <li><Link to = '' >{Lang.tr('footer.termsOfUse')}</Link></li>
                            <li><Link to = '' >{Lang.tr('footer.faq')}</Link></li>
                            <li><Link to = '' >{Lang.tr('footer.webTermsOfUse')}</Link></li>
                        </ul>
                    </div>
                    <div className = 'auth-leftside'>
                        
                    
                   
                    <div className = 'about-company'>
                        
                        <div className = 'partners'>
                            <div className = 'partner-logos' style={{display: 'flex', alignItems:'center'}}>
                                    <img src = '../../../Assets/Images/LandingImg/visa-logo.svg' alt='visa' />
                                <div className = 'wall'>
                                </div>
                                    <img src = {`../../../Assets/Images/LandingImg/unicard_${activeLang}.svg` }alt='visa' />
                                <div className = 'wall'>    
                                </div>
                                    <img src = '../../../Assets/Images/LandingImg/mc-logo.svg' alt='visa' />
                            </div>
                        </div> 
                        <span>© 2020 ფეიუნიქარდი | infopay@unicard.ge | (+995 32) 2 555 222</span>

                    </div>
                    </div>
                </div>

                {/* <div className = 'footer-center'>
                    <div className = 'first-container'>
                        <div className = 'footer-head'>
                            <div className = 'head-content'>
                                <span><b>{Lang.tr('footer.beneficial')}</b> {Lang.tr('footer.non-banking')}  <br/> {Lang.tr('footer.operations')}</span>
                            </div>
                        </div>
                        
                        
                    </div>
                    <div className = 'second-container'>
                        <div className = 'left-content'>
                            <span>{Lang.tr('footer.individuals')}</span>
                            <ul>
                              
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
                        
                    </div>
                    
                </div>  
                <div className='third-container'>
                        <span>{Lang.tr('footer.payunicard')}</span>
                        <div className='contact'>
                            <span>{Lang.tr('footer.contact')}</span>
                        </div>
                    </div>   */}
            </footer>
    );
};

export default AuthorizedFooter;