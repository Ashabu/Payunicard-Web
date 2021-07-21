import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import { Select, SelectList } from '../UI/UiComponents';

const SelectCity = (props) => {
    const { cities, placeholder } = props;
    const [selectedCity, setSelectedCity ] = useState(null);

    return (
        <Select
                data = { cities } 
                selected = { selectedCity ? selectedCity?.name : <div style={{padding: 10}}>{ placeholder }</div> }
                display ={(element, setVisible) => (
                    <SelectList 
                        key={ element.cityId } 
                        selected = { element } 
                        list
                        clicked={() => { setSelectedCity(element); setVisible(false)}}>
                            {element.name}
                    </SelectList> 
                )}/>
    )
}

SelectCity.propTypes = {
    countries: PropTypes.array,
    placeholder: PropTypes.string


}

export default SelectCity;

