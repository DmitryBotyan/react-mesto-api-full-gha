import React from "react";
import Card from "./Card";

import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

export default function Main({
  onEditAvatar,
  onEditProfile,
  onAddPlace,
  onImageClick,
  cards,
  onCardLike,
  onCardDelete,
}) {
  const userContext = React.useContext(CurrentUserContext);

  return (
    <main className="main">
      <section className="profile">
        <div className="profile__container">
          <img
            src={userContext.userAvatar}
            alt="Аватар"
            className="profile__avatar"
            onClick={onEditAvatar}
          />
        </div>
        <div className="profile__info">
          <div className="profile__name">
            <h1 className="profile__title">{userContext.userName}</h1>
            <button
              className="profile__edit-button button"
              type="button"
              onClick={onEditProfile}
            ></button>
          </div>
          <p className="profile__subtitle">{userContext.userDescription}</p>
        </div>
        <button
          className="profile__add-button button"
          type="button"
          onClick={onAddPlace}
        ></button>
      </section>
      <section className="elements">
        {cards.map((card) => (
          <Card
            card={card}
            onImageClick={onImageClick}
            key={card._id}
            onCardLike={onCardLike}
            onCardDelete={onCardDelete}
          />
        ))}
      </section>
    </main>
  );
}
