// @flow

import type { Action } from '../flow/redux';
import type { AuthState } from '../ducks/Auth/flow';

import * as React from 'react';

export type Props = {
    auth: AuthState,
    fetchUser: () => Action,
};

export default (OriginalComponent: React.ComponentType<any>) => class EnsureUserLoaded extends React.Component<Props> {
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
