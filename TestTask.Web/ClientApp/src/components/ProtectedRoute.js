import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { restricted as restrictedRoute } from '../routes';
import { connect } from 'react-redux';
import CheckAccess from '../decorators/CheckAccess'

const ProtectedRoute = ({ isAllowed, ...rest }) => {
    return isAllowed ? <Route {...rest} /> : <Redirect to={restrictedRoute.url} />;
}

export default connect(state => {
    return { userRoles: state.auth.user.roles }
})(CheckAccess(ProtectedRoute));