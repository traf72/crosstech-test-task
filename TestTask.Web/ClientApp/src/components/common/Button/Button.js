// @flow

import './Button.scss';
import * as React from 'react';
import { Button as BootstrapButton } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export type Props = {
    icon?: string | [string, string],
    children: React.Node,
};

const Button = ({ icon, children, ...rest }: Props) => {
    return (
        <BootstrapButton type="button" {...rest}>
            {icon && <FontAwesomeIcon icon={icon} className="btn-icon" />}
            {children}
        </BootstrapButton>
    );
};

export default Button;
