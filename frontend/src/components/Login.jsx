import React, { useState } from 'react';

export default function Login({ setToken }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handle = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();

      if (res.ok && data.token) {
        setToken(data.token);
        localStorage.setItem('token', data.token);
      } else {
        setError(data.message || 'Invalid credentials');
      }
    } catch (err) {
      setError('Server unavailable or network error.');
    }
    setLoading(false);
  };

  return (
    <div style={{ padding: 40 }}>
      <h2>LuminaVerse — Login</h2>
      <input
        className="input"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        className="input"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <div style={{ marginTop: 12 }}>
        <button onClick={handle} disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}
