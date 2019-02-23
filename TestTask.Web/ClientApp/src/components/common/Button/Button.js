import './Button.scss';
import React from 'react';
import PropTypes from 'prop-types';
import { Button as BootstrapButton } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Button = ({ icon, children, ...rest }) => {
    return (
        <BootstrapButton type="button" {...rest}>
            {icon && <FontAwesomeIcon icon={icon} className="btn-icon" />}
            {children}
        </BootstrapButton>
    );
};

Button.propTypes = {
    icon: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.array,
    ]),
}

export default Button;
