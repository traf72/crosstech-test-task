import './LinkButton.scss';
import React from 'react';
import Button from './Button';

const LinkButton = props => {
    return (
        <Button color="link" {...props}></Button>
    );
};

export default LinkButton;
