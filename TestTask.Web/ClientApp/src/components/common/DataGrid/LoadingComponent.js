// @flow

import React from 'react';
import { Spinner } from 'reactstrap';

type Props = {|
    loading: boolean,
    loadingText: string,
|}

const LoadingComponent = ({ loading, loadingText }: Props) => {
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
