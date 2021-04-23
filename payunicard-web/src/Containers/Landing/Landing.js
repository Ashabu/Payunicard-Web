/* eslint-disable react-hooks/rules-of-hooks */
import React, { Component } from 'react';
import Presentation from '../../Services/API/PresentationServices';
import Lang from '../../Services/SetLang';
import './landing.scss';
import Layout from '../Layout/Layout';
import UIdata from '../../Components//UI/UIdata';
import Carousel from '../../Components/Landing/Carousel/Carousel';
import InfoSlider from '../../Components/Landing/InfoSlider/InfoSlider';
import PlanCards from '../../Components/Landing/PlanCards/PlanCards';
import Button from '../../Components/UI/Button/Button';

console.log(Lang.langKey)

class Landing extends Component {

    state = {
        isInit : false,
        packages: [],
        priceAnnual: true,
        langKey : Lang.langKey
    }
    
    componentDidMount(){
        this.serviceTmout = setTimeout(this.handleUniServicesSwitch, 500); 
        this.testCall()
    }

    componentWillUnmount() {
        
        clearTimeout(this.serviceTmout)
        clearInterval(this.ChangeInterval)
    }
  

     testCall = async ()   => {
        // eslint-disable-next-line no-undef
        Presentation.getPackageTypes().then(res => {
            let response = res.data.data.packages.map(p   => {
                switch (p.paketTypeId) {
                    case 2:
                        p.content = Lang.tr('landing.uperaDescription');
                        break;
                    case 3:
                        p.content = Lang.tr('landing.uniPlusDescription');
                        break;    
                    case 4:
                        p.content = Lang.tr('landing.uniUltraDescription');
                        break;
                
                    default:
                        p.content = Lang.tr('landing.walletDescrtiption');
                        break;
                }
                p.content = UIdata.content[0];
                p.currency = '₾';
                return p;
            })
            this.setState({packages: response});
        })
        
    }

   

    onPayMethod = () => {
        let priceAnnual = this.state.priceAnnual;
        priceAnnual = !priceAnnual;
        this.setState({priceAnnual: priceAnnual})
    }

   

    render() {

        return (
                <Layout>
                    <div className = 'Landing-wrap'>
                        <div className = 'La-first-container'>
                            <div className = 'left-content'>
                                <div className = 'uni-wallet'>
                                    <span>{Lang.tr('landing.loyalWallet')}</span>
                                </div>
                                <div className = 'visa-partner'>
                                    <span><img src = '../../Assets/Images/LandingImg/visa-logo-small.svg' alt = 'visa-logo' /> - {Lang.tr('landing.strategicPartner')}</span>
                                </div>
                                <div className = 'appstore-logos'>
                                    <img src = '../../../Assets/Images/LandingImg/GooglePlay.png'  alt = 'google-play' />
                                    <img src = '../../../Assets/Images/LandingImg/AppStore.png'  alt = 'app-store' />
                                </div>
                            </div>
                            <div className = 'right-content'>
                                <Carousel/>
                                <div className = 'visa-mc'>
                                    <img src = '../../Assets/Images/LandingImg/visa-mc.svg'  alt = 'visa-mc-logo'/>
                                </div>
                            </div>
                        </div>
                        <div className = 'La-second-container'>
                            <InfoSlider />   
                        </div>    
                        
                        <div className = 'La-fourth-container'>
                            <div className = 'visa-mc-text'>
                                <span>უნიქარდთან ერთობლივი <br/> <b>Visa/Mastercard</b> ბარათები</span>
                                <span>ბარათი, რომელსაც არ სჭირდება საბანკო ანგარიში! <br/> გადაიხადე  და  დააგროვე უნიქულები ყველგან, <br/> სადაც <b>Visa/Mastercard დაგხვდება! </b> </span>
                            </div>
                            <div className = 'visa-mc-images'>
                                <img src = '../../Assets/Images/LandingImg/Visa-Card.png '  alt = 'card' />
                                <img src = '../../Assets/Images/LandingImg/Master-Card.png'  alt = 'card' />
                            </div>

                        </div>
                        <div className = 'La-third-container'>
                            <PlanCards 
                                plan = { this.state.packages }
                                onPayMethod = { this.onPayMethod }
                                priceAnnual = { this.state.priceAnnual }
                            />
                        </div>
                        <div className = 'La-last-container'>
                            <span>კონფიდენციალობის მაღალი სტანდარტი, <br/> უკონტაქტო გადახდები, უსაფრთხო გადარიცხვები</span>
                            <span>გახსენი ანგარიში ონლაინ!</span>
                            <Button>დაიწყე</Button>
                        </div>
                    </div>
                </Layout>
        );
    }
}

export default Landing;