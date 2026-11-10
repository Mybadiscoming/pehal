Pehal — Frontend

The frontend of Pehal, a survivor-centred support and institutional accountability platform.

Built using Next.js, React, TypeScript and Tailwind CSS, the frontend provides an accessible interface through which users can explore Pehal's four core modules.

Pages and Features

Landing Page

Introduces Pehal, its purpose, core features and guiding principles.

Dashboard

Provides access to the platform's main modules.

1. Safe Space Companion

A conversational interface for supportive AI-powered guidance.

2. Reporting Barrier Navigator

An interactive interface for exploring reporting options and possible next steps.

3. Survivor Advocacy Network

A directory-style interface for exploring support options based on location and support requirements.

4. Institutional Accountability Tracker

An interface for creating cases, managing milestones and recording follow-up actions.

Additional Pages

- Login interface
- User profile
- Settings

Technology Stack

- Next.js
- React
- TypeScript
- Tailwind CSS
- Next.js App Router

Project Structure

frontend/
├── src/
│   ├── app/
│   │   ├── page.tsx
│   │   ├── dashboard/
│   │   ├── safe-space/
│   │   ├── reporting-navigator/
│   │   ├── advocacy-network/
│   │   ├── accountability/
│   │   ├── login/
│   │   ├── profile/
│   │   └── settings/
│   └── components/
│       └── AppShell.tsx
├── public/
├── package.json
├── next.config.ts
└── README.md

Local Setup

1. Install dependencies

From the frontend directory:

cd frontend
npm install

2. Start the development server

npm run dev

The frontend will be available at:

"http://localhost:3000"

Backend Connection

The frontend communicates with the FastAPI backend through the "/api" route.

The Next.js configuration rewrites frontend API requests to the backend server.

For local development, the backend is expected to run at:

"http://127.0.0.1:8000"

Start the backend separately before testing features that require API responses.

For deployment, configure the "BACKEND_URL" environment variable to point to the deployed backend URL and redeploy the frontend.

Important Notes

- The login interface is a prototype and does not provide production authentication.
- Profile and settings features are demonstration functionality.
- The frontend depends on the backend for the four core modules.
- Some displayed information is demonstration data rather than verified real-world service information.

---

Pehal — Because support must follow through.