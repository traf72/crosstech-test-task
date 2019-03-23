// @flow

import * as React from 'react';

export type Props = {
    allowedRoles: string[],
    userRoles: string[],
};

export default (Component: React.ComponentType<any>) => class CheckAccess extends React.Component<Props> {
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
