import React, { useEffect } from "react"
import { CurrentUserContext } from "../contexts/CurrentUserContext"
import PopupWithForm from "./PopupWithForm"

function EditAvatarPopup({
  isOpen,
  onClose,
  onUpdateAvatar,
  isPreloading,
}) {
  const currentUser = React.useContext(CurrentUserContext)
  const linkAvatar = React.useRef()

  useEffect(() => {
    linkAvatar.current.value = ""
  }, [currentUser])

  function handleSubmit(e) {
    e.preventDefault()
    onUpdateAvatar({ avatar: linkAvatar.current.value })
  }

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      title="Обновить профиль"
      buttonText={isPreloading ? "Сохранение..." : "Сохранить"}
      name="avatar">
      <input
        type="url"
        placeholder="Ссылка на аватар профиля"
        className="popup__input popup-avatar__input popup-avatar__input_edit_image-url"
        name="avatar"
        required
        id="avatar-input"
        ref={linkAvatar}
      />
      <span className="popup__input-error avatar-input-error"></span>
    </PopupWithForm>
  )
}

export default EditAvatarPopup
