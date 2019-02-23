import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default OriginalComponent => class EnsureUserLoaded extends Component {
    static propTypes = {
        auth: PropTypes.object.isRequired,
        fetchUser: PropTypes.func.isRequired,
    }

    componentDidMount() {
        this.ensureUserLoaded();
    }

    componentDidUpdate() {
        this.ensureUserLoaded();
    }

    ensureUserLoaded = () => {
        if (!this.isUserLoaded()) {
            this.props.fetchUser();
        }
    }

    isUserLoaded = () => {
        const { auth } = this.props;
        return auth.user != null || +auth.loadTime !== +new Date(0);
    }

    render() {
        const { auth } = this.props;

        if (!this.isUserLoaded() && !auth.signInInProgress) {
            // Возможно пользователь всё-таки авторизован, попробуем сначала проверить на сервере
            return null;
        }

        return <OriginalComponent {...this.props} />;
    }
}