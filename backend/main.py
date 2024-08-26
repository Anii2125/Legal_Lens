from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from llm_integration import LLMIntegration
from document_processor import process_document

app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = 'uploads'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

@app.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify({"error": "No file part"}), 400

    file = request.files['file']
    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400

    file_path = os.path.join(UPLOAD_FOLDER, file.filename)
    file.save(file_path)

    # Process the uploaded file
    document_text = process_document(file_path)

    # Initialize LLM integration
    api_key = os.getenv('GROQ_API_KEY')
    if api_key is None:
        return jsonify({"error": "GROQ API key not found in environment variables"}), 500

    llm_integration = LLMIntegration(api_key)
    
    # Analyze the document
    analysis = llm_integration.analyze_document(document_text)

    # Clean up: remove the temporary file
    os.remove(file_path)

    return jsonify(analysis)

@app.route('/followup', methods=['POST'])
def followup_question():
    data = request.json
    question = data.get('question')
    context = data.get('context')

    if not question or not context:
        return jsonify({"error": "Invalid input"}), 400

    api_key = os.getenv('GROQ_API_KEY')
    if api_key is None:
        return jsonify({"error": "GROQ API key not found in environment variables"}), 500

    llm_integration = LLMIntegration(api_key)
    
    try:
        # Get follow-up analysis
        result = llm_integration.get_followup_analysis(question, context)
        return jsonify(result)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run()
