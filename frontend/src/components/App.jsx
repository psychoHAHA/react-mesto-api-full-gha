import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import '../pages/index.css';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import AddPlacePopup from './AddPlacePopup';
import EditAvatarPopup from './EditAvatarPopup';
import InfoTooltip from './InfoTooltip';
import ProtectedRoute from './ProtectedRoute';
import Register from './Register';
import Login from './Login';
import * as auth from '../utils/auth';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { api } from '../utils/Api';

function App() {
  const [cards, setCards] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [isPreloading, setIsPreloading] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [setFormValue] = useState({
    email: '',
    password: '',
  });

  const [isMessage, setIsMessage] = useState({ title: '', icon: '' });

  const navigate = useNavigate();

  useEffect(() => {
    console.log(localStorage.getItem('jwt'));
    if (loggedIn) {
      api.authorize(localStorage.getItem('jwt'));
      Promise.all([api.getUserData(), api.getAllCards()])
        .then(([user, cards]) => {
          setCurrentUser(user);
          setCards(cards);
        })

        .catch((err) => console.log(err));
    }
  }, [loggedIn]);

  useEffect(() => {
    function handleEscClose(e) {
      if (e.key === 'Escape') {
        closeAllPopups();
      }
    }

    document.addEventListener('keydown', handleEscClose);

    return () => {
      document.removeEventListener('keydown', handleEscClose);
    };
  });

  useEffect(() => {
    function handleOverlayClick(e) {
      if (e.target.classList.contains('popup')) {
        closeAllPopups();
      }
    }

    document.addEventListener('click', handleOverlayClick);

    return () => {
      document.removeEventListener('click', handleOverlayClick);
    };
  });

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);

    setIsAddPlacePopupOpen(false);

    setIsEditAvatarPopupOpen(false);

    setIsImagePopupOpen(false);

    setIsMessage('');
  }

  function handleCardClick(card) {
    setSelectedCard({ name: card.name, link: card.link });

    setIsImagePopupOpen(true);
  }

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке

    const isLiked = card.likes.some((card) => card === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки

    api
      .handleLike(card._id, isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => console.log(err));
  }

  function handleUpdateUser(value) {
    setIsPreloading(true);
    api
      .changeUserData(value)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => setIsPreloading(false));
  }

  function handleUpdateAvatar(value) {
    setIsPreloading(true);
    api
      .changeAvatarData(value)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => setIsPreloading(false));
  }

  function handleAddPlaceSubmit(card) {
    setIsPreloading(true);
    api
      .createCard(card)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => setIsPreloading(false));
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));
      })

      .catch((err) => console.log(err));
  }

  const handleRegister = (email, password) => {
    auth
      .register(email, password)
      .then(() => {
        setIsMessage({
          title: 'Вы успешно зарегистрировались!',
          icon: 'succes',
        });

        setTimeout(() => closeAllPopups(), 1000);
        navigate('/sign-in', { replace: true });
      })

      .catch((err) => {
        setIsMessage({
          title: 'Что-то пошло не так! Попробуйте ещё раз.',
          icon: 'error',
        });

        console.log(err);
      });
  };

  const handleLogin = (email, password) => {
    auth
      .authorize(email, password)
      .then((res) => {
        localStorage.setItem('jwt', res.jwt);
        setLoggedIn(true);
        navigate('/', { replace: true });
      })
      .catch((err) => {
        setIsMessage({
          title: 'Что-то пошло не так! Попробуйте ещё раз.',
          icon: 'error',
        });

        console.log(err);
      });
  };

  // Большое спасибо за прикольные фичи, я их обязательно реализую перед началом новой темы, сейчас хочется просто немного передохнуть)))

  const checkToken = () => {
    const token = localStorage.getItem('jwt');

    if (token) {
      auth
        .getContent(token)
        .then((res) => {
          setLoggedIn(true);
          setEmail(res.data.email);
          navigate('/', { replace: true });
        })

        .catch((err) => console.log(err));
    }
  };

  const signOut = () => {
    localStorage.removeItem('jwt');
    setLoggedIn(false);
  };

  useEffect(() => {
    checkToken();
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page"></div>

      <Header email={email} loggedIn={loggedIn} signOut={signOut} />

      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute loggedIn={loggedIn}>
              <Main
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onEditAvatar={handleEditAvatarClick}
                onCardClick={handleCardClick}
                onCardLike={handleCardLike}
                onCardDelete={handleCardDelete}
                userName={currentUser.name}
                userAbout={currentUser.about}
                userAvatar={currentUser.avatar}
                cards={cards}
              />
            </ProtectedRoute>
          }
        />

        <Route
          path="/sign-up"
          element={
            <Register onRegister={handleRegister} isPreloading={isPreloading} />
          }
        />

        <Route
          path="/sign-in"
          element={
            <Login
              onLogin={handleLogin}
              setEmail={setEmail}
              isPreloading={isPreloading}
            />
          }
        />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      {loggedIn && <Footer />}

      <EditProfilePopup
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        onUpdateUser={handleUpdateUser}
        isPreloading={isPreloading}
      />

      <AddPlacePopup
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        onAddPlace={handleAddPlaceSubmit}
        isPreloading={isPreloading}
      />

      <EditAvatarPopup
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        onUpdateAvatar={handleUpdateAvatar}
        isPreloading={isPreloading}
      />

      <ImagePopup
        card={selectedCard}
        isOpen={isImagePopupOpen}
        onClose={closeAllPopups}
      />

      <InfoTooltip onClose={closeAllPopups} isMessage={isMessage} />
    </CurrentUserContext.Provider>
  );
}

export default App;
