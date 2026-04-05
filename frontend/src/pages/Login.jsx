import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const Login = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const { loginUser, loading } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const success = await loginUser(credentials.username, credentials.password);
    if (success) {
      navigate('/');
    } else {
      setError('Invalid username or password.');
    }
  };

  return (
    <div className="form-container glass-panel">
      <h2>Welcome Back</h2>
      {error && <div style={{ color: '#ef4444', marginBottom: '1rem', textAlign: 'center' }}>{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">Username</label>
          <input
            type="text"
            name="username"
            value={credentials.username}
            onChange={handleInputChange}
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label className="form-label">Password</label>
          <input
             type="password"
             name="password"
             value={credentials.password}
             onChange={handleInputChange}
             className="form-control"
             required
          />
        </div>
        <button type="submit" className="btn btn-primary" style={{ width: '100%' }} disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
      <p style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
        Don't have an account? <Link to="/register" style={{ color: 'var(--primary)', textDecoration: 'none' }}>Register</Link>
      </p>
    </div>
  );
};

export default Login;
