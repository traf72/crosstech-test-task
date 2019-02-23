import React, { Fragment } from 'react';
import { Route, Switch } from 'react-router';
import Layout from './components/Layout';
import Alert from './components/common/Alert';
import PrivateRoute from './components/PrivateRoute';
import SignIn from './components/Auth/SignIn';
import Employees from './components/Employees';
import { home, charts, signIn } from './routes';

export default () => {
    function renderComponent(route, Component, withLayout = true) {
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
                <Route path={signIn.url} render={route => renderComponent(route, SignIn, false)} />
                <PrivateRoute path={home.url} render={route => renderComponent(route, Employees)} />
                <PrivateRoute render={renderComponent} />
            </Switch>
            <Alert />
        </Fragment>
    );
}