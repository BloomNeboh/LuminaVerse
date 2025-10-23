import React, { useState, useRef } from 'react';

export default function NyotaAssistant({ avatarSrc='/assets/nyota.png' }){
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [speaking, setSpeaking] = useState(false);
  const utterRef = useRef(null);

  const ask = async () => {
    if (!question) return;
    try {
      const res = await fetch('http://localhost:5000/api/ai/query', { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify({ question }) });
      const data = await res.json();
      const reply = data.answer || 'Sorry, Nyota could not answer that right now.';
      setAnswer(reply);

      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const u = new SpeechSynthesisUtterance(reply);
        utterRef.current = u;
        u.onstart = () => setSpeaking(true);
        u.onend = () => setSpeaking(false);
        window.speechSynthesis.speak(u);
      }
    } catch (err) {
      const reply = 'Nyota is offline or AI server not available.';
      setAnswer(reply);
      if ('speechSynthesis' in window) {
        const u = new SpeechSynthesisUtterance(reply);
        u.onstart = () => setSpeaking(true);
        u.onend = () => setSpeaking(false);
        window.speechSynthesis.speak(u);
      }
    }
  };

  return (
    <div className="card">
      <h3>Nyota — Your Assistant</h3>
      <div className="nyota-panel">
        <img src={avatarSrc} alt="Nyota" className={`nyota-avatar ${speaking ? 'nyota-speaking' : ''}`} />
        <div>
          <div>
            <input className="input" value={question} onChange={e=>setQuestion(e.target.value)} placeholder="Ask Nyota..." />
            <button onClick={ask} style={{marginLeft:8}}>Ask</button>
          </div>
          <p style={{marginTop:10}}>{answer}</p>
        </div>
      </div>
    </div>
  );
}
