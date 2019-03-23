// @flow

import type { Props } from './Button';

import './LinkButton.scss';
import React from 'react';
import Button from './Button';

const LinkButton = (props: Props)  => {
    return (
        <Button color="link" {...props}></Button>
    );
};

export default LinkButton;
