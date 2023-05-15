import iconDelete from "../images/Group.svg";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import React from "react";

export default function Card({ card, onImageClick, onCardLike, onCardDelete }) {

  const userContext = React.useContext(CurrentUserContext);

  const handleClick = () => {
    onImageClick(card);
  };

  const handleLike = () => {
    onCardLike(card)
  }

  const handleDelete = () => {
    onCardDelete(card)
  }

  const isOwn = card.owner._id === userContext.id;

  const isLiked = card.likes.some((i) => i._id === userContext.id);

  const cardLikeButtonClassName = `elements__like button ${
    isLiked && "elements__like_active"
  }`;

  return (
    <div className="elements__element">
      {isOwn && (
        <img
          src={iconDelete}
          alt="Корзина"
          className="elements__delete button"
          onClick={handleDelete}
        />
      )}
      <img
        src={card.link}
        alt={card.name}
        className="elements__photo"
        onClick={handleClick}
      />
      <h2 className="elements__title">{card.name}</h2>
      <button
        className={`${cardLikeButtonClassName}`}
        type="button"
        onClick={handleLike}
      ></button>
      <span className="elements__likes-count">{card.likes.length}</span>
    </div>
  );
}
