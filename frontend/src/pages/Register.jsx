import React, { useState } from 'react';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const register = async () => {
    if (password !== confirm) {
      setMessage('Passwords do not match.');
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await res.json();

      if (res.ok) {
        setMessage('Registration successful! You can now log in.');
      } else {
        setMessage(data.message || 'Failed to register.');
      }
    } catch (err) {
      setMessage('Network or server error.');
    }

    setLoading(false);
  };

  return (
    <div style={{ padding: 40 }}>
      <h2>Create Your LuminaVerse Account</h2>
      <input
        className="input"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Full Name"
      />
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
      <input
        className="input"
        type="password"
        value={confirm}
        onChange={(e) => setConfirm(e.target.value)}
        placeholder="Confirm Password"
      />
      <div style={{ marginTop: 12 }}>
        <button onClick={register} disabled={loading}>
          {loading ? 'Registering...' : 'Register'}
        </button>
      </div>
      {message && <p style={{ marginTop: 10, color: 'orange' }}>{message}</p>}
    </div>
  );
}
