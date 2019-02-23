import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import Restricted from './Restricted';
import { connect } from 'react-redux';
import CheckAccess from '../decorators/CheckAccess'

const ProtectedRoute = ({ isAllowed, ...rest }) => {
    return isAllowed ? <Route {...rest} /> : <Restricted />;
}

ProtectedRoute.propTypes = {
    isAllowed: PropTypes.bool,
}

export default connect(state => {
    return { userRoles: state.auth.user.roles }
})(CheckAccess(ProtectedRoute));