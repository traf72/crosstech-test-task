// @flow

import type { State, Dispatch } from '../../flow/redux';

import './Sidebar.scss';
import React from 'react';
import { Navbar, Nav, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { connect } from 'react-redux';
import { sidebarRoutes as routes, isPathMatch }  from '../../routes';

type Props = {|
    className: string,
    path: string,
    dispatch: Dispatch,
|};

const Sidebar = ({ className, path }: Props) => {
    function getNavLink(url, icon, title) {
        return <NavLink tag={Link} active={isPathMatch(path, url)} to={url}><FontAwesomeIcon icon={icon} fixedWidth />{title}</NavLink>;
    }

    const resultClass = `${className} sidebar mt-2`;
    return (
        <Navbar className={resultClass} color="light">
            <Nav className="flex-column">
                <NavItem>
                    {getNavLink(routes.home.url, 'users', routes.home.title)}
                </NavItem>
                <NavItem>
                    {getNavLink(routes.charts.url, 'chart-pie', routes.charts.title)}
                </NavItem>
            </Nav>
        </Navbar>
    );
}

Sidebar.defaultProps = {
    className: '',
}

type OwnProps = {|
    className: string,
|};

export default connect<Props, OwnProps, _, _, State, _>(state => {
    return {
        path: state.router.location.pathname,
    }
},
)(Sidebar);
