import React, {useState} from 'react';
import PropTypes from 'prop-types';
import { Select, SelectList } from '../UI/UiComponents';

const SelectPackageCurrency = (props) => {
    const { packageCurrencies, placeholder } = props;
    const [ selected, setSelected ] = useState(null);

    const onSelect = (data, callBack) => {
        setSelected(data);
        handleSelect(data);
        callBack(false);
    } 
    
    return (
        <Select
        selectClass = 'Selected mb-20'
                data = { packageCurrencies } 
                selected = { selected ? selected?.packageCurrencies : <div style={{padding: 10}}>{ placeholder }</div> }
                display ={(element, setVisible) => (
                    <SelectList 
                        key={ element.packageCurrenciesCode } 
                        selected = { element } 
                        list
                        listClassRow = 'selectLIst'
                        clicked={() => {onSelect(element, setVisible)}}>
                            {element.packageCurrencies}
                    </SelectList> 
                )}/>
    )
}

SelectPackageCurrency.propTypes = {
    packageCurrencies: PropTypes.array,
    placeholder: PropTypes.string
}

export default SelectPackageCurrency;

