import React from "react";
import { useForm } from "../hooks/useForm.js";

export default function Login({ onLogin }) {
  
  const {values, handleChange, setValues} = useForm({});
  
  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(values)
  }

  React.useEffect(() => {
    setValues({})
  }, [setValues])

  return (
    <form className="auth" onSubmit={handleSubmit}>
      <h1 className="auth__title">Вход</h1>
      <input className="auth__input" placeholder="Email" type='email' name="email" onChange={handleChange} />
      <input className="auth__input" placeholder="Пароль" type='password' name="password" onChange={handleChange} />
      <button className="auth__button button">Войти</button>
    </form>
  );
}