import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default RawInput => class BootstrapInput extends Component {
    static propTypes = {
        noBootstrap: PropTypes.bool,
        bsSize: PropTypes.oneOf(['sm', 'lg']),
        invalid: PropTypes.bool,
    }

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