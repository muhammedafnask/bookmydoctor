// ...existing code...
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import Home from './pages/Home';
import PatientSignUp from './pages/PatientSignUp';
import SpecialistSignUp from './pages/SpecialistSignUp';
import BlankPage from './pages/BlankPage';
import Help from './pages/Help';

function MainLayout() {
  // Keep your global header / layout here if needed.
  // Authentication pages (signin, signup) will NOT render inside this layout.
  return (
    <div className="min-h-screen bg-white">
      {/* ...global header/layout could go here (if any) ... */}
      <Outlet />
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        {/* Standalone authentication pages (no global layout/header) */}
        {/* More specific routes first */}
        <Route path="/signup/patient" element={<PatientSignUp />} />
        <Route path="/signup/specialist" element={<SpecialistSignUp />} />
        <Route path="/signup/clinical-manager" element={<SpecialistSignUp />} />
        {/* General routes after specific ones */}
        <Route path="/signin" element={<BlankPage />} />
        <Route path="/signup" element={<BlankPage />} />

        {/* All other routes render inside MainLayout */}
        <Route path="/*" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="help" element={<Help />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;