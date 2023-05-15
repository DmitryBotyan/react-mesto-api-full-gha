import React from "react";
import PopupWithForm from "./PopupWithForm.js";

export default function PopupWithConfirm({ isOpen, onClose, onCardDelete }) {
    
  const handleSubmit = (e) => {
    e.preventDefault();
  }
  
  return (
        <PopupWithForm
        name="confirm"
        title="Вы уверены?"
        isOpen={isOpen}
        onClose={onClose}
        buttonText='Да'
        onSubmit={handleSubmit}
      />
    )
}