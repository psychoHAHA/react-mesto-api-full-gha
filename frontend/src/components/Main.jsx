import React from "react"
import Card from "./Card"
import { CurrentUserContext } from "../contexts/CurrentUserContext"

function Main({
  onEditAvatar,
  onEditProfile,
  onAddPlace,
  onCardClick,
  onCardLike,
  onCardDelete,
  cards,
}) {
  const currentUser = React.useContext(CurrentUserContext)

  return (
    <main className="main">
      <section className="profile">
        <div className="profile__info">
          <div className="profile__overlay">
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="profile__avatar"
              onClick={onEditAvatar}
            />
          </div>
          <div className="profile__container">
            <div className="profile__text">
              <h1 className="profile__title">{currentUser.name}</h1>
              <button
                type="button"
                aria-label="Редактировать профиль"
                className="profile__button-edit"
                onClick={onEditProfile}></button>
            </div>
            <p className="profile__subtitle">{currentUser.about}</p>
          </div>
        </div>
        <button
          type="button"
          aria-label="Добавить изображение"
          className="profile__button"
          onClick={onAddPlace}></button>
      </section>

      <section className="group">
        {cards.map((card) => (
          <Card
            card={card}
            key={card._id}
            link={card.link}
            name={card.name}
            likes={card.likes}
            onCardClick={onCardClick}
            onCardLike={onCardLike}
            onCardDelete={onCardDelete}
          />
        ))}
      </section>
    </main>
  )
}

export default Main
