import React from "react";
import PopupWithForm from "./PopupWithForm.js";
import { useForm } from "../hooks/useForm.js";

export function AddPlacePopup({ isOpen, onClose, onAddPlace, isLoading }) {

  const {values, handleChange, setValues} = useForm({});

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddPlace(values);
  };

  React.useEffect(() => {
    setValues({})
  }, [isOpen, setValues])

  return (
    <PopupWithForm
      name="add"
      title="Новое место"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText={isLoading ? 'Сохранение...' : 'Создать'}
    >
      <input
        type="text"
        className="popup__place input"
        placeholder="Название"
        id="place"
        minLength="2"
        maxLength="30"
        required
        name="name"
        onChange={handleChange}
        value={values.name || ''}
      />
      <span
        className="popup__error-text_name popup__error-text"
        id="place-error"
      ></span>
      <input
        type="url"
        className="popup__link input"
        placeholder="Ссылка на картинку"
        id="link"
        required
        name="link"
        onChange={handleChange}
        value={values.link || ''}
      />
      <span
        className="popup__error-text_job popup__error-text"
        id="link-error"
      ></span>
    </PopupWithForm>
  );
}
