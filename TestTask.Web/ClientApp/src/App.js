import React, { Fragment } from 'react';
import { Route, Switch } from 'react-router';
import Layout from './components/Layout';
import Alert from './components/common/Alert';
import PrivateRoute from './components/PrivateRoute';
import SignIn from './components/Auth/SignIn';
import Employees from './components/Employees';
import { Routes as EmployeeRoutes} from './components/Employee';
import Charts from './components/Charts';
import NotFound from './components/NotFound';
import { home, employee, charts, signIn } from './routes';

export default () => {
    function renderComponent(Component, withLayout = true) {
        if (withLayout) {
            return (
                <Layout>
                    {Component && <Component />}
                </Layout>
            );
        }

        return <Component />;
    }

    return (
        <Fragment>
            <Switch>
                <Route path={signIn.url} exact={signIn.exact} render={route => renderComponent(SignIn, false)} />
                <PrivateRoute path={home.url} exact={home.exact} render={route => renderComponent(Employees)} />
                <PrivateRoute path={employee.url} exact={employee.exact} render={route => renderComponent(EmployeeRoutes)} />
                <PrivateRoute path={charts.url} exact={charts.exact} render={route => renderComponent(Charts)} />
                <PrivateRoute render={route => renderComponent(NotFound)} />
            </Switch>
            <Alert />
        </Fragment>
    );
}