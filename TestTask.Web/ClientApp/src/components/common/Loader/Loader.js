import React from 'react';
import PropTypes from 'prop-types';
import { CylinderSpinLoader } from 'react-css-loaders';

const Loader = ({className = '', ...rest}) => {
    const resultClass = `loader ${className}`;
    return (
        <div className={resultClass}>
            <CylinderSpinLoader color="#0EC0D4" size="20"  {...rest} />
        </div>
    );
};

Loader.propTypes = {
    className: PropTypes.string,
};

export default Loader;
