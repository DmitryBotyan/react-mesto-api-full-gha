import React from "react";

export default function PopupWithForm({
  isOpen,
  onClose,
  onSubmit,
  buttonText,
  name,
  title,
  children,
}) {
  return (
    <div className={`popup popup_${name} ${isOpen ? "popup_opened" : ""}`}>
      <form
        className={`popup__container popup__container-${name}`}
        name={name}
        onSubmit={onSubmit}
      >
        <h2 className={`popup__title popup__title-${name}`}>{title}</h2>

        {children}

        <button type="submit" className="popup__button button">
          {buttonText}
        </button>

        <button
          className="popup__close-button button"
          type="button"
          onClick={onClose}
        ></button>
      </form>
    </div>
  );
}
