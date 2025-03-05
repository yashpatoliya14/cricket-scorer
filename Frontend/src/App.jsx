import React, { lazy } from 'react';
import { BrowserRouter } from 'react-router-dom';

const Home = lazy(() => import('./pages/Home.jsx'));

function App() {
    return (
        <>
            <BrowserRouter>
                <Home />
            </BrowserRouter>
        </>
    );
}

export default App;