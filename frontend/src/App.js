import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import AnalysisPage from './components/AnalysisPage';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/analyze" element={<AnalysisPage />} />
            </Routes>
        </Router>
    );
}

export default App;
