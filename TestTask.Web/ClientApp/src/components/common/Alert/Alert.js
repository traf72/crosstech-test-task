import './Alert.scss';
import React from 'react';
import PropTypes from 'prop-types';
import { Alert as BootstrapAlert } from 'reactstrap';
import { connect } from 'react-redux';
import { closeAlert, closeByTimeout } from '../../../ducks/Alert';

const Alert = ({ color, message, visible, closeTimeout, ...props }) => {
    if (visible && closeTimeout > 0) {
        props.closeByTimeout(closeTimeout);
    }

    return (
        <BootstrapAlert color={color} isOpen={visible} toggle={props.closeAlert}>
            {message}
        </BootstrapAlert>
    );
}

Alert.propTypes = {
    visible: PropTypes.bool,
    color: PropTypes.string,
    message: PropTypes.string.isRequired,
    closeAlert: PropTypes.func.isRequired,
    closeByTimeout: PropTypes.func,
    closeTimeout: PropTypes.number,
}

Alert.defaultProps = {
    closeTimeout: 0,
    closeByTimeout: x => x,
}

export default connect(state => {
    return { ...state.alert };
}, { closeAlert, closeByTimeout })(Alert);