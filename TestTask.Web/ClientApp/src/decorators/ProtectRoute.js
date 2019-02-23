import React from 'react';
import ProtectedRoute from '../components/ProtectedRoute';

export default (route, roles, Component) => class ProtectRoute extends React.Component {
    render() {
        return <ProtectedRoute path={route.url} exact={route.exact} component={Component} allowedRoles={roles} />;
    }
}