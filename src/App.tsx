// ...existing code...
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import Home from './pages/Home';
import SignUpOption from './pages/SignUpOption';
import PatientSignUp from './pages/PatientSignUp';
import SpecialistSignUp from './pages/SpecialistSignUp';
import SignIn from './pages/SignIn';
import Help from './pages/Help';

function MainLayout() {
  // Keep your global header / layout here if needed.
  // SignUpOption will NOT render inside this layout.
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
        {/* Standalone signup page (no global layout/header) */}
        <Route path="/signup" element={<SignUpOption />} />

        {/* All other routes render inside MainLayout */}
        <Route path="/*" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="signup/patient" element={<PatientSignUp />} />
          <Route path="signup/specialist" element={<SpecialistSignUp />} />
          <Route path="signup/clinical-manager" element={<SpecialistSignUp />} />
          <Route path="signin" element={<SignIn />} />
          <Route path="help" element={<Help />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;