import React, { useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

export { Card };

function Card(props) {

  const currentUser = useContext(CurrentUserContext);

  const { card, onCardClick, onCardLike, onCardDelete } = props;
  // Определяем, являемся ли мы владельцем текущей карточки
  const isOwn = card.owner._id === currentUser._id;

  // Создаём переменную, которую после зададим в `className` для кнопки удаления
  const cardDeleteButtonClassName = `element__remove ${isOwn && 'element__remove_active'}`;

  // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
  const isLiked = card.likes.some(i => i._id === currentUser._id);

  // Создаём переменную, которую после зададим в `className` для кнопки лайка
  const cardLikeButtonClassName = `element__heart ${isLiked && 'element__heart_active'}`;

  function handleClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }

  return (

    <li className="element">
      <img className="element__pic" src={card.link} alt={card.name} onClick={handleClick} />
      <button className={cardDeleteButtonClassName} type="button" onClick={handleDeleteClick} />
      <div className="element__content">
        <h2 className="element__name">{card.name}</h2>
        <div className="element__counter">
          <button className={cardLikeButtonClassName} onClick={handleLikeClick} />
          <p className="element__heart-counter">{card.likes.length}</p>
        </div>
      </div>
    </li>

  );
}