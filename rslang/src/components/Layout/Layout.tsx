import React from 'react';
import { Outlet } from 'react-router-dom';

import Footer from '../Menu/Footer';
import PersistentDrawerRight from '../Menu/Menu';


function Layout(): JSX.Element {
  return (
    <>
      <PersistentDrawerRight />
      <Outlet />
      <Footer />
    </>
  );
}

export { Layout };
