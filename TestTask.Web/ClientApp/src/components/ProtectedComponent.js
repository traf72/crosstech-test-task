// @flow

import type { State } from '../flow/redux';
import type { Props as ConnectProps } from '../decorators/CheckAccess';

import * as React from 'react';
import { connect } from 'react-redux';
import CheckAccess from '../decorators/CheckAccess'

type Props = {|
    isAllowed: boolean,
    children: React.Node,
|};

const ProtectedComponent = ({ isAllowed, children }: Props) => {
    return isAllowed ? children : null;
}

export default connect<ConnectProps, any, _, _, State, _>(state => {
    return { userRoles: state.auth.user && state.auth.user.roles }
})(CheckAccess(ProtectedComponent));
