import './Sidebar.scss';
import React from 'react';
import PropTypes from 'prop-types';
import { Navbar, Nav, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { connect } from 'react-redux';
import { sidebarRoutes as routes, isPathMatch }  from '../../routes';

const Sidebar = ({ className, path }) => {
    function getNavLink(url, icon, title) {
        return <NavLink tag={Link} active={isPathMatch(path, url)} to={url}><FontAwesomeIcon icon={icon} fixedWidth />{title}</NavLink>;
    }

    const resultClass = `${className} sidebar`;
    return (
        <Navbar className={resultClass} color="light">
            <div className="sidebar-sticky">
                <Nav className="flex-column">
                    <NavItem>
                        {getNavLink(routes.home.url, 'users', routes.home.title)}
                    </NavItem>
                    <NavItem>
                        {getNavLink(routes.charts.url, 'chart-pie', routes.charts.title)}
                    </NavItem>
                </Nav>
            </div>
        </Navbar>
    );
}

Sidebar.propTypes = {
    className: PropTypes.string,
    path: PropTypes.string,
}

Sidebar.defaultProps = {
    className: '',
}

export default connect(
    state => {
        return {
            'path': state.router.location.pathname,
        }
    },
)(Sidebar);