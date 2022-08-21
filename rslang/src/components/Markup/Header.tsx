import React from 'react';

function Header(): JSX.Element {
  return (
    <header>
      <nav className="">
        <div className="nav-wrapper container">
          <a href="#" className="brand-logo">
            RS Lang
          </a>
        </div>
      </nav>
    </header>
  );
}

export default React.memo(Header);
