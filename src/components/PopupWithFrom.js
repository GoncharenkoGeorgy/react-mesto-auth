import React from 'react';

export { PopupWithForm };

function PopupWithForm(props) {

  const { name, isOpen, title, children, submit, onClose, onSubmit, isLoading } = props;

  return (

    <section className={`popup popup_${name} 
      ${isOpen && 'popup_opened'
      }`}>
      <div className="popup__container popup-mouse">
        <button className="popup__close popup-edit-close" onClick={onClose} />
        <div className="popup__content">
          <h2 className="popup__heading">{title}</h2>
          <form className={`popup__form popup-${name}`} action='#' onSubmit={onSubmit}>
            {children}
            <button className="popup__save popup-edit-save">
              {isLoading ? `Сохранение...` : submit}
            </button>
          </form>
        </div>
      </div>
    </section>

  );
}