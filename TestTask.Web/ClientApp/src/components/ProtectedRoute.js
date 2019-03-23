// @flow

import type { State } from '../flow/redux';
import type { Props as ConnectProps } from '../decorators/CheckAccess';

import React from 'react';
import { Route } from 'react-router-dom';
import Restricted from './Restricted';
import { connect } from 'react-redux';
import CheckAccess from '../decorators/CheckAccess'

type Props = {
    isAllowed: boolean,
};

const ProtectedRoute = ({ isAllowed, ...rest }: Props) => {
    return isAllowed ? <Route {...rest} /> : <Restricted />;
}

export default connect<ConnectProps, any, _, _, State, _>(state => {
    return { userRoles: state.auth.user && state.auth.user.roles }
})(CheckAccess(ProtectedRoute));
