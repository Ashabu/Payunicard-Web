import React, { Component } from 'react';
import './infoSlider.scss';
import PropTypes from 'prop-types';
import SliderInfo from '../../SliderInfo/SliderInfo';
import ClickableBulltes from '../../HOC/ClickableBulltes';
import UIdata from '../../UI/UIdata';


class InfoSlider extends Component {
    
    state =  {
        uniServices: UIdata.UniServices,
        curIndex : 0,

    }

    componentDidMount() {
        this.serviceTmout = setTimeout(this.handleUniServicesSwitch, 500); 
            
         
        
    }

    

    componentWillUnmount() {
        clearTimeout(this.serviceTmout);
        clearInterval(this.ChangeInterval);
    }

    handleBulletActive =() => {
        let serviceObj = [...this.state.uniServices];
        
        for(let i = 0; i < serviceObj.length; i++){
            serviceObj[i].active = false;
            this.setState({uniServices: serviceObj})
        }
    }
    


    handleUniServicesSwitch = (i = 0) => {
        let serviceObj = [...this.state.uniServices];

        let fn = () => {
        this.handleBulletActive();

        serviceObj[i].active = true;
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


    render() {
        return (
            <div className = 'infoSlider'>
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
        );
    }
}

InfoSlider.propTypes = {
    curIndex: PropTypes.number,
    title: PropTypes.string,

};

export default InfoSlider;