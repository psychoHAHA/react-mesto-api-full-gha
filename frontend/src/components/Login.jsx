import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import "../blocks/auth/auth.css"

const Login = ({ onLogin }) => {
  const [formValue, setFormValue] = useState({
    email: "",
    password: "",
  })

  const navigate = useNavigate()

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
    onLogin(email, password)
  }

  return (
    <div className="auth">
      <h1 className="auth__title">Вход</h1>
      <form className="auth__form" onSubmit={handleSubmit}>
        <input
          type="email"
          id="email"
          name="email"
          className="auth__input"
          placeholder="Email"
          value={formValue.email}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          id="password"
          name="password"
          className="auth__input"
          placeholder="Пароль"
          value={formValue.password}
          onChange={handleChange}
          required
        />
        <button className="auth__button" type="submit" >
          Войти
        </button>
      </form>
    </div>
  )
}

export default Login
