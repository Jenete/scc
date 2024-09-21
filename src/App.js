import './App.css';
import MainPage from './components/MainPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AuthProvider from './components/auth/AuthContext';
import Login from './components/auth/Login';
import ProtectedRoute from './components/auth/ProtectedRoute';
import RegisterMember from './components/member/RegisterMember';
import WelcomePage from './components/main/WelcomePage';
import SessionDetails from './components/session/SessionDetails';


function App() {
  return (
    <div className="App">
        <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/scc" element={<WelcomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<RegisterMember />} />
          <Route path="/session/:id" element={<SessionDetails />} />
          <Route path="/mainpage" element={
            <ProtectedRoute>
              <MainPage />
            </ProtectedRoute>
          } />
        </Routes>
      </Router>
    </AuthProvider>
    </div>
  );
}

export default App;
