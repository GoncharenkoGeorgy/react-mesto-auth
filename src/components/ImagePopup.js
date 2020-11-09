import React from 'react';

export { ImagePopup }

function ImagePopup(props) {

  const { isOpen, onClose, name, link } = props;

  return (

    <section className={`popup ${isOpen && 'popup_opened'}`}>
      <figure className="element__container popup-mouse">
        <button className="popup__close popup-pic-close" onClick={onClose} />
        <img className="element__pic element__pic_active element-pic-full" src={link} alt={name} />
        <figcaption className="element__name element__name_active element-name-full">{name}</figcaption>
      </figure>
    </section>
  );
}