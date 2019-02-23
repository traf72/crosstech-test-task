import React from 'react';
import PropTypes from 'prop-types';

export default Component => class CheckAccess extends React.Component {
    static propTypes = {
        allowedRoles: PropTypes.arrayOf(PropTypes.string),
        userRoles: PropTypes.arrayOf(PropTypes.string),
    }

    static defaultProps = {
        allowedRoles: [],
        userRoles: [],
    }

    isAllowed = () => {
        return this.props.userRoles.some(r => this.props.allowedRoles.includes(r));
    }

    render() {
        const { allowedRoles, userRoles, ...rest } = this.props;
        return (
            <Component {...rest} isAllowed={this.isAllowed()} />
        );
    }
}