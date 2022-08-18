import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';

function Layout(): JSX.Element {
  return (
    <>
      <header style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
        <NavLink to='/'>Home</NavLink>
        <NavLink to='/about'>About</NavLink>
        <NavLink to='/textbook'>Textbook</NavLink>
        <NavLink to='/statistics'>Statistics</NavLink>
        <NavLink to='/sprint'>Sprint Game</NavLink>
        <NavLink to='/audiocall'>Audiocall Game</NavLink>
      </header>

      <Outlet />

      <footer>RSLang 2022</footer>
    </>
  );
}

export { Layout };
