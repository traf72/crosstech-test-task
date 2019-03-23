// @flow

import type { State } from '../../../flow/redux';

import './Alert.scss';
import React from 'react';
import { Alert as BootstrapAlert } from 'reactstrap';
import { connect } from 'react-redux';
import { closeAlert, closeByTimeout } from '../../../ducks/Alert';

type Props = {|
    visible: boolean,
    color: string,
    message: string,
    closeAlert: typeof closeAlert,
    closeByTimeout: typeof closeByTimeout,
    closeTimeout: number
|};

const Alert = ({ color, message, visible, closeTimeout, ...props }: Props) => {
    if (visible && closeTimeout > 0) {
        props.closeByTimeout(closeTimeout);
    }

    return (
        <BootstrapAlert color={color} isOpen={visible} toggle={props.closeAlert}>
            {message}
        </BootstrapAlert>
    );
}

Alert.defaultProps = {
    closeTimeout: 0,
}

export default connect<Props, any, _, _, State, _>(state => {
    return { ...state.alert };
}, { closeAlert, closeByTimeout })(Alert);
