import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import EnsureUserLoaded from '../decorators/EnsureUserLoaded';
import { connect } from 'react-redux';
import { fetchUser } from '../ducks/Auth';
import { signIn as signInRoute } from '../routes';

const PrivateRoute = ({ auth, ...rest }) => {
    if (auth.user) {
        return <Route {...rest} />;
    }

    return <Redirect to={signInRoute.url} />;
}

export default connect(state => {
    return {
        auth: state.auth,
    }
}, { fetchUser })(EnsureUserLoaded(PrivateRoute))