import React, { useRef } from 'react';
import { PopupWithForm } from './PopupWithFrom.js';

export { EditAvatarPopup };

function EditAvatarPopup(props) {

  const inputRef = useRef(''); // записываем объект, возвращаемый хуком, в переменную

  const { isOpen, onClose, onUpdateAvatar, isLoading } = props;


  // После загрузки текущего пользователя из API
  // его данные будут использованы в управляемых компонентах.
  React.useEffect(() => {
    inputRef.current.value = '';
  }, [isOpen]);

  function handleSubmit(evt) {
    evt.preventDefault();

    // Передаём значения управляемых компонентов во внешний обработчик
    onUpdateAvatar({
      url: inputRef.current.value
    });
  }

  return (

    <PopupWithForm
      name='avatar'
      title='Обновить аватар'
      submit='Сохранить'
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isLoading={isLoading}
    >
      <label htmlFor='url' className='popup__fields'>
        <input
          type='url'
          className='popup__input'
          id='ava-url-input'
          name='link'
          placeholder='Ссылка на аватар'
          required
          ref={inputRef}
        />
        <span className='popup__input-error' id='ava-url-input-error'></span>
      </label>
    </PopupWithForm>

  );
}