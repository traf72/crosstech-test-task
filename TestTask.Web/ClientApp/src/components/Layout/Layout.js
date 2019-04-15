// @flow

import type { State, Dispatch } from '../../flow/redux'
import type { Route } from '../../routes'

import './Layout.scss';
import * as React from 'react';
import { Container, Row } from 'reactstrap';
import { connect } from 'react-redux';
import NavMenu from '../NavMenu';
import Sidebar from '../Sidebar';
import { PageLoader } from '../common/Loader';
import allRoutes, { isPathMatch } from '../../routes';

type Props = {|
    children: React.Node,
    path: string,
    dispatch: Dispatch,
|};

const Layout = ({ children, path }: Props) => {
    let route = Object.values(allRoutes).find((r: any) => isPathMatch(path, r.url));
    route = ((route: any): Route);

    return (
        <div>
            <NavMenu />
            <Container fluid>
                <Row>
                    <Sidebar className="col-md-2 d-none d-md-block" />
                    <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-4">
                        {route && route.title && <h3 className="mt-3 mb-3">{route.title}</h3>}
                        <div>
                            {children}
                        </div>
                        <PageLoader />
                    </main>
                </Row>
            </Container>
        </div>
    );
};

type OwnProps = {|
    children: React.Node,
|};

export default connect<Props, OwnProps, _, _, State, _>(state => {
    return {
        path: state.router.location.pathname,
    };
})(Layout);
