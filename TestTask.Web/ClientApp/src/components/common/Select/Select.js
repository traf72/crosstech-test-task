import React from 'react';
import PropTypes from 'prop-types';
import ReactSelect, { components } from 'react-select';

const Select = props => {
    const { className, bsSize, invalid, catalog, ...rest } = props;

    function getClass() {
        let resultClass = `react-select ${className}`;
        if (bsSize) {
            if (bsSize === 'lg') {
                console.warn('The value "lg" is not supported yet');
            } else {
                resultClass += `react-select-${bsSize}`;
            }
        }

        if (invalid) {
            resultClass += ' is-invalid';
        }

        return resultClass;
    }

    let getOptionValue;
    let getOptionLabel;
    if (catalog) {
        getOptionValue = x => x.id;
        getOptionLabel = x => x.name;
    }

    return (
        <ReactSelect
            placeholder={props.multi ? 'Выберите элементы' : 'Выберите элемент'}
            noOptionsMessage={() => 'Ничего не найдено'}
            loadingMessage={() => 'Загрузка...'}
            className={getClass()}
            classNamePrefix="react-select"
            getOptionValue={getOptionValue}
            getOptionLabel={getOptionLabel}
            {...rest}
        />
    );
};

Select.propTypes = {
    bsSize: PropTypes.oneOf(['sm', 'lg']),
    catalog: PropTypes.bool,
    invalid: PropTypes.bool,
}

Select.defaultProps = {
    className: '',
}

export default Select;
export { components }; 
