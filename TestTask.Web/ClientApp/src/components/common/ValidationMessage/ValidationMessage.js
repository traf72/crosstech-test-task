// @flow

import './ValidationMessage.scss';
import * as React from 'react';

type Props = {|
    className: string,
    tag: string,
    children: React.Node,
|};

const ValidationMessage = ({ className, tag: Tag, children }: Props) => {
    if (!children) {
        return null;
    }

    const resultClass = `${className} validation-message`;
    return (
        <Tag className={resultClass}>
            {children}
        </Tag>
    );
};

ValidationMessage.defaultProps = {
    className: '',
    tag: 'div',
}

export default ValidationMessage;
