import React from 'react';
import logo from '../images/Vectorll.svg';

export { Header }

function Header() {


  return (

    <header className="header">
      <img className="header__logo" src={logo} alt="Mesto" />
    </header>

  );
}