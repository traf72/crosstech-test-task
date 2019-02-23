import './PageLoader.scss';
import React from 'react';
import PropTypes from 'prop-types';
import Loader from './Loader';
import { connect } from 'react-redux';

const PageLoader = ({ visible, showOverlay }) => {
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

PageLoader.propTypes = {
    visible: PropTypes.bool,
    showOverlay: PropTypes.bool,
};

export default connect(state => {
    return state.pageLoader;
})(PageLoader);