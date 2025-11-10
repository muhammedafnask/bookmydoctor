# BookMyDoctor

A modern healthcare appointment booking platform built with React, TypeScript, and Vite.

## Prerequisites

- **Node.js** (v16 or higher)
- **npm** (comes with Node.js)

## Installation

1. Clone the repository (if you haven't already)
2. Install dependencies:
   ```bash
   npm install
   ```

## Running the Application

### Option 1: Frontend Only (Recommended for Development)

Run the React development server:

```bash
npm run dev
```

The application will be available at: **http://localhost:5173**

### Option 2: Full Stack (Frontend + Backend API)

Run both the frontend and backend server simultaneously:

```bash
npm run dev:full
```

- Frontend: **http://localhost:5173**
- Backend API: **http://localhost:4000**

### Option 3: Run Services Separately

**Frontend only:**
```bash
npm run dev
```

**Backend only:**
```bash
npm run server
```

## Environment Variables (Optional)

### For Supabase Integration

Create a `.env` file in the root directory:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### For Backend Database (MSSQL)

If you want to use the backend API with MSSQL database, add these to your `.env` file:

```env
PORT=4000
MSSQL_USER=your_db_user
MSSQL_PASSWORD=your_db_password
MSSQL_SERVER=your_db_server
MSSQL_DATABASE=your_db_name
MSSQL_PORT=1433
MSSQL_ENCRYPT=true
MSSQL_TRUST_SERVER_CERTIFICATE=true
```

## Available Routes

- `/` - Home page
- `/signin` - Sign in page
- `/signup` - Sign up option selection
- `/signup/patient?preregistration=true` - Patient registration
- `/signup/specialist?preregistration=true` - Specialist registration
- `/signup/clinical-manager?preregistration=true` - Clinical Manager registration
- `/help` - Help page

## Available Scripts

- `npm run dev` - Start development server (frontend only)
- `npm run server` - Start backend API server
- `npm run dev:full` - Start both frontend and backend concurrently
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run typecheck` - Run TypeScript type checking

## Tech Stack

- **Frontend:**
  - React 18
  - TypeScript
  - Vite
  - React Router DOM
  - Tailwind CSS
  - Lucide React (icons)
  - Supabase (optional)

- **Backend:**
  - Express.js
  - MSSQL
  - CORS

## Project Structure

```
bookmydoctor/
├── src/
│   ├── components/     # Reusable React components
│   ├── pages/         # Page components
│   ├── lib/           # Utilities and configurations
│   └── main.tsx       # Application entry point
├── server/            # Backend API server
├── supabase/          # Supabase migrations
└── public/            # Static assets
```

## Development

The application uses Vite for fast development with Hot Module Replacement (HMR). Any changes you make will be reflected immediately in the browser.

## Building for Production

```bash
npm run build
```

The production build will be in the `dist/` directory.

## License

Private project
