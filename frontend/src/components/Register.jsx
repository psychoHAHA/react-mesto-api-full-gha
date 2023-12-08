import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import "../blocks/auth/auth.css"

const Register = ({ onRegister }) => {
  const [formValue, setFormValue] = useState({
    email: "",
    password: "",
  })

  const handleChange = (e) => {
    const { name, value } = e.target

    setFormValue({
      ...formValue,
      [name]: value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const { email, password } = formValue
    onRegister(email, password)
  }

  const navigate = useNavigate()

  return (
    <div className="auth">
      <h1 className="auth__title">Регистрация</h1>
      <form className="auth__form" onSubmit={handleSubmit}>
        <input
          type="email"
          id="email"
          name="email"
          className="auth__input"
          placeholder="Email"
          required
          value={formValue.email}
          onChange={handleChange}
        />

        <input
          type="password"
          id="password"
          name="password"
          className="auth__input"
          placeholder="Пароль"
          required
          value={formValue.password}
          onChange={handleChange}
        />
        <button className="auth__button" type="submit">
          Зарегистрироваться
        </button>

        <Link className="auth__link" to="/sign-in">
          Уже зарегистрованы? Войти
        </Link>
      </form>
    </div>
  )
}

export default Register
