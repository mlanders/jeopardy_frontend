import React from 'react';
import { StateProvider } from 'react-conflux';
import { userContext, userReducer } from './conflux/userReducer';

import Jeopardy from './components/jeopardy';
import { GlobalStyles } from './styles';

function App() {
    return (
        <StateProvider reducer={userReducer} stateContext={userContext}>
            <GlobalStyles />
            <Jeopardy />
        </StateProvider>
    );
}

export default App;
