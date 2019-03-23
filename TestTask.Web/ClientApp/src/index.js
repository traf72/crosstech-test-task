// @flow

// $FlowIgnore
import 'bootstrap/dist/css/bootstrap.css';
import './index.scss';
import './polyfills';
import './libs/font-awesome';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import history from './history';
import store from './store';
import App from './App';

const root = document.getElementById('root')
if (root) {
    ReactDOM.render(
        <Provider store={store}>
            <ConnectedRouter history={history}>
                <App />
            </ConnectedRouter>
        </Provider>,
        root
    );
}
