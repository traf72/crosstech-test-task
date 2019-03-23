// @flow

import * as React from 'react';

type Props = {
    noBootstrap?: boolean,
    bsSize?: 'sm' | 'lg',
    invalid?: boolean,
    className: string,
};

export default (RawInput: React.ComponentType<any>) => class BootstrapInput extends React.Component<Props> {
    static defaultProps = {
        className: '',
    }

    render() {
        const { className, noBootstrap, bsSize, invalid, ...rest } = this.props;
        let resultClass = className;
        if (!noBootstrap) {
            resultClass += ' form-control';
            if (bsSize) {
                resultClass += ` form-control-${bsSize}`;
            }
            if (invalid) {
                resultClass += ' is-invalid';
            }
        }

        return <RawInput className={resultClass} {...rest} />;
    }
}
