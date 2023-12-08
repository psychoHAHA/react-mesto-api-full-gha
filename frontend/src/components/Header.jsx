import React from "react"
import { Link, useLocation } from "react-router-dom"

export default function Header({ loggedIn, email, signOut }) {
  const location = useLocation()

  const path = location.pathname === "/sign-in" ? "/sign-up" : "/sign-in"
  const LinkName = location.pathname === "/sign-in" ? "Регистрация" : "Войти"

  return (
    <header className="header">
      <img
        src={require("../images/logo.svg").default}
        alt="лого замечательного сайта под названием Mesto, который я начинаю верстать 07.06.2023 в 17:01 по Екатеринбугскому времени. Делаю я это, совершенно не зная, как в дальнейшем мне предстоит писать JavaScript к этому проекту."
        className="header__logo"
      />
      {loggedIn ? (
        <div className="header__navbar">
          <p className="header__email">{email}</p>
          <Link className="header__link" to="/sign-in" onClick={signOut}>
            Выйти
          </Link>
        </div>
      ) : (
        <Link className="header__link-auth" to={path}>
          {LinkName}
        </Link>
      )}
    </header>
  )
}
