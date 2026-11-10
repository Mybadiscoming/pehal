Pehal

Because support must follow through.

Pehal is a survivor-centred support and institutional accountability platform designed to make it easier for women to access guidance, explore reporting options, connect with advocacy support, and track institutional responses.

Our approach is built around one belief: support should not end when someone speaks up.

About the Project

Survivors often face multiple barriers when seeking support: uncertainty about where to turn, fear of not being heard, difficulty navigating reporting systems, and a lack of follow-through from institutions.

Pehal brings together four connected modules to address these challenges through accessible guidance, support, advocacy, and accountability.

Core Features

1. Safe Space Companion

An AI-powered conversational space where users can express their concerns and receive supportive, non-judgmental guidance.

- Conversational support
- Context-aware responses
- Safety-oriented guidance
- Access to relevant support resources

2. Reporting Barrier Navigator

Helps users understand possible reporting pathways based on their concerns, circumstances, and preferred outcomes.

- Explore possible reporting options
- Identify barriers to reporting
- Receive suggested next steps
- Make informed decisions without pressure

3. Survivor Advocacy Network

A directory-style module designed to help users explore organisations and support services based on their location and support needs.

- Filter by support requirements
- Enter a city or state
- Explore relevant support options

4. Institutional Accountability Tracker

A case-tracking module designed to demonstrate how institutional responses and follow-ups can be monitored over time.

- Create and view cases
- Add milestones
- Update milestone statuses
- Record follow-up actions
- Track progress and pending actions

Technology Stack

Frontend

- Next.js
- React
- TypeScript
- Tailwind CSS

Backend

- Python
- FastAPI
- Pydantic

AI Integration

- Adaption API
- Qwen 3.5 397B

Project Structure

pehal/
├── backend/
│   ├── app/
│   │   ├── main.py
│   │   └── ...
│   └── requirements.txt
│
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   │   ├── safe-space/
│   │   │   ├── reporting-navigator/
│   │   │   ├── advocacy-network/
│   │   │   ├── accountability/
│   │   │   ├── dashboard/
│   │   │   └── ...
│   │   └── components/
│   ├── package.json
│   └── next.config.ts
│
├── .env.example
└── README.md

Getting Started

Prerequisites

- Python 3.10 or later
- Node.js and npm
- An Adaption API key

1. Clone the Repository

git clone https://github.com/Mybadiscoming/pehal.git
cd pehal

2. Configure Environment Variables

Create a ".env" file in the project root and add your API key:

ADAPTION_API_KEY=your_api_key_here

Keep your actual ".env" file private. Never commit API keys or other secrets to GitHub.

3. Set Up the Backend

From the project root:

python -m venv .venv

Activate the virtual environment.

Windows PowerShell:

.venv\Scripts\Activate.ps1

Install backend dependencies:

pip install -r backend/requirements.txt

Start the backend:

cd backend
uvicorn app.main:app --reload

The backend will be available at:

"http://127.0.0.1:8000"

API documentation:

"http://127.0.0.1:8000/docs"

4. Set Up the Frontend

Open a separate terminal:

cd frontend
npm install
npm run dev

The frontend will be available at:

"http://localhost:3000"

Important Demo Notes

Pehal is a prototype developed to demonstrate a connected survivor-support and accountability workflow.

- The advocacy directory currently uses fictional demonstration organisations. These entries should not be treated as verified service providers.
- The accountability tracker currently uses in-memory demonstration data. Cases and updates are not guaranteed to persist after the backend restarts.
- The platform does not replace legal advice, professional counselling, emergency services, or official reporting channels.
- AI-generated guidance may be incomplete or inaccurate. Users should verify important information through appropriate professionals or official sources.
- The prototype does not guarantee absolute confidentiality or secure handling of real survivor case records.

For emergencies in India, call 112. Other support helplines and services may vary by location.

Please do not enter real identifying or sensitive survivor information into this demonstration version.

Our Vision

We believe that being heard should be the beginning of support, not the end of the journey.

Pehal aims to bring together guidance, advocacy, and accountability so that survivors are not left to navigate complex systems alone.

Life for her. By her. From her.

Because support must follow through.