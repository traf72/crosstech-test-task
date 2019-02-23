import React from 'react';
import { Spinner } from 'reactstrap';

const LoadingComponent = ({ loading, loadingText }) => {
    if (!loading) {
        return null;
    }

    return (
        <div className="-loading -active">
            <div className="-loading-inner">
                <Spinner className="grid-spinner" />
            </div>
        </div>
    );
}

export default LoadingComponent;