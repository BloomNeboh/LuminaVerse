import React, { useState } from 'react';
export default function Login({ setToken }){
  const [email, setEmail] = useState('user@example.com');
  const [password, setPassword] = useState('password');
  const handle = ()=>{ setToken('demo-token'); };
  return (
    <div style={{padding:40}}>
      <h2>LuminaVerse — Login (demo)</h2>
      <input className="input" value={email} onChange={e=>setEmail(e.target.value)} />
      <input className="input" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
      <div style={{marginTop:12}}>
        <button onClick={handle}>Login Demo</button>
      </div>
    </div>
  );
}
