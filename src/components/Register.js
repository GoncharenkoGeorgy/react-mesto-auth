import React from 'react';
import { Link, withRouter } from 'react-router-dom';

const Register = (props) => {
  const { onRegister } = props;

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('')

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  }

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    onRegister(email, password);
    setEmail('');
    setPassword('');
  }

  return (
    <form onSubmit={handleSubmit} className="register">
      <h4 className="register__title">Регистрация</h4>
      <label htmlFor='email' className='register__fields'>
        <input
          type='text'
          className='register__input'
          id='reg-email'
          name='email'
          placeholder='Email'
          value={email}
          onChange={handleChangeEmail}
          required
        />
        <span className='popup__input-error' id='popup-input-error'></span>
      </label>
      <label htmlFor='password' className='register__fields'>
        <input
          type='password'
          className='register__input'
          id='reg-pas'
          name='password'
          placeholder='Пароль'
          value={password}
          onChange={handleChangePassword}
          required
        />
        <span className='popup__input-error' id='popup-input-error'></span>
      </label>
      <button type="submit" className="register__button">Зарегистрироваться</button>
      <div className="register__signup">
        <p className="register__question">Уже зарегистрированы?</p>
        <Link to="/sign-in" className="register__link">Войти</Link>
      </div>
    </form>
  )
}
export default withRouter(Register);