import React from "react"
import { CurrentUserContext } from "../contexts/CurrentUserContext"

function Card({
  card,
  onCardClick,
  onCardLike,
  onCardDelete,
  handleCardClick,
}) {
  const handleCardLike = () => onCardLike(card)
  const handleCardDelete = () => onCardDelete(card)

  const currentUser = React.useContext(CurrentUserContext)
  const isOwn = card.owner === currentUser._id
  const isLiked = card.likes.some((card) => card === currentUser._id)
  const cardLikeButtonClassName = `group__button ${
    isLiked && "group__button_active"
  }`

  function handleCardClick() {
    onCardClick(card)
  }

  return (
    <>
      <div className="group__element">
        <img
          src={card.link}
          alt={card.name}
          className="group__image"
          onClick={handleCardClick}
        />
        {isOwn && (
          <button
            className="group__button-delete"
            type="button"
            aria-label="Удалить"
            onClick={handleCardDelete}></button>
        )}
        <div className="group__items">
          <h2 className="group__title">{card.name}</h2>
          <div className="group__like-container">
            <button
              type="button"
              aria-label="Отметить как понравившееся"
              className={cardLikeButtonClassName}
              onClick={handleCardLike}></button>
            <p className="group__like-counter">{card.likes.length}</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default Card
