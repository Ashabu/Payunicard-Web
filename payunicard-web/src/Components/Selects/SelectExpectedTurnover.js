import React, {useState} from 'react';
import PropTypes from 'prop-types';
import { Select, SelectList } from '../UI/UiComponents';

const SelectExpectedTurnover = (props) => {
    const { expectedTurnover, placeholder } = props;
    const [ selected, setSelected ] = useState(null);

    return (
        <Select
        selectClass = 'Selected mb-20'
                data = { expectedTurnover } 
                selected = { selected ? selected?.expectedTurnover : <div style={{padding: 10}}>{ placeholder }</div> }
                display ={(element, setVisible) => (
                    <SelectList 
                        key={ element.expectedTurnoverCode } 
                        selected = { element } 
                        list
                        listClassRow = 'selectLIst'
                        clicked={() => { setSelected(element); setVisible(false)}}>
                            {element.expectedTurnover}
                    </SelectList> 
                )}/>
    )
}

SelectExpectedTurnover.propTypes = {
    expectedTurnover: PropTypes.array,
    placeholder: PropTypes.string
}

export default SelectExpectedTurnover;

