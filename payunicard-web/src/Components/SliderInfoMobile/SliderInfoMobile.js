import React from 'react'
import './sliderInfoMobile.scss'
import  PropTypes  from 'prop-types';



const SliderInfoMobile = (props) => {
    const {icon, title, content} = props.sliderCnofig

    return (
       
        <div className = 'SliderInfo-mobile'>
            <div className = 'info-header'>
                <img src = {icon} alt = 'icon' />
                <div className = 'info-title'>{title['eng']}</div>
            </div>
            {content['eng'].map((cont, index) => (
                <div key = {index} className = 'info-content'>
                    <img src = '../../Assets/Images/LandingImg/mark-upera.svg' alt = 'icon' />
                    {cont}</div>
            ))}
        </div>
    )
}

SliderInfoMobile.propTypes = {
    icon: PropTypes.string,
    title: PropTypes.string,
    content: PropTypes.array,
    
}

export default SliderInfoMobile
