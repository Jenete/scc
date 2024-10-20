import React, { useState, useContext } from 'react';
import { AuthContext } from './AuthContext';
import './styles/Login.css';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async(e) => {
    e.preventDefault();
    const success = await login('', password);
    if (!success) {
      setError('Invalid username or password');
    }
    else{
        navigate('/mainpage');
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Enter code</label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
        </div>
        <button type="submit">Login</button>
        <Link to={'/register'}>New? Click here</Link>
      </form>
    </div>
  );
};

export default Login;
