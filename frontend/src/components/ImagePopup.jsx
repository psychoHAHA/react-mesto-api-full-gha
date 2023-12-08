import React from "react"

function ImagePopup({ card, isOpen, onClose, onCloseOverlay }) {
  return (
    <aside
      className={`popup popup-${card.name}  ${isOpen ? "popup_opened" : ""}`}
      onClick={onCloseOverlay}>
      <div
        className="popup-image__content"
        onClick={(event) => event.stopPropagation()}>
        <button
          type="button"
          aria-label="Закрыть"
          className="popup__button-close popup-image__button-close"
          onClick={onClose}></button>
        <img src={card.link} alt={card.name} className="popup-image__photo" />
        <h2 className="popup-image__title">{card.name}</h2>
      </div>
    </aside>
  )
}

export default ImagePopup
