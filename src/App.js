import React from 'react';
import { StateProvider } from 'react-conflux';
import { userReducer } from './store/reducers/userReducer';
import { userContext } from './store/context';

import Jeopardy from './components/jeopardy';

function App() {
    return (
        <StateProvider reducer={userReducer} stateContext={userContext}>
            <Jeopardy />
        </StateProvider>
    );
}

export default App;
