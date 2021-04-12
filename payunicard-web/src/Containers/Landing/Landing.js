import React, { Component } from 'react';
import './landing.scss'
import Layout from '../Layout/Layout';
import PlanCard from '../../Components/PlanCard/PlanCard'

class Landing extends Component {

    state = {
        packages: [
            {
                createDate: "2020-12-15T00:00:00",
                isActive: true,
                paketCode: "UNIcard Plus",
                paketDescription: "პრემიალური ტარიფი",
                content:["პრემიალური ტარიფი - გადახდები განსაკუთრებული კლიენტებისთვის","ყველაზე მაღალი განაღდების/შესყიდვის ლიმიტები","3 უფასო სავალუტო ანგარიში","უფასო ინტერნეტ ბანკი და სმს მომსახურება","2 უფასო UNIcard Visa/Mastercard ბარათი ადგილზე უფასო მიტანით თბილისში","უნიქულები საჩუქრად ანგარიშის პირველად შევსებისას","უნიქულების დაგროვება საუკეთესო ტარიფით","უფასო განაღდება VTB ბანკის ბანკომატებში"],
                paketTypeId: 1,
                prePayment: 1,
                priceAnnual: 30,
                priceMonthly: 0,
                priceQuarterly: 9,
                currency: '₾'
            },
            {
                createDate: "2020-12-15T00:00:00",
                isActive: true,
                paketCode: "UNIcard Plus",
                paketDescription: "პრემიალური ტარიფი",
                content:["პრემიალური ტარიფი - გადახდები განსაკუთრებული კლიენტებისთვის","ყველაზე მაღალი განაღდების/შესყიდვის ლიმიტები","3 უფასო სავალუტო ანგარიში","უფასო ინტერნეტ ბანკი და სმს მომსახურება","2 უფასო UNIcard Visa/Mastercard ბარათი ადგილზე უფასო მიტანით თბილისში","უნიქულები საჩუქრად ანგარიშის პირველად შევსებისას","უნიქულების დაგროვება საუკეთესო ტარიფით","უფასო განაღდება VTB ბანკის ბანკომატებში"],
                paketTypeId: 2,
                prePayment: 1,
                priceAnnual: 30,
                priceMonthly: 0,
                priceQuarterly: 9,
                currency: '₾'
            },
            {
                createDate: "2020-12-15T00:00:00",
                isActive: true,
                paketCode: "UNIcard Plus",
                paketDescription: "პრემიალური ტარიფი",
                content:["პრემიალური ტარიფი - გადახდები განსაკუთრებული კლიენტებისთვის","ყველაზე მაღალი განაღდების/შესყიდვის ლიმიტები","3 უფასო სავალუტო ანგარიში","უფასო ინტერნეტ ბანკი და სმს მომსახურება","2 უფასო UNIcard Visa/Mastercard ბარათი ადგილზე უფასო მიტანით თბილისში","უნიქულები საჩუქრად ანგარიშის პირველად შევსებისას","უნიქულების დაგროვება საუკეთესო ტარიფით","უფასო განაღდება VTB ბანკის ბანკომატებში"],
                paketTypeId: 3,
                prePayment: 1,
                priceAnnual: 30,
                priceMonthly: 0,
                priceQuarterly: 9,
                currency: '₾'
            },
            {
                createDate: "2020-12-15T00:00:00",
                isActive: true,
                paketCode: "UNIcard Plus",
                paketDescription: "პრემიალური ტარიფი",
                content:["პრემიალური ტარიფი - გადახდები განსაკუთრებული კლიენტებისთვის","ყველაზე მაღალი განაღდების/შესყიდვის ლიმიტები","3 უფასო სავალუტო ანგარიში","უფასო ინტერნეტ ბანკი და სმს მომსახურება","2 უფასო UNIcard Visa/Mastercard ბარათი ადგილზე უფასო მიტანით თბილისში","უნიქულები საჩუქრად ანგარიშის პირველად შევსებისას","უნიქულების დაგროვება საუკეთესო ტარიფით","უფასო განაღდება VTB ბანკის ბანკომატებში"],
                paketTypeId: 4,
                prePayment: 1,
                priceAnnual: 30,
                priceMonthly: 0,
                priceQuarterly: 9,
                currency: '₾'
            },
        ],
        carousel:{
            visaPos: 0,
            mcPos: 180,
            visaNextPos: 360,
            mcNextPos: 540,
            lastPos: -360,
            startPos: 360,
        },
    }

