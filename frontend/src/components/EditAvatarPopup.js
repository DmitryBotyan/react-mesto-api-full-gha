import React from "react";
import PopupWithForm from "./PopupWithForm.js";
import { useForm } from "../hooks/useForm.js";

export function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, isLoading }) {

  const {values, handleChange, setValues} = useForm({});

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar(values)
  }

  React.useEffect(() => {
    setValues('')
  }, [isOpen, setValues])

  return (
    <PopupWithForm
      name="edit-photo"
      title="Обновить аватар"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText={isLoading ? 'Сохранение...' : 'Сохранить'}
    >
      <input
        type="text"
        className="popup__job input"
        placeholder="Введите ссылку"
        minLength="2"
        maxLength="200"
        required
        id="photo"
        name="avatar"
        onChange={handleChange}
        value={values.avatar || ''}
      />
    </PopupWithForm>
  );
}
