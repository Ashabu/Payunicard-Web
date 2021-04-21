import React from 'react';
import './footer.scss'

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
                            <span>ფიზიკური პირები</span>
                            <ul>
                                <li>ტარიფები</li>
                                <li>ტარიფების შედარება</li>
                                <li>გადარიცხვები</li>
                                <li>საგადახდო ბარათები</li>
                                <li>ელექტრონული საფულე</li>
                                <li>კომუნალური გადახდები</li>
                                <li>უნიქარდ დაგროვების ბარათები</li>
                            </ul>
                        </div>
                        <div className='right-content'>
                            <span>ინფორმაცია</span>
                            <ul>
                                <li>ჩვენს შესახებ</li>
                                <li>სიახლეები</li>
                                <li>მომსახურების პირობები</li>
                                <li>ხშირად დასმული კითხვები</li>
                                <li>ვებგვერდით სარგებლობის პირობები</li>
                            </ul>
                        </div>
                        <div className='appstore-logos'>
                            <img src = '../../../Assets/Images/LandingImg/GooglePlay.png'  alt='google-play' />
                            <img src = '../../../Assets/Images/LandingImg/AppStore.png'  alt='app-store' />
                        </div>
                    </div>
                    {/* <div className='third-container'>
                        <span>©2020 შპს „ფეი უნიქარდი”</span>
                        <div className='contact'>
                            <span>კონტაქტი</span>
                            <div className='social-btns' >
                                <a className='btn facebook' href='https://www.facebook.com/payunicard' target='_blank' rel='noreferrer'><i className='fa fa-facebook'></i></a>
                                <a className='btn linkedin' href='https://www.linkedin.com/company/payunicard' target='_blank'  rel='noreferrer'><i className='fa fa-linkedin'></i></a>
                            </div>
                        </div>
                    </div> */}
                </div>    
            </footer>
    );
};

export default Footer;