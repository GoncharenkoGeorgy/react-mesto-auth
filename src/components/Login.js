import React from 'react';
import { Link, withRouter, useHistory } from 'react-router-dom';

const Login = (props) => {
  const { onLogin } = props;

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('')

  //const history = useHistory();

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  }

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    // здесь обрабатываем вход в систему
    if (!email || !password) {
      console.log('error');
      return;
    }
    onLogin(email, password);
    //history.push('/');
    setEmail('');
    setPassword('');
  }

  return (
    <form onSubmit={handleSubmit} className="login">
      <h4 className="login__title">Вход</h4>
      <label htmlFor='email' className='login__fields'>
        <input
          type='text'
          className='login__input'
          id='email'
          name='email'
          placeholder='Email'
          value={email}
          onChange={handleChangeEmail}
          required
        />
        <span className='login__input-error' id='url-input-error'></span>
      </label>
      <label htmlFor='password' className='login__fields'>
        <input
          type='password'
          className='login__input'
          id='url-input'
          name='password'
          placeholder='Пароль'
          value={password}
          onChange={handleChangePassword}
          required
        />
        <span className='popup__input-error' id='password-input-error'></span>
      </label>
      <button type="submit" className="login__button">Войти</button>
      <div className="login__signup">
        <p className="login__question">Ещё не зарегистрированы?</p>
        <Link to="/sign-up" className="login__link">Зарегистрироваться</Link>
      </div>
    </form>
  )
}
export default withRouter(Login);