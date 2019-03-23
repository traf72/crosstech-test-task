// @flow

import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
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
        <BrowserRouter>
            <Switch>
                <ProtectedRoute path={newEmp.url} exact={newEmp.exact} component={Edit} allowedRoles={allowedRoles} />
                <ProtectedRoute path={editEmp.url} exact={editEmp.exact} component={renderEdit} allowedRoles={allowedRoles} />
                <Route component={NotFound} />
            </Switch>
        </BrowserRouter>
    );
}

export default Routes;