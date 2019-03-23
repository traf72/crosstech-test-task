// @flow

import type { State } from '../flow/redux';
import type { AuthState } from '../ducks/Auth/flow';
import type { Props as ConnectProps } from '../decorators/EnsureUserLoaded';

import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import EnsureUserLoaded from '../decorators/EnsureUserLoaded';
import { connect } from 'react-redux';
import { fetchUser } from '../ducks/Auth';
import { signIn as signInRoute } from '../routes';

type Props = {
    auth: AuthState,
};

const PrivateRoute = ({ auth, ...rest }: Props) => {
    if (auth.user) {
        return <Route {...rest} />;
    }

    return <Redirect to={signInRoute.url} />;
}

export default connect<ConnectProps, any, _, _, State, _>(state => {
    return {
        auth: state.auth,
    }
}, { fetchUser })(EnsureUserLoaded(PrivateRoute))
