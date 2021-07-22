import React, {useState} from 'react';
import PropTypes from 'prop-types';
import { Select, SelectList } from '../UI/UiComponents';

const SelectCity = (props) => {
    const { cities, placeholder, handleSelect } = props;
    const [selected, setSelected ] = useState(null);

    const onSelect = (data, callBack) => {
        setSelected(data);
        handleSelect(data);
        callBack(false);
    }
    

    return (
        <Select
            hasSearch
            queryParam = 'name'
                data = { cities } 
                selected = { selected ? selected?.name : <div style={{padding: 10}}>{ placeholder }</div> }
                display ={(element, setVisible) => (
                    <SelectList 
                        key={ element.cityId } 
                        selected = { element } 
                        list
                        listClassRow = 'selectLIst'
                        clicked={() => onSelect(element, setVisible)}>
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

