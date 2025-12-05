import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const API_BASE_URL = 'http://localhost:3001';

export const useAuth = () => {
  const [token, setToken] = useState(() => localStorage.getItem('authToken'));
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      const savedUser = localStorage.getItem('user');
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
    }
  }, [token]);

  const authRequest = async (endpoint, body) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      const data = await res.json().catch(() => null);

      if (!res.ok) {
        throw new Error(data?.error || data || 'Помилка сервера');
      }

      if (data && data.accessToken) {
        localStorage.setItem('authToken', data.accessToken);
        localStorage.setItem('user', JSON.stringify(data.user));

        setToken(data.accessToken);
        setUser(data.user);
      }
      return { success: true };
    } catch (err) {
      console.error('Auth error:', err.message);
      setError(err.message);
      return { success: false, message: err.message };
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    const result = await authRequest('/login', { email, password });
    if (result.success) {
      navigate('/');
    }
  };

  const register = async (email, password, name, avatarUrl) => {
    const result = await authRequest('/register', {
      email,
      password,
      name,
      avatarUrl,
    });

    if (result.success) {
      alert('Реєстрація успішна! Ви автоматично увійшли.');
      navigate('/');
    }
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
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
