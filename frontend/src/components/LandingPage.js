import React from 'react';
import { useNavigate } from 'react-router-dom';
import "./LandingPage.css"

function LandingPage() {
    const navigate = useNavigate();

    const handleGetStarted = () => {
        navigate('/analyze');
    };

    return (
        <div className="landing-container">
            <h1>Welcome to Legal Lens</h1>
            
            <p>Legal Lens is a digital tool that analyzes legal documents by summarizing content and identifying key points. It allows users to upload documents, view analyses, and ask follow-up questions for deeper insights.</p>

            <button onClick={handleGetStarted}>Get Started</button>
        </div>
    );
}

export default LandingPage;
