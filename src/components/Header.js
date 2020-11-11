import React from 'react';
import logo from '../images/Vectorll.svg';
import * as auth from '../auth.js';
import { Link, useLocation } from 'react-router-dom';

export { Header }

function Header(props) {

  const { onOut } = props;

  const [email, setEmail] = React.useState('');
  const [sign, setSign] = React.useState('');
  const [loggedIn, setLoggedIn] = React.useState();
  const [link, setLink] = React.useState('');
  let location = useLocation();

  React.useEffect(() => {
    if (location.pathname === '/sign-in') {
      setLoggedIn(false);
      setSign('Регистрация');
      setLink('/sign-up');
      setEmail('');
    } else if (location.pathname === '/sign-up') {
      setLoggedIn(false);
      setSign('Войти');
      setLink('/sign-in');
      setEmail('');
    } else {
      setLink('/');
      setLoggedIn(true);
      const jwt = localStorage.getItem('token');
      if (jwt) {
        auth.checkToken(jwt)
          .then((res) => {
            if (res) {
              setEmail(res.data.email);
            }
          })
          .catch(err => console.log(err));
      }
    }
  }, [location.pathname])

  return (

    <header className="header">
      <img className="header__logo" src={logo} alt="Mesto" />
        <nav className="header__signconteiner">
          <p className="header__email">{email}</p>
          {loggedIn ? <p className="header__signout" onClick={onOut}>Выйти</p> : <Link to={link} className="header__signin">{sign}</Link>}
        </nav>
    </header>

  );
}