    componentDidMount(){
        window.addEventListener('resize', () => {
            this.onReportWindowSize();
          }); 
    }

    onReportWindowSize =() => {
        let pageWidth = window.innerWidth;
        let ob = this.state.carousel;
        switch (pageWidth) {
            case pageWidth > 1580:
                ob.visaPos = 0;
                ob.mcPos = 180;
                ob.visaNextPos = 360;
                ob.mcNextPos = 540;
                ob.lastPos = -360;
                ob.startPos = 360;
                break;
            case pageWidth <= 1580 && pageWidth > 1280:
                ob.visaPos = 0;
                ob.mcPos = 150;
                ob.visaNextPos = 300;
                ob.mcNextPos = 450;
                ob.lastPos = -300;
                ob.startPos = 300;
                break;
            case pageWidth <= 1280 && pageWidth > 1024:
                ob.visaPos = 0;
                ob.mcPos = 120;
                ob.visaNextPos = 240;
                ob.mcNextPos = 360;
                ob.lastPos = -240;
                ob.startPos = 240;
                break;
            case pageWidth <= 1024 && pageWidth > 800:
                ob.visaPos = 0;
                ob.mcPos = 74;
                ob.visaNextPos = 148;
                ob.mcNextPos = 222;
                ob.lastPos = -148;
                ob.startPos = 148;
                break;
            case pageWidth <= 800:
                ob.visaPos = 0;
                ob.mcPos = 120;
                ob.visaNextPos = 240;
                ob.mcNextPos = 360;
                ob.lastPos = -240;
                ob.startPos = 240;
                break;
                default:
                break;
        }


      }

    render() {
        

        return (
            <div>
                <Layout>
                    <div className = 'Landing-wrap'>
                        <div className = 'La-first-container'>
                            <div className = 'right-content'>
                                <div className = 'uni-wallet'>
                                    <span>ჩემი ყოველდღიური <br/> ლოიალური საფულე</span>
                                </div>
                                <div className = 'visa-partner'>
                                    <span><img src='../../Assets/Images/LandingImg/visa-logo-small.svg' alt='visa-logo' /> - პიპრველი სტრატეგიული პარტნიორი CISSEE რეგიონში</span>
                                </div>
                                <div className = "appstore-logos">
                                    <img src='../../../Assets/Images/LandingImg/GooglePlay.png'  alt='google-play' />
                                    <img src='../../../Assets/Images/LandingImg/AppStore.png'  alt='app-store' />
                                </div>
                            </div>
                            <div className = 'mobile-carousel'>
                                <img src='../../Assets/Images/LandingImg/iphone-landing-geo.png' alt='phone-img' />
                                <div className = 'visa-mc'>
                                    <img src='../../Assets/Images/LandingImg/visa-mc.svg'  alt='visa-mc-logo'/>
                                </div>
                            </div>
                        </div>
                        <div className = 'La-second-container'>
                            
                        </div>
                        <div className = 'La-third-container'>
                            
                        </div>

                    </div>
                    <div className='PlanCards'>
                        <div className='PayDuration'>
                            <div className='PayOption'>
                                <span>კვარტალი</span>
                            </div>
                            <div className = 'PayOption Active'>
                                <span>წელიწადი</span>
                            </div>

                        </div>
                        {this.state.packages.map(plan =>( 
                            <PlanCard
                                key= {plan.paketTypeId} 
                                title = {plan.paketCode}
                                price = {plan.priceAnnual}
                                currency = {plan.currency}
                                payDuration = "Year"
                                planTypeId = {plan.paketTypeId}
                                content = {plan.content}/>
                        ))}    
                    </div>
                </Layout>
                
            </div>
        );
    }
}

export default Landing;