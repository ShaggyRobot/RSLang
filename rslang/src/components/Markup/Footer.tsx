import React from 'react';

function Footer(): JSX.Element {
  return (
    <footer className="page-footer ">
      <div className="container">
        <div> © {new Date().getFullYear()} All rights reserved</div>
        <a href="https://github.com/ShaggyRobot">ShaggyRobot</a>
        <a href="https://github.com/AnatoliyIliev">AnatoliyIliev</a>
        <a href="https://github.com/shishel-zaitcevich">shishel-zaitcevich</a>
        <a href="https://rs.school/js/">
          <img src="../src/images/rs_school_js.svg" alt="logo" />
        </a>
      </div>
    </footer>
  );
}

export default React.memo(Footer);
