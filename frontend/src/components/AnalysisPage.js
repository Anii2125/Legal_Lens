import React, { useState } from 'react';
import axios from 'axios';
import "./AnalysisPage.css"

function AnalysisPage() {
    const [file, setFile] = useState(null);
    const [analysis, setAnalysis] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [question, setQuestion] = useState('');
    const [followup, setFollowup] = useState(null);

    const handleFileUpload = async (event) => {
        setLoading(true);
        setError(null);
        try {
            const formData = new FormData();
            formData.append('file', file);
            const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/upload`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setAnalysis(response.data);
        } catch (err) {
            setError('Error uploading file.');
        } finally {
            setLoading(false);
        }
    };

    const handleFollowupSubmit = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/followup`, {
                question,
                context: JSON.stringify(analysis),
            });
            setFollowup(response.data);
        } catch (err) {
            setError('Error asking follow-up question.');
        } finally {
            setLoading(false);
        }
    };

    return (

    <div className="analysis-container">
            <h1>Legal Document Analyzer</h1>
             <p>This tool allows you to analyze legal documents and ask questions about them.</p>
             <input
                type="file"
                onChange={(e) => setFile(e.target.files[0])}
            />
            <button onClick={handleFileUpload} disabled={loading}>
                {loading ? 'Uploading...' : 'Upload File'}
            </button>

            {error && <p className="error">{error}</p>}

            {analysis && (
                <div className="analysis">
                    <h2>Summary</h2>
                    <p>{analysis.summary || 'No summary available.'}</p>
                    <h2>Key Points</h2>
                    <ul>
                        {(analysis.key_points || []).map((point, index) => (
                            <li key={index}>{point}</li>
                        ))}
                    </ul>
                </div>
            )}

            {analysis && (
                <div className="followup">
                    <h2>Ask a Follow-up Question</h2>
                    <input
                        type="text"
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                    />
                    <button onClick={handleFollowupSubmit} disabled={loading}>
                        {loading ? 'Processing...' : 'Submit Question'}
                    </button>
                    {followup && (
                        <div className="followup-result">
                            <h3>Answer:</h3>
                            <p>{followup.answer}</p>
                            <h3>Explanation:</h3>
                            <p>{followup.explanation}</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default AnalysisPage;
