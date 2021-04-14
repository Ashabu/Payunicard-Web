import React, { Component } from 'react';
import Presentation from '../../Services/API/PresentationServices'
import './landing.scss'
import Layout from '../Layout/Layout';
import PlanCard from '../../Components/PlanCard/PlanCard'




class Landing extends Component {

    state = {
        selected: {},
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
        priceAnnual: true,
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
          this.testCall()
          console.log(this.state.selected)



    }

     testCall = async () => {
        // eslint-disable-next-line no-undef
        Presentation.getPackageTypes().then(res => {
            console.log(res)
        })
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

    onPayMethod = () => {
        let priceAnnual = this.state.priceAnnual;
        priceAnnual = !priceAnnual;
        this.setState({priceAnnual: priceAnnual})
    }


    render() {
        let Card = this.state.packages;
        if(!this.state.priceAnnual) {
            Card = Card.filter(plan=> plan.paketTypeId !== 2).map(card =>(
                <PlanCard
                    key= {card.paketTypeId} 
                    payDuration = "Year"
                    card = {card}/>
                ))    
        } else {
            Card = (Card.map(card =>( 
                <PlanCard
                    key= {card.paketTypeId} 
                    payDuration = "Year"
                    card = {card} />
                )));
        }
        

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
                        <div className='PlanCards'>
                        <div className='PlanCards-Header'>
                            <p>აირჩიეთ ტარიფი</p>
                            <div className='PayDuration' onClick={this.onPayMethod}>
                                <div className={!this.state.priceAnnual?'PayOption Active' : 'PayOption'}>
                                    <span>კვარტალი</span>
                                </div>
                                <div className={this.state.priceAnnual?'PayOption Active' : 'PayOption'}>
                                    <span>წელიწადი</span>
                                </div>
                            </div>
                            <span>დაზოგე 16%-მდე წლიურად გადახდისას</span>
                        </div>
                        <div className='PlanCards-Body'>   
                            {Card}
                        </div>  
                    </div>
                            
                        </div>

                    </div>
                    
                </Layout>
            </div>
        );
    }
}

export default Landing;