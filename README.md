# The Infinite AI

Welcome to The Infinite, an adaptive, multi-persona AI assistant platform.

## Project Vision

The Infinite provides specialized, context-aware conversational AI assistants for various domains, including finance, biology, and maternal health. The platform is designed with a focus on user experience, performance, and safety.

## Tech Stack

*   **Frontend:** React, TypeScript, Vite, Tailwind CSS
*   **Backend:** Python, Flask, Gunicorn
*   **AI:** Google Gemini API

## Getting Started (Local Development)

### Prerequisites

*   Node.js and npm
*   Python and pip
*   A Gemini API Key

### Setup

1.  **Clone the repository.**

2.  **Backend Setup:**
    *   Navigate to the `backend` directory.
    *   Create and activate a virtual environment.
    *   Run `pip install -r requirements.txt`.
    *   Set your `GEMINI_API_KEY` as an environment variable.
    *   Run `python app.py`. The backend will be running on `http://127.0.0.1:5001`.

3.  **Frontend Setup:**
    *   Navigate to the root directory.
    *   Run `npm install`.
    *   Create a `.env` file in the root and add your backend URL: `VITE_API_BACKEND_URL=http://127.0.0.1:5001`.
    *   Run `npm run dev`.

The application will be accessible in your browser.