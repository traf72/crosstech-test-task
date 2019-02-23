import './ValidationMessage.scss';
import React from 'react';
import PropTypes from 'prop-types';

const ValidationMessage = ({ className, tag: Tag, children }) => {
    if (!children) {
        return null;
    }

    const resultClass = `${className} validation-message`;
    return (
        <Tag className={resultClass}>
            {children}
        </Tag>
    );
};

ValidationMessage.propTypes = {
    className: PropTypes.string,
    tag: PropTypes.string,
}

ValidationMessage.defaultProps = {
    className: '',
    tag: 'div',
}

export default ValidationMessage;