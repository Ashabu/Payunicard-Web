import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import { Select, SelectList } from '../UI/UiComponents';

const SelectCountry = (props) => {
    const { countries, placeholder, current } = props;
    const [selectedCountry, setSelectedCountry ] = useState(null);

    const currentCountry = (id) => {
        let currencCountry = countries.filter(c => c.countryID === id);
        setSelectedAccount(currencCountry[0]);
    }; 

    useEffect(() => {
        if(current) {
            currentCountry(current);
        };
    }, [current]); 


    return (
        <Select
        selectClass = 'Selected mb-20'
                data = { countries } 
                selected = { selectedCountry ? selectedCountry?.countryName : <div style={{padding: 10}}>{ placeholder }</div> }
                hasSearch
                queryParam = 'countryName'
                display ={(element, setVisible) => (
                    <SelectList 
                        listClassRow = 'selectLIst'
                        key={ element.countryID } 
                        selected = { element } 
                        list
                        clicked={() => { setSelectedCountry(element); setVisible(false)}}>
                            {element.countryName}
                    </SelectList> 
                )}/>
    )
}

SelectCountry.propTypes = {
    countries: PropTypes.array,
    current: PropTypes.number,
    placeholder: PropTypes.string


}

export default SelectCountry

