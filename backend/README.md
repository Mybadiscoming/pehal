# HerHacks

A survivor-centred support and institutional accountability platform built for a hackathon.

## About the Project

HerHacks aims to make support information more accessible, help survivors understand their options, connect people with relevant support organisations, and improve institutional accountability.

The platform consists of four modules:

### 1. Safe Space Companion
An AI-powered conversational support tool that provides empathetic responses, basic safety guidance, and relevant support resources.

### 2. Reporting Barrier Navigator
A guided information tool that helps users understand reporting options and navigate barriers such as fear, stigma, retaliation, and lack of information.

### 3. Survivor Advocacy Network
A location-based support network that helps users discover organisations and NGOs based on their concerns and support requirements.

### 4. Institutional Accountability Tracker
A dashboard for tracking institutional issues, response statuses, and accountability indicators using structured data.

## Tech Stack

- Python 3.10
- FastAPI
- PostgreSQL / Supabase (planned integration)
- Adaption API
- Qwen 3.5 397B
- Pydantic
- SQLAlchemy
- Alembic
- Pytest

## Project Structure

```text
pehal/
│
├── backend/
│   ├── app/
│   │   ├── api/
│   │   ├── core/
│   │   ├── models/
│   │   ├── modules/
│   │   │   ├── safe_space_companion/
│   │   │   ├── reporting_navigator/
│   │   │   ├── advocacy_network/
│   │   │   └── accountability_tracker/
│   │   ├── schemas/
│   │   ├── shared/
│   │   ├── config.py
│   │   └── main.py
│   │
│   ├── tests/
│   └── requirements.txt
│
├── .env.example
├── .gitignore
└── README.md
```

## Setup

### 1. Clone the repository

```bash
git clone YOUR_REPOSITORY_URL
cd pehal
```

### 2. Create a virtual environment

```bash
py -3.10 -m venv .venv
```

Activate it:

Windows PowerShell:

```powershell
.\.venv\Scripts\Activate.ps1
```

### 3. Install dependencies

```bash
pip install -r backend/requirements.txt
```

### 4. Configure environment variables

Create a `.env` file in the project root using `.env.example`.

Add your own Adaption API key:

```env
ADAPTION_API_KEY=your_api_key_here
```

Never commit your actual `.env` file.

### 5. Run the backend

```bash
cd backend
python -m uvicorn app.main:app --reload
```

### 6. Open API documentation

Visit:

http://127.0.0.1:8000/docs

## Run Tests

From the backend directory:

```bash
python -m pytest tests/ -v
```

## Development Notes

- The backend currently follows a modular monolith architecture.
- Each feature is organised into its own module.
- Synthetic data should be used for hackathon demonstrations.
- Do not use real survivor information in development or testing.
- Database integrations and advanced features may still be under development.
- Check the actual implementation before assuming a feature is complete.

## Important Safety and Privacy Notice

HerHacks is a hackathon prototype, not a production-ready crisis response or professional counselling service.

AI-generated guidance may be incomplete or inaccurate. Users should be able to make their own decisions without pressure to report or disclose personal information.

Do not upload real survivor data, personal records, credentials, or API keys.

## Contribution Guidelines

- Work within the existing module structure.
- Avoid changing unrelated modules.
- Run the test suite before submitting changes.
- Use separate branches for independent features.
- Document new dependencies and environment variables.
- Coordinate changes to shared files such as `main.py`, `requirements.txt`, and shared services.

## Project Status

HerHacks is under active hackathon development. All four modules are planned, with implementation progressing independently.