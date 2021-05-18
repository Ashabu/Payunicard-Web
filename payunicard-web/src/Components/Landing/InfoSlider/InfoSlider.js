import React, { Component, Fragment } from 'react';
import './infoSlider.scss';
import PropTypes from 'prop-types';
import SliderInfo from '../../SliderInfo/SliderInfo';
import ClickableBulltes from '../../HOC/ClickableBulltes';
import SliderInfoMobile from '../../SliderInfoMobile/SliderInfoMobile';


class InfoSlider extends Component {


   iPhone = React.createRef();
   macbook = React.createRef(); 

    componentDidMount() {
        this.serviceTmout = setTimeout(this.handleUniServicesSwitch, 500); 

    }

    componentWillUnmount() {
        
        clearTimeout(this.serviceTmout);
        clearInterval(this.ChangeInterval);
        clearInterval(this.fadeTimeInterval);
    }

    
    

    handleUniServicesSwitch = (i = 0) => {
        let fn = () => {
        this.props.onSlideChange(i);
        // this.titleFade.classList.add('text-fade');
        // this.contentFade.classList.add('text-fade');
        this.iPhone.classList.add('img-fade');
        this.macbook.classList.add('img-fade');
        if(this.fadeTimeInterval) clearInterval(this.fadeTimeInterval)
        this.fadeTimeInterval = setInterval( ()=> {
        //   this.titleFade.classList.remove('text-fade');
        //   this.contentFade.classList.remove('text-fade');
          this.iPhone.classList.remove('img-fade');
          this.macbook.classList.remove('img-fade');
        }, 3800)
        }

        fn();

        if(this.ChangeInterval) clearInterval(this.ChangeInterval)
        
        this.ChangeInterval = setInterval( () =>{
            i === 5?  i = 0 :  i++;
            fn();
        },4000)
      }
      
    //   fpd = (context) => {
    //     context.setLang("eng");
    //   }
     
    render() {
        const sliderCnofig  =  this.props.sliderConfig;
        const curIndex = this.props.curIndex;
        return (
            
            <Fragment>   
                <div className = 'infoSlider'>
                    <div className = 'Macbook'>
                            <div id = "macBook" className = 'for-mac' ref={p => this.macbook = p} style={{backgroundImage: `url(${sliderCnofig[curIndex].computerImg['eng']})`}}></div>
                            <div id = "iphone"  className = 'for-phone' ref={p => this.iPhone = p} style={{backgroundImage: `url(${sliderCnofig[curIndex].phoneImg['eng']})`}} ></div>
                            <img src = '../../Assets/Images/LandingImg/MacbookPro.png' alt = 'macBook'/>
                            <img src = '../../Assets/Images/LandingImg/iPhone.png' alt = 'iPhone' />
                        </div>
                        <div className = 'uni-service-wrap'>   
                       
                         
                            <SliderInfo 
                                imgUrl = {sliderCnofig[curIndex].icon}
                                title = {sliderCnofig[curIndex].title['eng']}
                                content = {sliderCnofig[curIndex].content['eng']} />
                               
                            <div className = 'js-cont-center'>{sliderCnofig.map((item, index) => (
                                <ClickableBulltes key = {index} bullets = {item.active? 'bullets active' : 'bullets'} clicked = {() =>this.handleUniServicesSwitch(index)}/>
                                ))}
                            </div>
                        </div>  
                </div>
                    {sliderCnofig.map((config, index) =>(<SliderInfoMobile key ={index} sliderCnofig = {config}/> ))}   
            </Fragment>
            
        );
    }
}

InfoSlider.propTypes = {
    curIndex: PropTypes.number,
    title: PropTypes.string,

};

export default InfoSlider;