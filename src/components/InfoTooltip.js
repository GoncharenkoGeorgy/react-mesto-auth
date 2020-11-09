import React from 'react';
import successImg from '../images/success.svg';
import failImg from '../images/fail.svg';

export { InfoTooltip };

function InfoTooltip(props) {

  const { isOpen, onClose, loggedIn } = props;

  const [image, setImage] = React.useState('');
  const [text, setText] = React.useState('');

  React.useEffect(() => {
    if (loggedIn) {
      setImage(successImg);
      setText("Вы успешно зарегистрировались!")
    } else {
      setImage(failImg);
      setText("Что-то пошло не так! Попробуйте ещё раз.")
    }
  }, [isOpen, loggedIn]);

  return (

    <section className={`popup 
      ${isOpen && 'popup_opened'
      }`}>
      <div className="popup__container popup-mouse">
        <button className="popup__close popup-edit-close" onClick={onClose} />
        <div className="popup__content">
          <form className="popup__form" action="#" >
            <div className="popup__answer">
              <img className="popup__image" src={image} alt="success/fail" />
              <h4 className="popup__text">{text}</h4>
            </div>
          </form>
        </div>
      </div>
    </section>

  );
}