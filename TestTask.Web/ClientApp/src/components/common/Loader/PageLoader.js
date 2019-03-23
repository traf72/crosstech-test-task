// @flow

import type { State, Dispatch } from '../../../flow/redux';

import './PageLoader.scss';
import React from 'react';
import Loader from './Loader';
import { connect } from 'react-redux';

type Props = {|
    visible: boolean,
    showOverlay: boolean,
    dispatch: Dispatch,
|};

const PageLoader = ({ visible, showOverlay }: Props) => {
    if (!visible) {
        return null;
    }

    let className = 'page-loader';
    if (showOverlay) {
        className += ' overlay';
    }

    return (
        <div className={className}>
            <Loader />
        </div>
    );
}

export default connect<Props, any, _, _, State, _>(state => {
    return state.pageLoader;
})(PageLoader);
