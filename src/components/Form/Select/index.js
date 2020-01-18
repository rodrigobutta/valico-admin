import React  from 'react';
import Select from 'react-select';

const customStyles = {
    control: base => ({
        ...base,
        border: 0,
        boxShadow: 'none'
    }),
    option: (provided, state) => ({
        ...provided,        
        color: state.isSelected ? '#ffffff' : '#adb5bd',
        // backgroundColor: '#3d4145'
    })
};

// export default function SuperSelect(props) {
export default ({name, onChange, ...props}) => {


    const handleOnChange = (e) => (typeof(onChange) === 'function') ? onChange(name,e) : false

    return (
        <Select 
            {...props}
            styles={customStyles}            
            theme={(theme) => ({
                ...theme,
                colors: {
                ...theme.colors,
                    neutral0: '#3d4145', // background general
                    neutral5: '#0f0',
                    neutral10: '#00f',
                    neutral20: '#adb5bd', // arrow and split in default mode
                    neutral30: '#f00',
                    primary25: '#4090cb', // list hover background
                    primary: '#6c757d', // list selected item background
                    neutral50: '#6c757d', // placeholder
                    neutral60: '#fff', // arrow on focus
                    neutral80: '#fff', // Cursor of input on focus and selected text
                    neutral90: '#f00' // 
                },
                })}
            onChange={handleOnChange}
        />
    )
}