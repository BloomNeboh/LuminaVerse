import React, { useState, useRef } from 'react';

export default function NyotaAssistant({ avatarSrc = '/assets/nyota.png' }) {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [speaking, setSpeaking] = useState(false);
  const [loading, setLoading] = useState(false);
  const utterRef = useRef(null);

  // Automatically pick the backend base URL
  const API_BASE =
    import.meta.env.VITE_API_URL || 
    window.location.origin.replace(/^https/, 'http') + ':5000';

  const ask = async () => {
    if (!question.trim()) return;
    setLoading(true);
    setAnswer('');

    try {
      const res = await fetch(`${API_BASE}/api/ai/query`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question }),
      });

      if (!res.ok) throw new Error('Server response not OK');

      const data = await res.json();
      const reply = data.answer || 'Sorry, Nyota could not answer that right now.';
      setAnswer(reply);
      speak(reply);
    } catch (err) {
      const fallback = 'Nyota is offline or AI server not available.';
      setAnswer(fallback);
      speak(fallback);
      console.error('Nyota error:', err.message);
    }

    setLoading(false);
  };

  const speak = (text) => {
    if (!('speechSynthesis' in window)) return;

    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    utterRef.current = u;
    u.onstart = () => setSpeaking(true);
    u.onend = () => setSpeaking(false);
    window.speechSynthesis.speak(u);
  };

  return (
    <div className="card" style={{ padding: 20, maxWidth: 600, margin: 'auto' }}>
      <h3>🌟 Nyota — Your AI Travel Companion</h3>
      <div className="nyota-panel" style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <img
          src={avatarSrc}
          alt="Nyota"
          className={`nyota-avatar ${speaking ? 'nyota-speaking' : ''}`}
          style={{
            width: 80,
            height: 80,
            borderRadius: '50%',
            border: speaking ? '3px solid #00e0ff' : '3px solid transparent',
            transition: 'all 0.3s ease',
          }}
        />
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <input
              className="input"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Ask Nyota about Tanzania, safaris, or travel..."
              style={{ flex: 1, padding: 8 }}
            />
            <button
              onClick={ask}
              disabled={loading}
              style={{
                marginLeft: 8,
                padding: '8px 16px',
                backgroundColor: '#222',
                color: '#fff',
                border: 'none',
                borderRadius: 6,
                cursor: loading ? 'wait' : 'pointer',
              }}
            >
              {loading ? 'Thinking...' : 'Ask'}
            </button>
          </div>
          {answer && (
            <p style={{ marginTop: 12, lineHeight: 1.6, color: '#333' }}>
              {answer}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
