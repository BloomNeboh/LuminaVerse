import React from 'react';

export default function ThemeToggle(){
  const setTheme = (theme) => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('lumina_theme', theme=== 'dark' ? 'dark' : 'light');
    const wave = document.getElementById('theme-wave');
    if (wave) {
      const x = window.innerWidth/2 + 'px';
      const y = window.innerHeight/2 + 'px';
      wave.style.setProperty('--x', x);
      wave.style.setProperty('--y', y);
      wave.style.transition = 'background 650ms ease, opacity 650ms ease';
      wave.style.opacity = 1;
      setTimeout(()=>{ wave.style.opacity = 0; }, 700);
    }
  };

  const toggle = () => {
    const current = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
    setTheme(current === 'dark' ? 'light' : 'dark');
  };

  return (
    <button onClick={toggle} style={{padding:'8px 10px', borderRadius:8}}>
      Toggle Theme
    </button>
  );
}
