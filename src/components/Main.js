import React, { useContext } from 'react';
import { Card } from './Card.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

export { Main };

function Main(props) {

  const currentUser = useContext(CurrentUserContext);

  const { onEditAvatar, onEditProfile, onAddPlace, onCardClick, cards, onCardLike, onCardDelete, } = props;

  return (

    <main className="content">
      <section className="profile">
        <div className="profile__content">
          <button className="profile__avatar-button"><img className="profile__avatar" src={currentUser.avatar}
            onClick={onEditAvatar} alt="Avatar" /></button>
          <div className="profile__info-container">
            <div className="profile__info">
              <h1 className="profile__info-heading">{currentUser.name}</h1>
              <button className="profile__info-edit" onClick={onEditProfile} />
            </div>
            <p className="profile__info-text">{currentUser.about}</p>
          </div>
        </div>
        <button className="profile__add-button popup-add-place" onClick={onAddPlace} />
      </section>

      <section className="elements-section">
        <ul className="elements">
          {cards.map((card) => (
            <Card key={card._id} card={card} onCardClick={onCardClick} onCardLike={onCardLike} onCardDelete={onCardDelete} />
          ))}
        </ul>
      </section>
    </main>

  );
}