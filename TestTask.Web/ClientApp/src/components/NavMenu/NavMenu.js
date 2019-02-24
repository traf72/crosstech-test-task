import './NavMenu.scss';
import React from 'react';
import { Collapse, Navbar, NavbarBrand, NavbarToggler, Nav, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { connect } from 'react-redux';
import { signOut } from '../../ducks/Auth';

class NavMenu extends React.Component {
    state = {
        isOpen: false
    };

    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    render() {
        const user = this.props.user;
        const userName = `${user.firstName} ${user.lastName}`;

        return (
            <header>
                <Navbar className="nav-menu p-0 shadow" fixed="top" expand="sm" color="dark" dark>
                    <NavbarBrand className="col-sm-3 col-md-2 mr-0" tag="span">TestTask</NavbarBrand>
                    <NavbarToggler onClick={this.toggle} className="mr-2" />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="mr-auto my-2 my-sm-0" navbar></Nav>
                        <Nav className="mx-3 mx-sm-2 my-2 my-sm-0" navbar>
                            <UncontrolledDropdown nav inNavbar>
                                <DropdownToggle nav caret><FontAwesomeIcon icon="user" />{userName}</DropdownToggle>
                                <DropdownMenu right>
                                    <DropdownItem onClick={e => this.props.signOut()}><FontAwesomeIcon icon="sign-out-alt" />Выход</DropdownItem>
                                </DropdownMenu>
                            </UncontrolledDropdown>
                        </Nav>
                    </Collapse>
                </Navbar>
            </header>
        );
    }
}

export default connect(state => {
    return {
        user: state.auth.user
    }
}, { signOut })(NavMenu);