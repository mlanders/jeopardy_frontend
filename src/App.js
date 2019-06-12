import React from 'react';
import { StateProvider } from 'react-conflux';
import { userContext, userReducer } from './conflux/userReducer';

import Jeopardy from './components/jeopardy';

function App() {
    return (
        <StateProvider reducer={userReducer} stateContext={userContext}>
            <Jeopardy />
        </StateProvider>
    );
}

export default App;
