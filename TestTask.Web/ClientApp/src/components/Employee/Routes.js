import React from 'react';
import { Switch, Route } from 'react-router';
import { newEmployee as newEmp, editEmployee as editEmp } from '../../routes';
import Edit from './Edit';
import ProtectedRoute from '../ProtectedRoute';
import NotFound from '../NotFound';

const allowedRoles = ['Admin'];

const Routes = () => {
    function renderEdit({ match }) {
        const { params } = match;
        return <Edit id={+params.id} />;
    };

    return (
        <Switch>
            <ProtectedRoute path={newEmp.url} exact={newEmp.exact} component={Edit} allowedRoles={allowedRoles} />
            <ProtectedRoute path={editEmp.url} exact={editEmp.exact} component={renderEdit} allowedRoles={allowedRoles} />
            <Route component={NotFound} />
        </Switch>
    );
}

export default Routes;