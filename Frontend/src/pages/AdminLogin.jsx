import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import './AdminLogin.css';

const ADMIN_TOKEN_KEY = 'adminToken';

function AdminLogin() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await api.post('/admin/login', {
        email: form.email,
        password: form.password,
      });

      const { token } = response.data;
      if (!token) {
        throw new Error('No token returned from server.');
      }

      window.localStorage.setItem(ADMIN_TOKEN_KEY, token);

      navigate('/admin/products');
    } catch (err) {
      const message =
        err.response?.data?.error ||
        err.message ||
        'Failed to log in. Please check your credentials.';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login-page">
      <div className="container">
        <h1>Admin Login</h1>
        {error && <div className="message error">{error}</div>}

        <form onSubmit={handleSubmit} className="admin-login-form">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              required
              placeholder="admin@example.com"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              required
              placeholder="••••••••"
            />
          </div>

          <div className="form-actions">
            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AdminLogin;

