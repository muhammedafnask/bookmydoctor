import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import SignUpOption from './pages/SignUpOption';
import PatientSignUp from './pages/PatientSignUp';
import SpecialistSignUp from './pages/SpecialistSignUp';
import SignIn from './pages/SignIn';
import Help from './pages/Help';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignUpOption />} />
          <Route path="/signup/patient" element={<PatientSignUp />} />
          <Route path="/signup/specialist" element={<SpecialistSignUp />} />
          <Route path="/signup/clinical-manager" element={<SpecialistSignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/help" element={<Help />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
