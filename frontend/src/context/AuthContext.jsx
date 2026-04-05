import { createContext, useState, useEffect } from 'react';
import api from '../api/axios';

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
  const [authTokens, setAuthTokens] = useState(() => localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null);
  const [user, setUser] = useState(() => localStorage.getItem('authTokens') ? JSON.parse(atob(JSON.parse(localStorage.getItem('authTokens')).access.split('.')[1])) : null);
  const [loading, setLoading] = useState(false);

  const loginUser = async (username, password) => {
    setLoading(true);
    try {
      const response = await api.post('token/', { username, password });
      setAuthTokens(response.data);
      setUser(JSON.parse(atob(response.data.access.split('.')[1])));
      localStorage.setItem('authTokens', JSON.stringify(response.data));
      setLoading(false);
      return true;
    } catch (error) {
      setLoading(false);
      return false;
    }
  };

  const logoutUser = () => {
    setAuthTokens(null);
    setUser(null);
    localStorage.removeItem('authTokens');
  };

  const contextData = {
    user,
    authTokens,
    loginUser,
    logoutUser,
    loading
  };

  return (
    <AuthContext.Provider value={contextData}>
      {children}
    </AuthContext.Provider>
  );
};
