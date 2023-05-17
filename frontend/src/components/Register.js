import React from "react";
import { useForm } from "../hooks/useForm.js";
import { Link } from "react-router-dom";

export default function Register({ onRegister }) {

  const {values, handleChange, setValues} = useForm({});

  const handleSubmit = (e) => {
    e.preventDefault();
    onRegister(values)
  }

  React.useEffect(() => {
    setValues({})
  }, [setValues])

  return (
    <form className="auth" onSubmit={handleSubmit}>
      <h1 className="auth__title">Регистрация</h1>
      <input className="auth__input" placeholder="Email" type='email' name="email" onChange={handleChange} />
      <input className="auth__input" placeholder="Пароль" type="password" name="password" onChange={handleChange} />
      <button className="auth__button button">Зарегистрироваться</button>
      <span className="auth__description">
        Уже зарегистрированы?{" "}
        <Link to='/sign-in' className="header__link button">Войти</Link>
      </span>
    </form>
  );
}