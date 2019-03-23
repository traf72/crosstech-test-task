// @flow

import React from 'react';
import { CylinderSpinLoader } from 'react-css-loaders';

type Props = {
    className?: string,
}

const Loader = ({className = '', ...rest}: Props) => {
    const resultClass = `loader ${className}`;
    return (
        <div className={resultClass}>
            <CylinderSpinLoader color="#0EC0D4" size="20"  {...rest} />
        </div>
    );
};

export default Loader;
