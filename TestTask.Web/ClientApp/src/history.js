// @flow

import createHistory from 'history/createBrowserHistory';

const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href');
const history = createHistory({ basename: baseUrl == null ? undefined : baseUrl });

export default history;
