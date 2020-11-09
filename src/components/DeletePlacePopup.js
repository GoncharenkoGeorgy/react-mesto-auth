import React from 'react';
import { PopupWithForm } from './PopupWithFrom.js';

export { DeletePlacePopup };

function DeletePlacePopup(props) {

  const { isOpen, onClose, isLoading, onDeletePlace } = props;

  function handleSubmit(e) {
    e.preventDefault();
    onDeletePlace();
  }

  return (

    <PopupWithForm
      name='delete'
      title='Вы уверены?'
      submit='Да'
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isLoading={isLoading}
    />
  );
}