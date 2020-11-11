import React, { useState } from 'react';
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';
import { Header } from './Header.js';
import { Main } from './Main.js';
import { Footer } from './Footer.js';
import { ImagePopup } from './ImagePopup.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import { api } from '../utils/Api.js';
import { EditProfilePopup } from './EditProfilePopup.js';
import { EditAvatarPopup } from './EditAvatarPopup.js';
import { AddPlacePopup } from './AddPlacePopup.js';
import { DeletePlacePopup } from './DeletePlacePopup.js';
import { ProtectedRoute } from './ProtectedRoute.js';
import Login from './Login.js';
import * as auth from '../auth.js'
import Register from './Register.js';
import { InfoTooltip } from './InfoTooltip.js';

function App() {
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [isDeletePlacePopupOpen, setDeletePlacePopupOpen] = useState(false);
  const [isInfoTooltipPopupOpen, setInfoTooltipPopupOpen] = useState(false);

  const [selectedCard, setSelectedCard] = useState({
    isImageOpen: false,
    link: '',
    name: '',
  });
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = React.useState([]);
  const [isLoading, setLoading] = useState(false);
  const [deleteCard, setDeleteCard] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);

  const history = useHistory();

  React.useEffect(() => {
    Promise.all([api.getCards(), api.getUserInfo()])
      .then((res) => {
        setCurrentUser(res[1]);
        setCards(res[0]);
      })
      .catch((err) => console.log(err));
  }, []);

  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true);
  }

  function handleDeletePlaceClick(card) {
    setDeletePlacePopupOpen(true);
    setDeleteCard(card);
  }

  function closeAllPopups() {
    setEditProfilePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setAddPlacePopupOpen(false);
    setDeletePlacePopupOpen(false);
    setInfoTooltipPopupOpen(false);
    setSelectedCard({
      isImageOpen: false,
      link: '',
      name: '',
    });
  }

  function handleCardClick(card) {
    const { link, name } = card;
    setSelectedCard({ isImageOpen: true, link, name });
  }

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
      // Формируем новый массив на основе имеющегося, подставляя в него новую карточку
      const newCards = cards.map((c) => c._id === card._id ? newCard : c);
      // Обновляем стейт
      setCards(newCards);
    })
      .catch((err) => console.log(err));
  }

  function handleCardDelete() {
    setLoading(true);
    api.deleteCard(deleteCard._id)
      .then(() => {

        //обновляю стейт cards с помощью метода filter: создаю копию массива, исключив из него удалённую карточку.
        setCards(cards.filter((item) => item !== deleteCard));
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }

  function handleUpdateUser(userData) {
    setLoading(true);
    api.updateProfile(userData)
      .then((newUser) => {
        setCurrentUser(newUser);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }

  function handleUpdateAvatar(avatar) {
    setLoading(true);
    api.updateAvatar(avatar)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }

  function handleAddPlaceSubmit(card) {
    setLoading(true);
    api
      .postCard(card)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }

  function handleLogin(email, password) {
    auth.login(email, password)
      .then((data) => {
        if (data.token) {
          handleInfoTooltip(true);
          setLoggedIn(true);
          history.push('/');
        }
      })
      .catch((err) => {
        handleInfoTooltip(false);
        if (err === 400) {
          console.log('Не передано одно из полей');
        } else if (err === 401) {
          console.log('Пользователь с таким email не найден');
        }
      })
  }

  function handleRegister(email, password) {
    auth.register(email, password)
      .then((res) => {
        history.push('/sign-in');
        handleInfoTooltip(true);
      })
      .catch((err) => {
        handleInfoTooltip(false);
        if (err === 400) {
          console.log('Некорректно заполнено одно из полей');
        }
      })
  }

  function handleInfoTooltip(log) {
    log ? setLoggedIn(true) : setLoggedIn(false);
    setInfoTooltipPopupOpen(true);
  }

  function handleTokenCheck() {
    const jwt = localStorage.getItem('token');
    if (jwt) {
      auth.checkToken(jwt)
        .then((res) => {
          if (res) {
            setLoggedIn(true);
            history.push('/');
          }
        })
        .catch((err) => {
          handleInfoTooltip(false);
          if (err === 401) {
            console.log('Токен не передан или передан не в том формате');
          }
        })
    }
  }

  React.useEffect(() => {
    handleTokenCheck();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleLogout() {
    localStorage.removeItem('token');
    history.push('/sign-in');
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header onOut={handleLogout} />

        <Switch>
          <ProtectedRoute
            exact path="/"
            loggedIn={loggedIn}>
            <Main
              cards={cards}
              onCardClick={handleCardClick}
              onCardLike={handleCardLike}
              onCardDelete={handleDeletePlaceClick}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onEditAvatar={handleEditAvatarClick}
              handleCardClick={handleCardClick}
            />
            <Footer />
          </ProtectedRoute>
          <Route path="/sign-up">
            <Register onRegister={handleRegister} />
          </Route>
          <Route path="/sign-in">
            <Login onLogin={handleLogin} />
          </Route>
          <Route>
            {loggedIn ? <Redirect to="/" /> : <Redirect to="/sign-in" />}
          </Route>
        </Switch>

        <InfoTooltip
          isOpen={isInfoTooltipPopupOpen}
          onClose={closeAllPopups}
          loggedIn={loggedIn}
        />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          isLoading={isLoading}
          onUpdateUser={handleUpdateUser}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
          isLoading={isLoading}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          isLoading={isLoading}
          onUpdateAvatar={handleUpdateAvatar}
        />

        <DeletePlacePopup
          isOpen={isDeletePlacePopupOpen}
          onClose={closeAllPopups}
          isLoading={isLoading}
          onDeletePlace={handleCardDelete}
        />

        <ImagePopup
          name={selectedCard.name}
          link={selectedCard.link}
          onClose={closeAllPopups}
          isOpen={selectedCard.isImageOpen}
        ></ImagePopup>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
