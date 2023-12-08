import React from "react"

function PopupWithForm(props) {
  return (
    <>
      <aside
        className={`popup popup-${props.name}  ${
          props.isOpen ? "popup_opened" : ""
        }`}
        onClick={props.onCloseOverlay}>
        <div
          className="popup__content"
          onClick={(event) => event.stopPropagation()}>
          <button
            type="button"
            aria-label="Закрыть"
            className="popup__button-close"
            onClick={props.onClose}></button>
          <h2 className="popup__title">{props.title}</h2>
          <form
            name={`form-${props.name}`}
            className="popup__form"
            onSubmit={props.onSubmit}>
            {props.children}
            <button
              aria-label="Сохранить изменения"
              type="submit"
              className="popup__button button">
              {props.buttonText}
            </button>
          </form>
        </div>
      </aside>
    </>
  )
}

export default PopupWithForm
