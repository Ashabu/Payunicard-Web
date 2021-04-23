import React, { Component } from 'react';
import './infoSlider.scss';
import PropTypes from 'prop-types';
import SliderInfo from '../../SliderInfo/SliderInfo';
import ClickableBulltes from '../../HOC/ClickableBulltes';


class InfoSlider extends Component {

   
    
    componentDidMount() {
        this.serviceTmout = setTimeout(this.handleUniServicesSwitch, 500); 
    }

    componentWillUnmount() {
        
        clearTimeout(this.serviceTmout);
        clearInterval(this.ChangeInterval);
    }

    


    handleUniServicesSwitch = (i = 0) => {
        let fn = () => {
        this.props.onSlideChange(i);
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
      
    
     
    render() {
        const sliderCnofig  =  this.props.sliderConfig;
        const curIndex = this.props.curIndex;
        console.log(sliderCnofig[curIndex].computerImg[this.props.lang])

        return (
            <div className = 'infoSlider'>
                <div className = 'Mackbook'>
                        <div className = 'for-mac' style={{backgroundImage: `url(${sliderCnofig[curIndex].computerImg[this.props.lang]})`}}></div>
                        <div className = 'for-phn' style={{backgroundImage: `url(${sliderCnofig[curIndex].phoneImg[this.props.lang]})`}} ></div>
                        <img src = '../../Assets/Images/LandingImg/MacbookPro.png' alt = 'macBook'/>
                        <img src = '../../Assets/Images/LandingImg/iPhone.png' alt = 'iPhone' />
                    </div>
                    <div className = 'uni-service-wrap'>   
                        <SliderInfo 
                            imgUrl = {sliderCnofig[curIndex].icon}
                            title = {sliderCnofig[curIndex].title[this.props.lang]}
                            content = {sliderCnofig[curIndex].content[this.props.lang]} />
                        <div className = 'js-cont-center'>{sliderCnofig.map((item, index) => (
                            <ClickableBulltes key = {index} bullets = {item.active? 'bullets active' : 'bullets'} clicked = {() =>this.handleUniServicesSwitch(index)}/>
                            ))}
                        </div>
                    </div>  
            </div>
        );
    }
}

InfoSlider.propTypes = {
    curIndex: PropTypes.number,
    title: PropTypes.string,

};

export default InfoSlider;