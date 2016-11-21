import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';
import { RouterStore, syncHistoryWithStore } from 'mobx-react-router';
import { Router, Route, browserHistory } from 'react-router';
import { enableLogging } from 'mobx-logger';

import SearchPage from './js/SearchPage';
import bookStore from './js/EbookStore';

import CSSStyle from './css/style.css';

enableLogging({
    // predicate: true,
    action: true,
    reaction: true,
    transaction: true,
    compute: true
});

const routingStore = new RouterStore();

const stores = {
    bookStore
};

const history = syncHistoryWithStore(browserHistory, routingStore);

class App extends Component {
    render() {
        return (
            <Provider {...stores}>
                <Router history={history}>
                    <Route path='/' component={SearchPage} />
                </Router>
            </Provider>
        );
    }
}

ReactDOM.render(
    <App/>,
    document.getElementById('appContainer')
);
