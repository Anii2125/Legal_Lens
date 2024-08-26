import React from 'react';
import { useNavigate } from 'react-router-dom';

function LandingPage() {
    const navigate = useNavigate();

    const handleGetStarted = () => {
        navigate('/analyze');
    };

    return (
        <div className="landing-container">
            <h1>Welcome to Legal Document Analyzer</h1>
            <p>Analyze legal documents and ask questions about them.</p>
            <button onClick={handleGetStarted}>Get Started</button>
        </div>
    );
}

export default LandingPage;
