import React from 'react';

const NoDataComponent = ({ children, loading }) => {
    if (loading) {
        return null;
    }

    return (
        <div className="rt-noData">{children}</div>
    );
}

export default NoDataComponent;