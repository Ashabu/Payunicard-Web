import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './carousel.scss';

class Carousel extends Component {

    constructor(props) {
        super(props) 
        this.carouselConfig = {
            carousel: {
                visaPos: props.visaPos || 0,
                mcPos: props.visaPos || 180,
                visaNextPos: props.visaPos || 360,
                mcNextPos: props.visaPos || 540,
                lastPos: props.visaPos || -360,
                startPos: props.visaPos || 360,
            }
        }

        
        

    }

    componentDidMount() {
        window.addEventListener('resize', this.onReportWindowSize);
        this.startCarouselAnimation();
    }
   
    componentWillUnmount() {
        window.removeEventListener('resize', this.onReportWindowSize);
        clearTimeout(this.startTmout);
    }

    
    

    CardsCarousel = () => {
        let carousel = {...this.carouselConfig.carousel}
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

        this.carouselConfig.carousel = carousel;

        requestAnimationFrame(this.CardsCarousel);
        
    }
  
    startCarouselAnimation = () => {
      this.startTmout =   setTimeout(() => { this.CardsCarousel(); }, 500);
    }


    onReportWindowSize = () => {
        let pageWidth = window.innerWidth;
        console.log(pageWidth)
        let carousel = {...this.carouselConfig.carousel};
        switch (pageWidth) {
            case pageWidth > 1580:
                carousel.visaPos = 0;
                carousel.mcPos = 160;
                carousel.visaNextPos = 340;
                carousel.mcNextPos = 520;
                carousel.lastPos = -340;
                carousel.startPos = 340;
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
        
        this.carouselConfig.carousel = carousel;

    }


    render() {
        return (
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
            </div>
        );
    }
}

Carousel.propTypes = {
    carousel: PropTypes.object,
};

export default Carousel;