import React from 'react';
import Home from './components/marketing/home';
import Index from './components/app/index';

const user = localStorage.getItem('firebaseui::rememberedAccounts');

function App() {
    return <div>{user ? <Index /> : <Home />}</div>;
}

export default App;
