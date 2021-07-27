/* eslint-disable react-hooks/rules-of-hooks */
import React, { Component, useContext } from 'react';
import Presentation from '../../Services/API/PresentationServices';
import Lang from '../../Services/SetLang';
import './landing.scss';
import Layout from '../Layout/Layout';
import UIdata from '../../Components//UI/UIdata';
import Carousel from '../../Components/Landing/Carousel/Carousel';
import InfoSlider from '../../Components/Landing/InfoSlider/InfoSlider';
import PlanCards from '../../Components/Landing/PlanCards/PlanCards';
import { Link } from 'react-router-dom';
import OtpBox from '../../Components/UI/Otp-Box/Otp-Box';



class Landing extends Component {

    state = {
        isInit: false,
        packages: [],
        priceAnnual: true,
        langKey: Lang.langKey,
        curIndex: 0,
        serviceObj: UIdata.UniServices
    }

    componentDidMount() {
        this.serviceTmout = setTimeout(this.handleUniServicesSwitch, 500);
        this.GetPackages()

        // this.langSubscribe = Lang.subscribe(_ => {
        //     this.setState({langKey: _})
        // })
    }

    componentWillUnmount() {

        clearTimeout(this.serviceTmout)
        clearInterval(this.ChangeInterval)
    }


    GetPackages = async () => {
        // eslint-disable-next-line no-undef

        Presentation.getPackageTypes().then(res => {
            let response = res.data.data.packages.map(p => {
                let PlanInfo = UIdata.PlanInfo[0]
                switch (p.paketTypeId) {
                    case 2:
                        p.content = PlanInfo.uperaContent;
                        break;
                    case 3:
                        p.content = PlanInfo.uniplusContent;
                        break;
                    case 4:
                        p.content = PlanInfo.uniUltraContent;
                        break;

                    default:
                        p.content = PlanInfo.walletContent;
                        break;
                }
                p.currency = '₾';
                return p;
            })
            this.setState({ packages: response });
        })

    }

    updateSlider = (index) => {
        this.setState(prevState => {
            let state = { ...prevState };
            let activeIndex = state.serviceObj.findIndex(element => element.active === true);

            if (activeIndex >= 0) state.serviceObj[activeIndex].active = false;
            state.serviceObj[index].active = true;
            state.computerImg = `url(${state.serviceObj[index].computerImg[this.state.langKey]})`;
            state.phoneImg = `url(${state.serviceObj[index].phoneImg[this.state.langKey]})`;
            state.curIndex = index;
            return state;
        })
    }

    onPayMethod = () => {
        let priceAnnual = this.state.priceAnnual;
        priceAnnual = !priceAnnual;
        this.setState({ priceAnnual: priceAnnual })
    }



    render() {
        return (
            <Layout>
                <div className='Landing-wrap'>
                    <div className='La-first-container'>
                        <div className='left-content'>
                            <div className='uni-wallet'>
                                <span>{Lang.tr('landing.loyalWallet')}</span>
                            </div>
                            <div className='visa-partner'>
                                <span><img src='../../Assets/Images/LandingImg/visa-logo-small.svg' alt='visa-logo' /> - {Lang.tr('landing.strategicPartner')}</span>
                            </div>
                            <div className='appstore-logos'>
                                <img src='../../../Assets/Images/LandingImg/GooglePlay.png' alt='google-play' />
                                <img src='../../../Assets/Images/LandingImg/AppStore.png' alt='app-store' />
                            </div>
                        </div>
                        <div className='right-content'>
                            <Carousel />
                            <div className='visa-mc'>
                                <img src='../../Assets/Images/LandingImg/visa-mc.svg' alt='visa-mc-logo' />
                            </div>
                        </div>
                    </div>
                    <div className='La-second-container'>
                        <InfoSlider
                            sliderConfig={this.state.serviceObj}
                            curIndex={this.state.curIndex}
                            onSlideChange={(index) => this.updateSlider(index)} />
                    </div>

                    <div className='La-fourth-container'>
                        <div className='visa-mc-text'>
                            <span>უნიქარდთან ერთობლივი <br /> <b>Visa/Mastercard</b> ბარათები</span>
                            <span>ბარათი, რომელსაც არ სჭირდება საბანკო ანგარიში! <br /> გადაიხადე  და  დააგროვე უნიქულები ყველგან, <br /> სადაც <b>Visa/Mastercard დაგხვდება! </b> </span>
                        </div>
                        <div className='visa-mc-images'>
                            <img src='../../Assets/Images/LandingImg/Visa-Card.png ' alt='card' />
                            <img src='../../Assets/Images/LandingImg/Master-Card.png' alt='card' />
                        </div>

                    </div>
                    <div className='La-third-container'>
                        <PlanCards
                            plan={this.state.packages}
                            onPayMethod={this.onPayMethod}
                            priceAnnual={this.state.priceAnnual}
                        />
                    </div>
                    <div className='La-last-container'>

                        <span>{Lang.tr('landing.confStandart').replace("$br", '</br>')}</span>
                        <span>{Lang.tr('landing.openAccOnline')}</span>
                        <Link className='unicard-btn green' to='/register'>{Lang.tr('landing.start')}</Link>
                    </div>
                </div>
            </Layout>
        );
    }
}

export default Landing;