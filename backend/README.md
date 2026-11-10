Pehal — Backend

The backend of Pehal, a survivor-centred support and institutional accountability platform.

This backend is built using FastAPI and Python. It provides APIs for the four core modules of Pehal and integrates AI-powered conversational support through the Adaption API.

Core Modules

1. Safe Space Companion

- AI-powered conversational support.
- Session-based conversations.
- Supportive, non-judgmental responses.
- Safety-oriented guidance and resources.

Endpoint: "POST /safe-space/chat"

2. Reporting Barrier Navigator

- Helps users explore reporting pathways.
- Considers the user's concern, barriers and preferred outcome.
- Provides possible options and suggested next steps.

Endpoint: "POST /reporting-navigator/guidance"

3. Survivor Advocacy Network

- Matches support requirements with available demonstration directory entries.
- Supports location-based filtering.
- Provides information about possible support organisations.

Endpoint: "POST /advocacy-network/match"

4. Institutional Accountability Tracker

- Create and retrieve cases.
- Add milestones to cases.
- Update milestone statuses.
- Record follow-up actions.

Endpoints:

- "GET /accountability/cases"
- "POST /accountability/cases"
- "GET /accountability/cases/{case_id}"
- "POST /accountability/cases/{case_id}/milestones"
- "PATCH /accountability/cases/{case_id}/milestones/{milestone_id}"
- "POST /accountability/cases/{case_id}/follow-ups"

Technology Stack

- Python 3.10+
- FastAPI
- Pydantic
- Uvicorn
- Adaption API
- Qwen 3.5 397B

Project Structure

backend/
├── app/
│   ├── main.py
│   └── ...
├── requirements.txt
└── README.md

Local Setup

1. Create and activate a virtual environment

From the project root:

python -m venv .venv

Windows PowerShell:

.venv\Scripts\Activate.ps1

2. Install dependencies

pip install -r backend/requirements.txt

3. Configure environment variables

Create a ".env" file in the project root, alongside the "backend" and "frontend" folders.

ADAPTION_API_KEY=your_api_key_here

Never commit your actual API key to GitHub.

4. Start the backend

cd backend
uvicorn app.main:app --reload

The API will run at:

"http://127.0.0.1:8000"

Interactive API documentation:

"http://127.0.0.1:8000/docs"

Important Notes

- The accountability tracker currently uses in-memory demonstration data. Data may be lost when the backend restarts.
- The advocacy network currently contains fictional demonstration organisations, not verified service providers.
- AI-generated guidance may be incomplete or inaccurate and should not replace professional advice.
- This prototype is not intended for storing real identifying or sensitive survivor information.

---

Pehal — Because support must follow through.