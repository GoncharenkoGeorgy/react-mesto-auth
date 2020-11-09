import React, { useContext } from 'react';
import { PopupWithForm } from './PopupWithFrom.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

export { EditProfilePopup };

function EditProfilePopup(props) {

  const currentUser = useContext(CurrentUserContext);

  const { isOpen, onClose, onUpdateUser, isLoading } = props;

  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');


  // После загрузки текущего пользователя из API
  // его данные будут использованы в управляемых компонентах.
  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser]);

  function handleSubmit(evt) {
    evt.preventDefault();

    // Передаём значения управляемых компонентов во внешний обработчик
    onUpdateUser({
      name,
      about: description,
    });
  }

  function handleChangeName(e) {
      setName(e.target.value)
  }

  function handleChangeDescription(e) {
      setDescription(e.target.value)
  }

  return (

    <PopupWithForm
      name='profile'
      title='Редактировать профиль'
      submit='Сохранить'
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isLoading={isLoading}
    >
      <label htmlFor='name' className='popup__fields'>
        <input
          type='text'
          className='popup__input'
          id='name-input'
          name='userName'
          placeholder='Имя'
          minLength='2'
          maxLength='40'
          required
          value={name || ''}
          onChange={handleChangeName}
        />
        <span className='popup__input-error' id='name-input-error'></span>
      </label>
      <label htmlFor='about' className='popup__fields'>
        <input
          type='text'
          className='popup__input'
          id='prof-input'
          name='userProf'
          placeholder='Род деятельности'
          minLength='2'
          maxLength='200'
          required
          value={description || ''}
          onChange={handleChangeDescription}
        />
        <span className='popup__input-error' id='prof-input-error'></span>
      </label>
    </PopupWithForm>

  );
}