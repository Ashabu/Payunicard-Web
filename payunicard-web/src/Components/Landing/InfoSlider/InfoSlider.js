import React, { Component, } from 'react';
import './infoSlider.scss';
import PropTypes from 'prop-types';
import SliderInfo from '../../SliderInfo/SliderInfo';
import ClickableBulltes from '../../HOC/ClickableBulltes';
import GlobalContext from '../../../Contexsts/GlobalContext'


class InfoSlider extends Component {

   static contextType = GlobalContext;

   iPhone = React.createRef();
   macbook = React.createRef(); 

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
      
      fpd = (context) => {
        context.setLang("eng");
      }
     
    render() {
        const sliderCnofig  =  this.props.sliderConfig;
        const curIndex = this.props.curIndex;
        return (
            
            <GlobalContext.Consumer>{(context) =>  
            <div className = 'infoSlider'>
                <div className = 'Macbook'>
                        <div id = "macBook" className = 'for-mac' ref={p => this.macbook = p} style={{backgroundImage: `url(${sliderCnofig[curIndex].computerImg[context.lang]})`}}></div>
                        <div id = "iphone"  className = 'for-phone' ref={p => this.iPhone = p} style={{backgroundImage: `url(${sliderCnofig[curIndex].phoneImg[context.lang]})`}} ></div>
                        <img src = '../../Assets/Images/LandingImg/MacBookPro.png' alt = 'macBook'/>
                        <img src = '../../Assets/Images/LandingImg/iPhone.png' alt = 'iPhone' />
                    </div>
                    <div className = 'uni-service-wrap'>   
                   
                     
                        <SliderInfo 
                            imgUrl = {sliderCnofig[curIndex].icon}
                            title = {sliderCnofig[curIndex].title[context.lang]}
                            content = {sliderCnofig[curIndex].content[context.lang]} />
                           
                        <div className = 'js-cont-center'>{sliderCnofig.map((item, index) => (
                            <ClickableBulltes key = {index} bullets = {item.active? 'bullets active' : 'bullets'} clicked = {() =>this.handleUniServicesSwitch(index)}/>
                            ))}
                        </div>
                    </div>  
                     
            </div>}
            </GlobalContext.Consumer>
            
        );
    }
}

InfoSlider.propTypes = {
    curIndex: PropTypes.number,
    title: PropTypes.string,

};

export default InfoSlider;