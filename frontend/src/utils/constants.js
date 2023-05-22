export const validationConfig = {
  inputSelector: ".input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "input_type_error",
  errorClass: "popup__error-text_visible",
};

export const configApi = {
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("jwt")}`
  },
};

export const BASE_URL = "https://api.mestoo.students.nomoredomains.monster";