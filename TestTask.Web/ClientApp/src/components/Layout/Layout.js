import './Layout.scss';
import React from 'react';
import PropTypes from 'prop-types';
import { Container, Row } from 'reactstrap';
import { connect } from 'react-redux';
import NavMenu from '../NavMenu';
import Sidebar from '../Sidebar';
import { PageLoader } from '../common/Loader';
import allRoutes, { isPathMatch } from '../../routes';

const Layout = ({ children, path }) => {
    const route = Object.values(allRoutes).find(r => isPathMatch(path, r.url));

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

Sidebar.propTypes = {
    path: PropTypes.string,
}

export default connect(state => {
    return {
        'path': state.router.location.pathname,
    };
})(Layout);