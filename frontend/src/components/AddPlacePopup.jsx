import React, { useEffect } from "react"
import { CurrentUserContext } from "../contexts/CurrentUserContext"
import PopupWithForm from "./PopupWithForm"

function AddPlacePopup({
  isOpen,
  onClose,
  onAddPlace,
  isPreloading,
}) {
  const currentUser = React.useContext(CurrentUserContext)
  const [namePlace, setNamePlace] = React.useState("")
  const [linkPlace, setLinkPLace] = React.useState("")

  useEffect(() => {
    setNamePlace("")
    setLinkPLace("")
  }, [isOpen])

  function handleSubmit(e) {
    e.preventDefault()
    onAddPlace({ name: namePlace, link: linkPlace })
  }

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      title="Новое место"
      buttonText={isPreloading ? "Загрузка..." : "Создать"}>
      <input
        type="text"
        placeholder="Название"
        autoComplete="off"
        className="popup__input popup-card__input popup-card__input_edit_image-name"
        name="name"
        required
        minLength="2"
        maxLength="30"
        id="title-input"
        value={namePlace ?? ""}
        onChange={(event) => setNamePlace(event.target.value)}
      />
      <span className="popup__input-error title-input-error"></span>
      <input
        type="url"
        placeholder="Ссылка на картинку"
        className="popup__input popup-card__input popup-card__input_edit_image-url"
        name="link"
        required
        id="url-input"
        value={linkPlace ?? ""}
        onChange={(event) => setLinkPLace(event.target.value)}
      />
      <span className="popup__input-error url-input-error"></span>
    </PopupWithForm>
  )
}

export default AddPlacePopup
