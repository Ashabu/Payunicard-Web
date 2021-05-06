import React, {useState, useRef, useEffect} from 'react';
import './otpBox.scss';

const  OtpBox = (props) => {
    
    const input_0 = useRef();
    const input_1 = useRef();
    const input_2 = useRef();
    const input_3 = useRef();

    const [value_0, setValueOne] = useState("");
    const [value_1, setValueTwo] = useState("");
    const [value_2, setValueThree] = useState("");
    const [value_3, setValueFour] = useState("");

    const objectRef = {'input_0' : input_0, 'input_1' : input_1, 'input_2' : input_2, 'input_3' : input_3, }


    const handleKeyUp = (index) => {
        if(index === 3 ) {
            alert();
            return
        }
        if(objectRef[`input_${index}`].current.value !== "") {
             objectRef[`input_${index + 1}`].current.focus();
        } 

           
        }

    const handleFocusPrev = (event, index) => {
        if(event.keyCode === 8 || event.keyCode === 46) {
            event.preventDefault();
            if(objectRef[`input_${index}`].current.value !== ""){
                objectRef[`input_${index}`].current.value = "";
                return;
            } else {
                if(index === 0 ) {
                    alert();
                    return
                }
                objectRef[`input_${index - 1}`].current.focus();
            }
            
        }
    }

    

    useEffect(() => {
        
        }, [])



    return (
        <div className = 'Otp-Box'>
            <input value = {value_0} type = 'text' maxLength = '1' onKeyDown = {(e) => handleFocusPrev(e, 0)} onChange = {(e) => setValueOne(e.target.value)} ref = {input_0} onKeyUp = {()=>handleKeyUp(0)}/>
            <input value = {value_1} type = 'text' maxLength = '1' onKeyDown = {(e) => handleFocusPrev(e, 1)} onChange = {(e) => setValueTwo(e.target.value)} ref = {input_1} onKeyUp = {()=>handleKeyUp(1)}/>
            <input value = {value_2} type = 'text' maxLength = '1' onKeyDown = {(e) => handleFocusPrev(e, 2)} onChange = {(e) => setValueThree(e.target.value)} ref = {input_2} onKeyUp = {()=>handleKeyUp(2)}/>
            <input value = {value_3} type = 'text' maxLength = '1' onKeyDown = {(e) => handleFocusPrev(e, 3)} onChange = {(e) => setValueFour(e.target.value)} ref = {input_3} onKeyUp = {()=>handleKeyUp(3)}/>
        </div> 
    );
}

export default OtpBox;