import Header from "../components/Header.js";
import Main from "./Main.js";
import Footer from "./Footer.js";
import React from "react";
import ImagePopup from "./ImagePopup.js";
import { api } from "../utils/api.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import EditProfilePopup from "./EditProfilePopup.js";
import { EditAvatarPopup } from "./EditAvatarPopup.js";
import { AddPlacePopup } from "./AddPlacePopup.js";
import Register from "./Register.js";
import Login from "./Login.js";
import { Route, Routes, useNavigate, Link } from "react-router-dom";
import ProtectedRoute from "../utils/ProtectedRoute.js";
import * as auth from "../utils/auth";
import { InfoTooltip } from "./InfoTooltip.js";
import infoImage from "../images/Union.svg";
import infoImageError from "../images/UnionError.svg";

export function App() {
  const [isEditPopupOpen, setEditPopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
  const [isZoomImagePopupOpen, setZoomImagePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [isInfoTooltipOpen, setInfoTooltipOpen] = React.useState(false);

  const [currentUser, setCurrentUser] = React.useState({
    userName: "",
    userDescription: "",
    userAvatar: "",
    id: "",
  });

  const [isSuccess, setSuccess] = React.useState(false);

  const [isLoading, setIsLoading] = React.useState(false);

  const [cards, setCards] = React.useState([]);

  const handleCardLike = (card) => {
    const isLiked = card.likes.some((i) => i._id === currentUser.id);

    api
      .changeLikeCardStatusletLike(card._id, isLiked)
      .then((newCard) => {
        setCards((cards) =>
          cards.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => console.log(err));
  };

  const isOpen =
    isEditPopupOpen ||
    isEditAvatarPopupOpen ||
    isAddPlacePopupOpen ||
    isZoomImagePopupOpen ||
    isInfoTooltipOpen;

  React.useEffect(() => {
    function closeByEscape(evt) {
      if (evt.key === "Escape") {
        closeAllPopups();
      }
    }
    if (isOpen) {
      document.addEventListener("keydown", closeByEscape);
      return () => {
        document.removeEventListener("keydown", closeByEscape);
      };
    }
  }, [isOpen]);

  const handleCardClick = (card) => {
    setSelectedCard(card);
    setZoomImagePopupOpen(true);
  };

  const handleCardDelete = (card) => {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((item) => item._id !== card._id));
      })
      .catch((err) => console.log(err));
  };

  const closeAllPopups = () => {
    setSelectedCard({});
    setEditPopupOpen(false);
    setAddPlacePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setZoomImagePopupOpen(false);
    setInfoTooltipOpen(false);
  };

  const handleUpdateUser = (data) => {
    setIsLoading(true);
    api
      .editUserInfo(data)
      .then(() => {
        setCurrentUser((currentUser) => ({
          ...currentUser,
          userName: data.name,
          userDescription: data.about,
        }));
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleUpdateAvatar = (data) => {
    setIsLoading(true);
    api
      .updateProfilePhoto(data)
      .then(() => {
        setCurrentUser((currentUser) => ({
          ...currentUser,
          userAvatar: data.avatar,
        }));
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleAddPlaceSubmit = (data) => {
    setIsLoading(true);
    api
      .addNewCard(data)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setIsLoading(false);
      });
  };

  const navigate = useNavigate();

  const [logedIn, setLoggedIn] = React.useState(false);

  const handleRegister = (values) => {
    auth
      .register(values)
      .then((res) => {
        setSuccess(true);
        setInfoTooltipOpen(true);
        navigate("/sign-in", { replace: true });
      })
      .catch((err) => {
        setSuccess(false);
        setInfoTooltipOpen(true);
        console.log(err);
      });
  };

  const handleLogin = ({ password, email }) => {
    auth
      .login({ password, email })
      .then((data) => {
        localStorage.setItem("jwt", data.token);
        setLoggedIn(true);
        navigate("/", { replace: true });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  React.useEffect(() => {
    const tokenCheck = () => {
      if (localStorage.getItem("jwt")) {
        const jwt = localStorage.getItem("jwt");
        auth
          .checkToken(jwt)
          .then((res) => {
            if (res) {
              setLoggedIn(true);
              navigate("/", { replace: true });
              localStorage.setItem("email", res.email);
            }
          })
          .catch((err) => console.log(err));
      }
    };
    tokenCheck();
  }, [navigate]);

  const handleSignOut = () => {
    localStorage.removeItem("jwt");
  };

  React.useEffect(() => {
    api
      .getUserInform()
      .then((data) => {
        setCurrentUser({
          userName: data.name,
          userDescription: data.about,
          userAvatar: data.avatar,
          id: data._id,
        });
      })
      .catch((err) => console.log(err));

    api
      .getCardList()
      .then((data) => {
        setCards(data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="page">
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute loggedIn={logedIn}>
              <CurrentUserContext.Provider value={currentUser}>
                <Header>
                  <span className="header__email">
                    {localStorage.getItem("email")}
                  </span>
                  <Link to='/sign-in' className="header__link button" onClick={handleSignOut}>Выйти</Link>
                </Header>

                <Main
                  onEditProfile={setEditPopupOpen}
                  onAddPlace={setAddPlacePopupOpen}
                  onEditAvatar={setEditAvatarPopupOpen}
                  onImageClick={handleCardClick}
                  cards={cards}
                  onCardLike={handleCardLike}
                  onCardDelete={handleCardDelete}
                />

                <ImagePopup
                  card={selectedCard}
                  onClose={closeAllPopups}
                  isOpen={isZoomImagePopupOpen}
                />

                <EditProfilePopup
                  isOpen={isEditPopupOpen}
                  onClose={closeAllPopups}
                  onUpdateUser={handleUpdateUser}
                  isLoading={isLoading}
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
                  onUpdateAvatar={handleUpdateAvatar}
                  isLoading={isLoading}
                />

                <Footer />
              </CurrentUserContext.Provider>
            </ProtectedRoute>
          }
        />

        <Route
          path="/sign-up"
          element={
            <div className="registerContainer">
              <Header>
                <Link to='/sign-in' className="header__link button">Войти</Link>
              </Header>
              <Register onRegister={handleRegister} />
            </div>
          }
        />
        <Route
          path="/sign-in"
          element={
            <div className="loginContainer">
              <Header>
                <Link to='/sign-up' className="header__link button">Регистрация</Link>
              </Header>
              <Login onLogin={handleLogin} />
            </div>
          }
        />
      </Routes>
      <InfoTooltip
        isOpen={isInfoTooltipOpen}
        onClose={closeAllPopups}
        message={
          isSuccess
            ? "Вы успешно зарегистрировались!"
            : "Что-то пошло не так! Попробуйте ещё раз"
        }
        image={isSuccess ? infoImage : infoImageError}
      ></InfoTooltip>
    </div>
  );
}

export default App;
