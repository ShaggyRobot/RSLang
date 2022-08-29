import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink, Outlet } from 'react-router-dom';


import Footer from '../Menu/Footer';
import PersistentDrawerRight from '../Menu/Menu';


import { authSelectors } from '../../RTK/slices/auth';

import AuthNav from '../AuthNav';
import UserMenu from '../UserMenu';

function Layout(): JSX.Element {
  const isLoggedIn = useSelector(authSelectors.getIsAuthrnticated);

  return (
    <>
      <header style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
        <NavLink to='/'>Home</NavLink>
        <NavLink to='/about'>About</NavLink>
        <NavLink to='/textbook'>Textbook</NavLink>
        <NavLink to='/statistics'>Statistics</NavLink>
        <NavLink to='/sprint'>Sprint Game</NavLink>
        <NavLink to='/audiocall'>Audiocall Game</NavLink>
        {isLoggedIn ? <UserMenu /> : <AuthNav />}
      </header>
      <Outlet />
      <PersistentDrawerRight />
      <Footer />
    </>
  );
}

export { Layout };
