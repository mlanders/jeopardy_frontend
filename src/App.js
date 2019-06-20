import React from 'react';
import { StateProvider } from 'react-conflux';
import { userContext, userReducer } from './conflux/userReducer';

import { GlobalStyles } from './styles';
import Dashboard from './components/dashboard/Dashboard';
import { Route } from 'react-router-dom';

function App() {
    return (
        <StateProvider reducer={userReducer} stateContext={userContext}>
            <GlobalStyles />
            <Route path="/" render={props => <Dashboard {...props} />} />
        </StateProvider>
    );
}

export default App;
