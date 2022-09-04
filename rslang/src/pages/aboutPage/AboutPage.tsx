import React from 'react';
import './style.scss';

function AboutPage(): JSX.Element {
  return (
    <div className='page about-page'>
      <h1>Our Team</h1>
      <div className='about-content'>
        <div className='anatoly'>
          <img src='https://avatars.githubusercontent.com/u/64470740?v=4' alt='anatoly' />
          <h3>AnatoliyIliev </h3>
          <li>Server&API</li>
          <li>Login Form (Authorize/Login)</li>
          <li>Auth</li>
          <li>Statistics</li>
        </div>
        <div className='shaggy'>
          <img src='https://avatars.githubusercontent.com/u/71377866?v=4' alt='shaggy' />
          <h3>ShaggyRobot - TeamLead</h3>
          <li>Wordlist</li>
          <li>TextBook</li>
          <li>Page navigation</li>
          <li>AudioChallenge game</li>
        </div>
        <div className='shish'>
          <img
            src='https://avatars.githubusercontent.com/u/88749942?s=400&u=b9203e80ed05aa8544e8f53e24180ee636a360c7&v=4'
            alt='shish'
          />
          <h3>Shishel-Zaitcevich</h3>
          <li>Header/Footer</li>
          <li>Home page</li>
          <li>Sprint game</li>
        </div>
      </div>
    </div>
  );
}

export { AboutPage };
