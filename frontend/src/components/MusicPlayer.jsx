import React from 'react';
export default function MusicPlayer({ track }){ return (<div className='card'><p>{track.title || 'Track'}</p><audio controls src={track.url}></audio></div>); }