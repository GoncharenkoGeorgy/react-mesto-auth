import React, { useRef } from 'react';
import { PopupWithForm } from './PopupWithFrom.js';

export { AddPlacePopup };

function AddPlacePopup(props) {

  const { isOpen, onClose, isLoading, onAddPlace } = props;

  const nameRef = useRef(''); // записываем объект, возвращаемый хуком, в переменную
  const linkRef = useRef('');

  const [name, setName] = React.useState('');
  const [link, setLink] = React.useState('');

  // После загрузки текущего пользователя из API
  // его данные будут использованы в управляемых компонентах.
  React.useEffect(() => {
    setName('');
    setLink('');
  }, [isOpen]);

  function handleChangeName(e) {
    // Передаём значения управляемых компонентов во внешний обработчик
      setName(e.target.value)
  }

  function handleChangeLink(e) {
      setLink(e.target.value)
  }

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace({
      name,
      link,
    });
  }

  return (

    <PopupWithForm
      name='place'
      title='Новое место'
      submit='Создать'
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isLoading={isLoading}
    >
      <label htmlFor='name' className='popup__fields'>
        <input
          className='popup__input'
          id='text-input'
          name='name'
          placeholder='Название'
          minLength='1'
          maxLength='30'
          required
          ref={nameRef}
          onChange={handleChangeName}
        />
        <span className='popup__input-error' id='text-input-error'></span>
      </label>
      <label htmlFor='link' className='popup__fields'>
        <input
          type='url'
          className='popup__input'
          id='pic-url-input'
          name='link'
          placeholder='Ссылка на картинку'
          required
          ref={linkRef}
          onChange={handleChangeLink}
        />
        <span className='popup__input-error' id='pic-url-input-error'></span>
      </label>
    </PopupWithForm>
  );
}