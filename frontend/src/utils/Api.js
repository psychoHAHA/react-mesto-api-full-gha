import { apiConfig } from "./constants"

export default class Api {
  constructor({ url, headers }) {
    this._url = url
    this._headers = headers
  }

  _getResponse(response) {
    if (response.ok) {
      return response.json()
    }

    return Promise.reject(new Error("Возникла ошибка"))
  }

  getUserData() {
    return fetch(`${this._url}/users/me`, {
      headers: this._headers,
    }).then(this._getResponse)
  }

  getAllCards() {
    return fetch(`${this._url}/cards`, {
      headers: this._headers,
    }).then(this._getResponse)
  }

  changeUserData(data) {
    return fetch(`${this._url}/users/me`, {
      headers: this._headers,
      method: 'PATCH',
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    }).then(this._getResponse)
  }

  changeAvatarData(data) {
    return fetch(`${this._url}/users/me/avatar`, {
      headers: this._headers,
      method: 'PATCH',
      body: JSON.stringify({
        avatar: data.avatar,
      })
    }).then(this._getResponse)
  }

  createCard(data) {
    return fetch(`${this._url}/cards`, {
      headers: this._headers,
      method: 'POST',
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      })
    }).then(this._getResponse)
  }

  deleteCard(cardId) {
    return fetch(`${this._url}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers,
    }).then(this._getResponse)
  }

  handleLike(cardId, isLiked) {
    if (isLiked) {
      return fetch(`${this._url}/cards/${cardId}/likes`, {
        method: 'DELETE',
        headers: this._headers,
      }).then(this._getResponse)
    } else {
      return fetch(`${this._url}/cards/${cardId}/likes`, {
        method: 'PUT',
        headers: this._headers,
      }).then(this._getResponse)
    }
  }
}

  export const api = new Api(apiConfig)

//   deleteLike(cardId) {
//     return fetch(`${this._url}/cards/${cardId}/likes`, {
//       method: 'DELETE',
//       headers: this._headers,
//     }).then(this._getResponse)
//   }
// }