import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api/axios';

const Register = () => {
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      await api.post('accounts/register/', formData);
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to register. Username might exist.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container glass-panel">
      <h2>Create Account</h2>
      {error && <div style={{ color: '#ef4444', marginBottom: '1rem', textAlign: 'center' }}>{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">Username</label>
          <input type="text" name="username" value={formData.username} onChange={handleInputChange} className="form-control" required />
        </div>
        <div className="form-group">
          <label className="form-label">Email</label>
          <input type="email" name="email" value={formData.email} onChange={handleInputChange} className="form-control" required />
        </div>
        <div className="form-group">
          <label className="form-label">Password</label>
          <input type="password" name="password" value={formData.password} onChange={handleInputChange} className="form-control" required />
        </div>
        <button type="submit" className="btn btn-primary" style={{ width: '100%' }} disabled={loading}>
          {loading ? 'Registering...' : 'Register'}
        </button>
      </form>
      <p style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
        Already have an account? <Link to="/login" style={{ color: 'var(--primary)', textDecoration: 'none' }}>Login</Link>
      </p>
    </div>
  );
};

export default Register;
