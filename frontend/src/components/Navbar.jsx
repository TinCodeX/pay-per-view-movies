import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import { Film, User, LogOut, ShoppingBag } from 'lucide-react';

const Navbar = () => {
  const { user, logoutUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser();
    navigate('/login');
  };

  return (
    <nav className="navbar glass-panel" style={{ borderRadius: 0, borderTop: 'none', borderLeft: 'none', borderRight: 'none' }}>
      <Link to="/" className="navbar-brand">
        <Film className="text-primary" />
        <span>CineStream App</span>
      </Link>
      
      <div className="nav-links">
        <Link to="/" className="nav-link">Movies</Link>
        {user ? (
          <>
            <Link to="/orders" className="nav-link" style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <ShoppingBag size={18} /> My Orders
            </Link>
            <span className="nav-link" style={{ cursor: 'default', color: 'var(--primary)' }}>
              <User size={18} style={{ display: 'inline', marginRight: '4px' }} /> {user.username || 'User'}
            </span>
            <button onClick={handleLogout} className="btn btn-outline" style={{ padding: '0.4rem 1rem' }}>
              <LogOut size={16} /> Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="nav-link">Login</Link>
            <Link to="/register" className="btn btn-primary" style={{ padding: '0.4rem 1rem' }}>Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
