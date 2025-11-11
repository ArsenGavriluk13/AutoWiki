import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const useAuth = () => {
  const [token, setToken] = useState(() => localStorage.getItem('authToken'));
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      setUser({ email: 'test@test.com' });
      console.log('User is logged in (token found)');
    }
  }, [token]);

  const login = async (email, password) => {
    setLoading(true);
    setError(null);
    console.log('Attempting login (mock)...', { email, password });

    return new Promise((resolve) => {
      setTimeout(() => {
        if (email === 'test@test.com' && password === 'password') {
          console.log('Login successful (mock)');
          const fakeToken = 'fake-jwt-token-12345';
          localStorage.setItem('authToken', fakeToken);
          setToken(fakeToken);
          setUser({ email: email });
          setLoading(false);
          navigate('/');
          resolve({ success: true });
        } else {
          console.log('Login failed (mock)');
          setError('Invalid email or password (mock)');
          setLoading(false);
          resolve({
            success: false,
            message: 'Invalid email or password (mock)',
          });
        }
      }, 1500);
    });
  };

  const register = async (email, password) => {
    setLoading(true);
    setError(null);
    console.log('Attempting registration (mock)...', { email, password });

    return new Promise((resolve) => {
      setTimeout(() => {
        if (email.toLowerCase() === 'used@test.com') {
          console.log('Registration failed, email in use (mock)');
          setError('Email is already in use (mock)');
          setLoading(false);
          resolve({ success: false, message: 'Email in use (mock)' });
        } else {
          console.log('Registration successful (mock)');
          setLoading(false);
          alert('Registration successful! Please log in. (mock)');
          navigate('/auth');
          resolve({ success: true });
        }
      }, 1500);
    });
  };

  const logout = () => {
    console.log('Logging out (mock)');
    localStorage.removeItem('authToken');
    setToken(null);
    setUser(null);
    navigate('/');
  };

  return {
    token,
    user,
    loading,
    error,
    isLoggedIn: !!token,
    login,
    register,
    logout,
  };
};
