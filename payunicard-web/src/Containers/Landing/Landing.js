/* eslint-disable react-hooks/rules-of-hooks */
import React, { Component } from 'react';
import Presentation from '../../Services/API/PresentationServices';
import Language from '../../Services/SetLang';
import './landing.scss';
import '../../Components/HOC/ClickableBulltes';
import Layout from '../Layout/Layout';
import PlanCard from '../../Components/PlanCard/PlanCard';
import UIdata from '../../Components//UI/UIdata';
import SliderInfo from '../../Components/SliderInfo/SliderInfo';
import ClickableBulltes from '../../Components/HOC/ClickableBulltes';



class Landing extends Component {

    state = {
        isInit : false,
        selected: {},
        packages: [],
        lang: [],
        uniServices: UIdata.UniServices,
        // display: {
        //     title: '',
        //     content: [],
        //     icon: '',
        //     phoneImg: '',
        //     computerImg: '',
        //     indx: 0
        //   },
        curIndex : 0,
        priceAnnual: true,
        carousel: {
            visaPos: 0,
            mcPos: 180,
            visaNextPos: 360,
            mcNextPos: 540,
            lastPos: -360,
            startPos: 360,
        },
    }
    
    componentDidMount(){
        window.addEventListener('resize', this.onReportWindowSize);

        this.startCarouselAnimation();

        this.serviceTmout = setTimeout(this.handleUniServicesSwitch, 500); 

        this.testCall()
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.onReportWindowSize);
        clearTimeout(this.startTmout)
        clearTimeout(this.serviceTmout)
        clearInterval(this.ChangeInterval)
    }
  

     testCall = async ()   => {
        // eslint-disable-next-line no-undef
        Presentation.getPackageTypes().then(res => {
            let response = res.data.data.packages.map(p   => {
                p.content = UIdata.content[0];
                p.currency = '₾';
                return p;
            })
            this.setState({packages: response});
        })
        
    }

    

    
    CardsCarousel = () => {
        let carousel = {...this.state.carousel}
        let fVisa = document.getElementById('img1');
        let fMc = document.getElementById('img2');
        let sVisa = document.getElementById('img3');
        let sMc = document.getElementById('img4');
  
        carousel.visaPos -= 1;
        carousel.mcPos -= 1;
        carousel.visaNextPos -= 1;
        carousel.mcNextPos -= 1;
  
        fVisa.style.left = carousel.visaPos + 'px';
        if(Math.floor(carousel.visaPos) <= carousel.lastPos){
            carousel.visaPos = carousel.startPos;
        }
        fMc.style.left = carousel.mcPos + 'px';
        if(Math.floor(carousel.mcPos) <= carousel.lastPos) {
            carousel.mcPos = carousel.startPos
        }
        sVisa.style.left = carousel.visaNextPos + 'px';
        if(Math.floor(carousel.visaNextPos) <= carousel.lastPos) {
            carousel.visaNextPos = carousel.startPos;
        }
        sMc.style.left = carousel.mcNextPos + 'px';
        if(Math.floor(carousel.mcNextPos) <= carousel.lastPos) {
            carousel.mcNextPos = carousel.startPos;
        }    

        this.setState({carousel: carousel})

        requestAnimationFrame(this.CardsCarousel);
        
    }
  
    startCarouselAnimation = () => {
      this.startTmout =   setTimeout(() => { this.CardsCarousel(); }, 1000);
    }


    onReportWindowSize = () => {
        let pageWidth = window.innerWidth;
        let carousel = {...this.state.carousel};
        switch (pageWidth) {
            case pageWidth > 1580:
                carousel.visaPos = 0;
                carousel.mcPos = 180;
                carousel.visaNextPos = 360;
                carousel.mcNextPos = 540;
                carousel.lastPos = -360;
                carousel.startPos = 360;
                break;
            case pageWidth <= 1580 && pageWidth > 1280:
                carousel.visaPos = 0;
                carousel.mcPos = 150;
                carousel.visaNextPos = 300;
                carousel.mcNextPos = 450;
                carousel.lastPos = -300;
                carousel.startPos = 300;
                break;
            case pageWidth <= 1280 && pageWidth > 1024:
                carousel.visaPos = 0;
                carousel.mcPos = 120;
                carousel.visaNextPos = 240;
                carousel.mcNextPos = 360;
                carousel.lastPos = -240;
                carousel.startPos = 240;
                break;
            case pageWidth <= 1024 && pageWidth > 800:
                carousel.visaPos = 0;
                carousel.mcPos = 74;
                carousel.visaNextPos = 148;
                carousel.mcNextPos = 222;
                carousel.lastPos = -148;
                carousel.startPos = 148;
                break;
            case pageWidth <= 800:
                carousel.visaPos = 0;
                carousel.mcPos = 120;
                carousel.visaNextPos = 240;
                carousel.mcNextPos = 360;
                carousel.lastPos = -240;
                carousel.startPos = 240;
                break;
                default:
                break;
        }
        this.setState({carousel: carousel});

    }

    
        handleBulletActive =() => {
            let serviceObj = [...this.state.uniServices]
            for(let i = 0; i < serviceObj.length; i++){
                serviceObj[i].active = false;
                this.setState({uniServices: serviceObj})
            }
        }



        handleUniServicesSwitch = (i = 0) => {
            let serviceObj = [...this.state.uniServices];
            // let display = {...this.state.display}
            let fn = () => {
            this.handleBulletActive();
            serviceObj[i].active = true;
            // display.title = serviceObj[i].title;
            // display.content = serviceObj[i];
            // display.icon = serviceObj[i].icon;
            serviceObj.computerImg = `url(${serviceObj[i].computerImg})`;
            serviceObj.computerImg  = `url(${serviceObj[i].phoneImg})`;
            this.setState({uniServices: serviceObj,  curIndex: i})
            // this.$refs.titleFade.classList.add('text-fade');
            // this.$refs.contentFade.classList.add('text-fade');
            // this.$refs.iPhone.classList.add('img-fade');
            // this.$refs.macbook.classList.add('img-fade');
            // if(this.fadeTimeInterval) clearInterval(this.fadeTimeInterval)
            // this.fadeTimeInterval = setInterval( ()=> {
            //   this.$refs.titleFade.classList.remove('text-fade');
            //   this.$refs.contentFade.classList.remove('text-fade');
            //   this.$refs.iPhone.classList.remove('img-fade');
            //   this.$refs.macbook.classList.remove('img-fade');
            // }, 3800)
            }
            fn();
            if(this.ChangeInterval) clearInterval(this.ChangeInterval)
            this.ChangeInterval = setInterval( () =>{
              i === 5?  i = 0 :  i++;
              fn();
            },4000)
          }


























       

    onPayMethod = () => {
        let priceAnnual = this.state.priceAnnual;
        priceAnnual = !priceAnnual;
        this.setState({priceAnnual: priceAnnual})
    }




    render() {
        let Card = this.state.packages;
        if(!this.state.priceAnnual) {
            Card = Card.filter(plan => plan.paketTypeId !==  2).map(card =>(
                <PlanCard
                    key =  {card.paketTypeId} 
                    payDuration = 'Year'
                    card = {card}/>
                ))    
        } else {
            Card = (Card.map(card => ( 
                <PlanCard
                    key = {card.paketTypeId} 
                    payDuration = 'Year'
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
                                    <span><img src = '../../Assets/Images/LandingImg/visa-logo-small.svg' alt = 'visa-logo' /> - პირველი სტრატეგიული პარტნიორი CISSEE რეგიონში</span>
                                </div>
                                <div className = 'appstore-logos'>
                                    <img src = '../../../Assets/Images/LandingImg/GooglePlay.png'  alt = 'google-play' />
                                    <img src = '../../../Assets/Images/LandingImg/AppStore.png'  alt = 'app-store' />
                                </div>
                            </div>
                            <div className = 'mobile-carousel'>
                                <img src = '../../Assets/Images/LandingImg/iphone-landing-geo.png' alt = 'phone-img' />
                                <div className = 'slider-cards'>
                                <span id = 'slideImg'>
                                    <img id = 'img1' src = '../../Assets/Images/LandingImg/Visa-Card.png' alt = 'visa-card'/>
                                    <img id = 'img2' src = '../../Assets/Images/LandingImg/Master-Card.png'alt = 'master-card'/>
                                    <img id = 'img3' src = '../../Assets/Images/LandingImg/Visa-Card.png' alt = 'visa-card'/>
                                    <img id = 'img4' src = '../../Assets/Images/LandingImg/Master-Card.png' alt = 'master-card'/>
                                </span>
                            </div>
                                <div className = 'visa-mc'>
                                    <img src = '../../Assets/Images/LandingImg/visa-mc.svg'  alt = 'visa-mc-logo'/>
                                </div>
                            </div>
                        </div>
                        <div className = 'La-second-container'>
                            <div className = 'Mackbook'>
                                <div className = 'for-mac' style={{backgroundImage: this.state.uniServices.computerImg}}></div>
                                <div className = 'for-phn' style={{backgroundImage: this.state.uniServices.computerImg}} ></div>
                                <img src = '../../Assets/Images/LandingImg/MacbookPro.png' alt = 'macBook'/>
                                <img src = '../../Assets/Images/LandingImg/iPhone.png' alt = 'iPhone' />
                            </div>
                            <div className = 'uni-service-wrap'>   
                                <SliderInfo 
                                    imgUrl = {this.state.uniServices[this.state.curIndex].icon}
                                    title = {this.state.uniServices[this.state.curIndex].title}
                                    content = {this.state.uniServices[this.state.curIndex].content} />
                                <div className = 'js-cont-center'>{this.state.uniServices.map((item, index) => (
                                    <ClickableBulltes key = {index} bullets = {item.active? 'bullets active' : 'bullets'} clicked = {() =>this.handleUniServicesSwitch(index)}/>
                                    ))}
                                </div>
                            </div>             
                        </div>    
                        <div className = 'La-third-container'>
                        <div className = 'PlanCards'>
                        <div className = 'PlanCards-Header'>
                            <p>აირჩიეთ ტარიფი</p>
                            <div className = 'PayDuration' onClick = {this.onPayMethod}>
                                <div className = {!this.state.priceAnnual?'PayOption Active' : 'PayOption'}>
                                    <span>კვარტალი</span>
                                </div>
                                <div className = {this.state.priceAnnual?'PayOption Active' : 'PayOption'}>
                                    <span>წელიწადი</span>
                                </div>
                            </div>
                            <span>დაზოგე 16%-მდე წლიურად გადახდისას</span>
                        </div>
                        <div className = 'PlanCards-Body'>   
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