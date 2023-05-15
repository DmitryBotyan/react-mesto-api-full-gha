import React from "react";
import PopupWithForm from "./PopupWithForm.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import { useForm } from "../hooks/useForm.js";

export default function EditProfilePopup({ isOpen, onClose, onUpdateUser, isLoading }) {
  const userContext = React.useContext(CurrentUserContext);

  const {values, handleChange, setValues} = useForm({});

  React.useEffect(() => {
    if (!userContext) return;
    setValues({
      name: userContext.userName,
      about: userContext.userDescription
    })
  }, [userContext, isOpen, setValues]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateUser(values);
  };

  return (
    <PopupWithForm
      name="edit"
      title="Редактировать профиль"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText={isLoading ? 'Сохранение...' : 'Сохранить'}
    >
      <input
        type="text"
        className="popup__name input"
        placeholder="Имя"
        minLength="2"
        maxLength="40"
        required
        id="name"
        name="name"
        onChange={handleChange}
        value={values.name || ""}
      />
      <span
        className="popup__error-text_name popup__error-text"
        id="name-error"
      ></span>

      <input
        type="text"
        className="popup__job input"
        placeholder="О себе"
        minLength="2"
        maxLength="200"
        required
        id="job"
        name="about"
        onChange={handleChange}
        value={values.about || ""}
      />
      <span
        className="popup__error-text_job popup__error-text"
        id="job-error"
      ></span>
    </PopupWithForm>
  );
}
