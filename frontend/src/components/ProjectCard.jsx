import React from 'react';
export default function ProjectCard({project}){ return (<div className='card'><h4>{project.title}</h4><p>{project.description}</p></div>); }