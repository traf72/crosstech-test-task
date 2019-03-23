// @flow

import * as React from 'react';

type Props = {|
    children: React.Node,
    loading: boolean,
|}

const NoDataComponent = ({ children, loading }: Props) => {
    if (loading) {
        return null;
    }

    return (
        <div className="rt-noData">{children}</div>
    );
}

export default NoDataComponent;
