import React, { Fragment, useEffect } from 'react';
import Validation from '../InputValidation/Validation'
import PropTypes from 'prop-types';



const  PasswordComplexity = (props) => {
    const {regPassword } = props;

    let lengthCheck = Validation.validatePasswordLength(regPassword) ? null : <span>- 8 სიმბოლოს</span> 
    let bigLetterCheck = Validation.validateBigLetter(regPassword) ? null : <span>- ერთ დიდ ასოს</span>       
    let smallLetterCheck = Validation.validateSmallLetter(regPassword) ? null : <span>- ერთ პატარა ასოს</span>    
    let numberCheck = Validation.validateNumber(regPassword) ? null : <span>- ერთ ციფრს</span>     
    let specialNumbeCheck = Validation.validateSpecialChar(regPassword) ? null : <span> - ერთ სპეციალურ სიმბოლოს (გარდა წერტილისა და @ სიმბოლოსი) </span>

    let passwordComplexity = (
        <div style = {{display: 'flex', flexDirection: 'column'}}>
            <span>პაროლი უნდა შეიცავდეს მინიმუმ:</span>     
            {lengthCheck}
            { bigLetterCheck}
            { smallLetterCheck}
            { numberCheck}
            { specialNumbeCheck}
        </div>
    )
    
    if( Validation.validateFullPassword(regPassword)) {
        passwordComplexity = (
            <div>
                <span >პაროლი აკმაყოფილებს მოთხოვნებს </span>
            </div>
        )
    }
    
    return (
        <Fragment>
            {passwordComplexity}
        </Fragment>
    );
}

PasswordComplexity.propTypes = {
    regPassword: PropTypes.string
};

export default PasswordComplexity;