import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Router, withRouter } from 'react-router-dom';
import { createBrowserHistory } from 'history';
const history = createBrowserHistory();

const AppWithRouter = withRouter(App);

ReactDOM.render(
    <Router history={history}>
        <AppWithRouter />
    </Router>,
    document.getElementById('root')
);

export default history;
